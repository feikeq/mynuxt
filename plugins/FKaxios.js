/*
 * @Author: FeikeQ
 * @Date: 2021-04-08 10:10:57
 * @LastEditTime: 2021-12-07 14:55:34
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/plugins/FKaxios.js
 * @Description: 
 */

import $utils from '@/plugins/utils'; // 引入工具类
// 拦截器
export default function ({ $axios, redirect, route, store, req }) {


  /*
    this.$axios.post() 和 this.$axios.$post() 有区别
    $捷径 https://axios.nuxtjs.org/usage/#-shortcuts
    Axios 插件还支持带有$前缀方法的快捷方式来直接获取数据：
    文档上的意思加了$可以直接获取res.data
    // axios的正常使用
    let data = (await $axios.get('...')).data
    // 捷径的方式
    let data = await $axios.$get('...')
  */

  $axios.defaults.timeout = 10000; // 超时相应
  $axios.defaults.baseURL = process.env.BASE_URL; // 请求域名
  // $axios.setToken('01234567890123456789'); // 添加 Authorization 授权令牌
  // console.log("processprocessprocess",process.env);

  // 请求拦截-header设置
  $axios.onRequest((config) => {
    // axios请求方法 get, post, put, patch, delete, options
    let _cookie = req ? req.headers.cookie : null; // 解决Nuxt服务端请求onRequest拦截时获取token的问题
    // config.headers.token = '01234567890123456789';
    var cookie = $utils.getCookieArray(_cookie);
    console.log('请求拦截', $axios.defaults.baseURL, cookie);

    // 要插入的数据项
    var inster = {
      t: new Date().getTime() + '',
      sign: "sdeweEFr@#$@",
    };

    // 如果有 token 插入该输入
    if (cookie && cookie.token) inster.stk = cookie.token;

    // 如果是PUT,POST,PATCH请求
    if (config.data) {
      // 判断是否上传文件

      /*
       注意：File 接口不是 Javascript (node.js) 的一部分，它属于 Web API
       也许您可以content-type在请求的标头中使用来检查请求是否是某种类型的文件或流。
       req ? req.headers['content-type']
      */
      if (typeof File !== 'undefined' && config.data instanceof File) {
        var formData = new FormData();
        formData.append("file", config.data); // 上传文件时的key名
        // 携带其它参数
        for (const key in inster) {
          if (Object.hasOwnProperty.call(inster, key)) {
            formData.append(key, inster[key]);
          }
        }
        config.data = formData;
        config.headers["Content-Type"] = "multipart/form-data";

        // 普通请求  
      } else {
        config.data = Object.assign({}, inster, config.data)
      }

      // 如果是GET,DELETE请求 
      // get请求中没有data传值方式，请一定要将参数放在 params 里， params 基础类型接收 {params:{id:68}}
    } else if (config.params) {
      config.params = Object.assign({}, inster, config.params)

      // 其它options请求
    } else {
      config.data = Object.assign({}, inster)
    }

    return config
  })

  // 响应拦截
  $axios.onResponse(res => {

    /*
    例如请求的数据蛸料主体为
    {
      code:200,
      msg:"",
      data:[]||{}||""||0
    }
    */

    // 判断后台返回的token 错误信息是否为正确，  判断当前 route.fullPath 是否是登录 否则redirect到login
    if (res.data.code == '-10001') {
      $utils.appCookie('token', "del", -1, "/", null); // 清空用户cookie
      store.dispatch("header/setUser", {}); // 清空用户缓存
      redirect(`${route.path}`); // 跳转
    }

    // 通常是 if (res.data && res.data.code == 200) 来判断 
    if (res.data && res.data.code === '0') {
      console.log("成功")
      return Promise.resolve(res.data.data) //直接发返回数据结构中的数据实体
    } else {
      console.log("异常")
      return Promise.reject(res.data) // 直接返回数据结构（会进入 $axios.onErro 拦截）
      //return Promise.resolve(res.data.data) // 不能因为没有数据抛出错误 By FeikeQ 
    }

  })

  // 错误处理 (有特殊要求再写return Promise否则无法try catch捕获异常)
  $axios.onError((error) => {
    if (error) {
      // 服务端接口返回错误 || http返回错误
      const code = error.code || parseInt(error.response && error.response.status);
      let msg = error.msg || '未知错误';

      // 全局错误码处理逻辑（如登录鉴权放全局处理，而一些交互异常的放相关逻辑进行处理）
      if (code) {
        switch (code) {
          case 400:
            msg = '错误的请求';
            break;
          case 401:
            msg = '未授权，请重新登录';
            // 跳转登录页
            redirect("/login");
            // 因为这里onError对于$axios只是一段异步执行，这里终止并不会终止 原本asyncData等钩子函数的执行
            // 为了解决跳转路由后还会显示错误页面的问题，
            // 在返回Promise.reject()之前返回Prmoise.resolve(),防止跳转到错误页
            // 因为$get()等方法是直接获取get()结果内部的data，所以，我们给出Promise.reject({data:{}}), 
            // 最起码保障让$get()拿到空对象{}，以防止外界解构赋值时，再次跳转到错误页
            // return Promise.resolve({});
            break;
          case 403:
            msg = '拒绝访问';
            break;
          case 404:
            msg = '请求错误,未找到该资源';
            break;
          case 405:
            msg = '请求方法未允许';
            break;
          case 406:
            msg = '请求头无法满足资源的内容';
            break;
          case 408:
            msg = '请求超时';
            break;
          case 500:
            msg = '服务器端程序错误';
            break;
          case 501:
            msg = '不支持的请求方法';
            break;
          case 502:
            msg = '网络错误';
            break;
          case 503:
            msg = '服务不可用';
            break;
          case 504:
            msg = '网络超时';
            break;
          case 505:
            msg = 'http版本不支持该请求';
            break;
          default:
            msg = `其他连接错误 --${code}`
        }
      }
      return Promise.reject({ code, msg });
    }
  })
}



/*

axios语法 axios(url[, config])
config
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认的

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
},

// `auth` 表示应该使用 HTTP 基础验证，并提供凭据
// 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
auth: {
  username: 'janedoe',
  password: 's00pers3cret'
},

// `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
responseType: 'json', // 默认的

// `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
xsrfCookieName: 'XSRF-TOKEN', // default

// `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的

// `onUploadProgress` 允许为上传处理进度事件
onUploadProgress: function (progressEvent) {
  // 对原生进度事件的处理
},

// `onDownloadProgress` 允许为下载处理进度事件
onDownloadProgress: function (progressEvent) {
  // 对原生进度事件的处理
},

// `maxContentLength` 定义允许的响应内容的最大尺寸
maxContentLength: 2000,

// `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
validateStatus: function (status) {
  return status >= 200 && status < 300; // 默认的
},

// `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
// 如果设置为0，将不会 follow 任何重定向
maxRedirects: 5, // 默认的

// `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
// `keepAlive` 默认没有启用
httpAgent: new http.Agent({ keepAlive: true }),
httpsAgent: new https.Agent({ keepAlive: true }),

// 'proxy' 定义代理服务器的主机名称和端口
// `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
// 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
proxy: {
  host: '127.0.0.1',
  port: 9000,
  auth: : {
    username: 'mikeymike',
    password: 'rapunz3l'
  }
},
// `cancelToken` 指定用于取消请求的 cancel token
// （查看后面的 Cancellation 这节了解更多）
cancelToken: new CancelToken(function (cancel) {
})
}
*/
console.log('plugins/FKaxios.js');