/*
 * @Author: FeikeQ
 * @Date: 2020-12-19 14:15:23
 * @LastEditTime: 2021-03-26 17:08:59
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/middleware/device.js
 * @Description: 
 */
/*
middleware 中间件：允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。
    每一个中间件应放置在 middleware/ 目录。
    文件名的名称将成为中间件名称 (middleware/auth.js将成为 auth 中间件)。
    中间件执行流程顺序：
    1.nuxt.config.js
    2.匹配布局
    3.匹配页面
    中间件可以异步执行,只需要返回一个 Promise 或使用第 2 个 callback 作为第一个参数
    中间件 可以在 pages 或者 layouts 或者 nuxt.config.js的路由router中(往router注入中间件即可全局生效) 使用
*/

import { UAParser } from "ua-parser-js"; // https://github.com/faisalman/ua-parser-js
export default function (context) {
  console.log("-------- 0.middleware --------");
  //   console.log("server:" + process.server, "client:" + process.client);
  //一个中间件接收 context 作为第一个参数：
  context.userAgent = process.server
    ? context.req.headers["user-agent"]
    : navigator.userAgent;

  // 客户端的获取方式
  //   var UA = new UAParser().getBrowser();
  //   console.log("[[[[[[[ua_parser]]]]]]", UA);

  // 服务端设置UA
  //   console.log("UA", context.userAgent);
  //   var parser = new UAParser();
  //   parser.setUA(context.userAgent);
  //   var result = parser.getResult();

  // 服务端直接解析
  var result = UAParser(context.userAgent);
  console.log("[[[[ [[[ [[ [ ua_parser ] ]] ]]] ]]]]", result.browser);

  // 给全局上下文添加一个属性来保存我们返回的匹配信息
  // context.deviceType = result.browser;
  context.deviceType = result;
  context.store.commit("api/setDeviceType", result);
  // 设备信息 let deviceType = process.server ? this.$nuxt.context.deviceType : this.$store.state.api.deviceType;


  // 使用方法(推荐A特殊情况用D)：
  
  // A. pages页面：
  // async asyncData({ params, query, store, $axios ,deviceType})  这样去拿即可
  
  // B. layouts页面：
  // export default {
  //   name: "default-layout",
  //   middleware (context) {
  //     console.log('--- deviceType-- ',context.deviceType);
  //   },
  // }
  
  // C. 使用$nuxt.context获取 只能在 data() created() 方法里并且 process.server 服务器环境里才能取到，process.client 客户端无法获取
  // console.log('--- This deviceType -- ',this.$nuxt.context.deviceType);
  // console.log("this.$ssrContext", this.$ssrContext);

  /*
  // D. 或者注入到store,是因为我部分页面需要判断机型请求不同的数据 (你们没有用到的话可以移除)
  export const state = () => ({
    deviceType:{},
  });
  export const mutations = {
    setDeviceType(state, val) {
      state.deviceType = val
    },
  }
  // context.store.commit("api/setDeviceType", context.deviceType); 触发 mutations 只能同步操作
  // context.store.dispatch("api/setDeviceType", context.deviceType); 触发 actions 支持异步AJAX请法求（这里没建actions方法所以会报错哦）
  // 要dispatch能使用的话得添加：
  export const actions = {
    setDeviceType({ commit }, deviceType) {
      commit('setDeviceType', deviceType)
    }
  }
  // 就能服务端客户端同时访问到 
  console.log('this.$store.state.api.deviceType',this.$store.state.api.deviceType)

  */

  // 若是判断UA非移动端的,就在这里做处理了..
  if (context.deviceType.name === "QQ") {
    // context.redirect(status,url) 这个可以重定向到外部网站
    context.redirect(301, "https://www.FK68.net/");
    // 若是内部访问可以直接用router对象push
  }


  if (process.client) {

     // 安全策略防篡改用户信息
    {
      // 当然程序员也可以使用 window.$nuxt.$store.state.api.user 来进行修改
      
      // 这里会重绑定事件用removeEventListener也没用，所以可以将读取保存用户信息建议放至只加载一次的地方
      window.addEventListener('beforeunload', () => {
        // 离开页面 刷新前 将store中的数据存到localStorage
        localStorage.setItem("userInfo", JSON.stringify(store.state.api.user));
      });
      
      if (store.state.sys.user.id) localStorage.setItem("userInfo", JSON.stringify(store.state.sys.user));
    }


    // 用户信息
    const userInfo = localStorage.getItem("userInfo");
    console.log('userInfo',userInfo);
    if(userInfo) context.store.commit("api/setUser",JSON.parse(userInfo));

    // 微信授权
    const weChatToken = localStorage.getItem("weChatToken");
    console.log('weChatToken',weChatToken);
    if(weChatToken) context.store.commit("api/setWeChatToken",JSON.parse(weChatToken));

    // 微信用户
    const weChatInfo = localStorage.getItem("weChatInfo");
    console.log('weChatInfo',weChatInfo);
    if(weChatInfo) context.store.commit("api/setWeChatInfo",JSON.parse(weChatInfo));

  }
}
