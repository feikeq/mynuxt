<!--
 * @Author: FeikeQ
 * @Date: 2021-03-26 15:06:23
 * @LastEditTime: 2021-03-26 16:25:12
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/pages/index.vue
 * @Description: 
-->
<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        mynuxt
      </h1>
      <div class="links">
        这是主站
    <hr/>
    <NLink to="/domains/">🚀🚀🚀 domains子站 🚀🚀</NLink>
    <br/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { UAParser } from "ua-parser-js";

/*
Nuxt 直接访问路由：
    Nuxt 在服务端会做
    -------- 0.middleware --------
    -------- 1.asyncData --------
    -------- 2.fetch --------
    -------- 3.data --------
    -------- 4.created --------

    Nuxt 在客户端会做
    -------- 3.data --------
    -------- 4.created --------
    -------- 5.head --------
    -------- 6.mounted --------

Nuxt 通过 nuxt-link 访问路由：
    Nuxt 在服务端什么都不做！

    Nuxt 在客户端会做
    -------- 0.middleware --------
    -------- 1.asyncData --------
    -------- 2.fetch --------
    -------- 3.data --------
    -------- 4.created --------
    -------- 5.head --------
    -------- 6.mounted --------


*/
export default {
  /*
    中间件：允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。
    每一个中间件应放置在 middleware/ 目录。
    文件名的名称将成为中间件名称 (middleware/auth.js将成为 auth 中间件)。
    中间件执行流程顺序：
    1.nuxt.config.js
    2.匹配布局
    3.匹配页面
    中间件可以异步执行,只需要返回一个 Promise 或使用第 2 个 callback 作为第一个参数
    */
  middleware: "device", //中间件 可以在 pages 或者 layouts 或者 nuxt.config.js的路由router中 使用

  /*
  context上下文对象：
    app	vue根实例	客户端 & 服务端	包含所有插件的根实例。例如:想使用axios，可以通过context.app.$axios获取
    isClient	Boolean	客户端 & 服务端	是否来自客户端渲染，废弃，请使用process.client
    isServer	Boolean	客户端 & 服务端	是否来自服务端渲染，废弃，请使用process.server
    isStatic	Boolean	客户端 & 服务端	是否通过nuxt generate
    isDev	Boolean	客户端 & 服务端	是否开发模式，在生产坏境的数据缓存中用到
    isHMR	Boolean	客户端 & 服务端	是否通过模块热替换，仅在客户端以dev模式
    route	路由	客户端 & 服务端	路由实例
    store	vuex数据	客户端 & 服务端	Vuex.sttore实例
    env	l Object	客户端 & 服务端	nuxt.config.js中的环境变量
    params	Object	客户端 & 服务端	route.params的别名
    query	Object	客户端 & 服务端	route.query的别名
    req	http.Request	服务端	Node.js API的Request对象。如果nuxt以中间件形式使用的话，这个对象就根据你所使用的框架（个人理解为页面）而定。nuxt generate 不可用
    res	http.Reponse	服务端	Node.js API的Reponse对象。如果nuxt以中间件形式使用的话，这个对象就根据你所使用的框架（个人理解为页面）而定。nuxt generate 不可用
    redirect	Function	服务端	用于重定向另一个路由，状态码在服务端被使用，默认302 redirect([status,]path[,query])
    error	Function	客户端 & 服务端	前往错误页面，error(parmas),params包含statusCode和message字段
    nuxtState	Object	客户端	nuxt状态
    beforeNuxtRender（fn）	Function	服务端	更新NUXT在客户端呈现的变量,具体了解请看官网
转自：https://www.jianshu.com/p/a37fd499f0c1 
  */
  async asyncData({ app, route, store, env, query, params, req, res, redirect, error }){
    store.dispatch("header/setType",1);

    console.log("-------- 1.asyncData --------");
    console.log("server:" + process.server, "client:" + process.client);

    console.log("store",store.state.todos.list)

    // layouts 好像没有asyncData这个方法

    // 每次加载组件前调用
    // 由于asyncData方法是在组件 初始化 前被调用的，所以在方法内是没有办法通过 this 来引用组件的实例对象会提示undefined。
    console.log(
      "使用公共函数库 __ $utils2",
      app.$utils.addQueryString("http://www.t.cn/?c=2", "a=1")
    );
    var UA = {};

    var cookie;

    // 请检查您是否在服务器端
    if (process.server) {
      // 如果不加这一层判断，当你在开发状态时动态保存代码刷新页面就会报错 headers 没有定义
      // 使用 req 和 res
      //   console.log("+++req.headers++", req.headers);
      let user_agent = req.headers["user-agent"];
      //   console.log('req.headers["user-agent"]', user_agent);
      UA = UAParser(user_agent);
      console.log("index.vue [asyncData] ua_parser", UA.browser);
      cookie = app.$utils.getCookieArray(req.headers.cookie); //获取cookie串并转为对象
      console.log("---cookie---", cookie);
    } else {
      cookie = app.$utils.getCookieArray();
    }

    return {
      head: app.head, // nuxt.config.js 里的head配置
      FKasyncData: "肥客FK项目",
      UA,
      ServerRenderDataTag: true,
      cookie,
    };
    
  }
};
</script>

<style lang="less" scoped>

 
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .title {
    display: block;
    font-weight: 300;
    font-size: 100px;
    color:red;
    letter-spacing: 1px;
  }
}



.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
