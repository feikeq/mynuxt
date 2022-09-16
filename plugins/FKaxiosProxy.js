export default function ({ $axios, app }, inject) {
  // 使用 proxy 代理去请求接口
  // https://axios.nuxtjs.org/extend/

  // 如果您需要创建自己的基于$axios默认值的 axios 实例，您可以使用该create方法。

  /*
    ::准备工作 nuxt.config.js 配置
    plugins: [
      '@/plugins/FKaxiosProxy'
    ],
    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
      proxy: true, // 跨域请求代理 (只有开启代理 下面的 proxy 配置才能生效)
      // baseURL: 'http://www.baidu.com/', //定义用于请求服务器端请求的基本URL。
      // baseURL: process.env.BASE_URL,
      // prefix: '/api', // prefix默认值为/  http://[HOST]:[PORT][PREFIX]
    },
    // nuxt跨域 proxy 代理配置
    proxy: {
      // 访问配置
      // 使用方法 this.$axios.post('/PROXY_FK68/gogogo/, {a:1,b:2});
      "/PROXY_FK68/": {
        // 当访问本地 127.0.0.1/PROXY_FK68/gogogo/ 将自动代理到  https://api.fk68.net/gogogo/
        target: "https://api.fk68.net",
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        // 路径重写 （当本地请求 /PROXY_FK68/abc/ 时会访问远端 http://php.test/abc/ 而不是 http://php.test/PROXY_FK68/abc/
        // 注意：在代理模块中，/PROXY_FK68/会将所有请求添加到 API 端点。如果您需要删除它，请使用以下 pathRewrite选项：
        pathRewrite: {
          "^/PROXY_FK68/": "", // 替换target中的请求地址。
        },
      },
    },

    ::使用方法
     this.$proxy.$get('/PROXY_FK68/fk68').then((res) => {
       console.log('代理get',res);
     });
    this.$proxy.post(
      "/PROXY_FK68/sportAppActivity/IFGetInviteActivityOperatingDataList",
      {params:JSON.stringify({
        type: 0,
        page: 1,
        pageSize: 20,
      })}
      ).then(res=>{
        console.log('代理post',res);
      });
  */

  // Create a custom axios instance
  const axiosapi = $axios.create({});

  // Set baseURL to something different
  axiosapi.setBaseURL('/');


  // 响应拦截
  axiosapi.onResponse(res => {
    return Promise.resolve(res.data);
  })

  // Inject to context as $proxy
  inject('proxy', axiosapi);

}




