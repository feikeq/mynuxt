/*
 * @Author: FeikeQ
 * @Date: 2020-12-19 14:15:23
 * @LastEditTime: 2020-12-21 09:55:34
 * @LastEditors: FeikeQ
 * @FilePath: /demo/middleware/device.js
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
  context.deviceType = result.browser;

  // 这里注入到store,是因为我部分页面需要判断机型请求不同的数据 (你们没有用到的话可以移除)
  //  context.store.commit("SetDeviceType", context.deviceType);

  // 若是判断UA非移动端的,就在这里做处理了..
  if (context.deviceType.name === "QQ") {
    // context.redirect(status,url) 这个可以重定向到外部网站
    context.redirect(301, "https://www.FK68.net/");
    // 若是内部访问可以直接用router对象push
  }
}
