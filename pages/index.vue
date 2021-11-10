<!--
 * @Author: FeikeQ
 * @Date: 2021-03-26 15:06:23
 * @LastEditTime: 2021-11-10 14:02:15
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/pages/index.vue
 * @Description: 首页
-->
<template>
  <div class="container">
    <div>
      <Logo />
      <pre>{{$store.state.header}}</pre>
      <h1 class="title">mynuxt</h1>
      <div class="links">
        这是主站
        <p class="aaa">主颜色 @primaryColor: #824716;</p>
        <p class="bbb">默认颜色 @defaultColor: #AA6C39;</p>
        <hr />
        <NuxtLink to="/domains/">🚀🚀🚀 domains子站 🚀🚀</NuxtLink>
        <br />

        <router-link
          to="/domains"
          custom
          v-slot="{ href, route, navigate, isActive, isExactActive }"
        >
          <a
            :active="isActive"
            :href="'//' + host + route.fullPath"
            @click="navigate"
            >让vue-router在href中显示完整的绝对路径(https://router.vuejs.org/api/#router-link)</a
          >
        </router-link>
      </div>

      <ARate />

      <p>服务端拿到数据了吗？:{{ ServerRenderDataTag }}</p>
      <p>
        cookie:
        {{ cookie }}
      </p>

      <div class="links">
        <NuxtLink to="./users/">🚀🚀🚀 进入users路由节点 🚀🚀</NuxtLink>
      </div>

      <div>
        {{
          FKasyncData +
          "-" +
          "asyncData()" +
          (UA && UA.browser ? UA.browser.name : "UA")
        }}
        <pre>
            {{ UA }}
        </pre>
        <br />
        <br />
        {{
          FKdata +
          "-" +
          "data()" +
          (LUA && LUA.browser ? LUA.browser.name : "LUA")
        }}
        <pre>
            {{ LUA }}
        </pre>
        <b>{{ ccav }}</b> <button @click="changeccav">改变ccav值</button>
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
  name:"PagesIndex",
  meta:{
    title:"首页",
    keywords:"",
    description:""
  },
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
  /* components
  nuxt 注册组件局部注册   components 选项中定义你想要使用的组件： 
  组件不需要 import 好像默认都是全局的，nuxt 的components文件夹里根定义都能自动加载如果是子文件夹里的就不能用.vue而用文件夹加index.vue来定义
  但vuex必须 import { mapMutations } from "vuex"
  */
  components: {},

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
  async asyncData({
    app,
    route,
    store,
    env,
    query,
    params,
    req,
    res,
    redirect,
    error,
  }) {
    

    console.log("-------- 1.asyncData --------");
    console.log("server:" + process.server, "client:" + process.client);

    console.log("store", store.state.todos.list);

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
    // 从host获取域
    const matcher = req.headers.host.match(
      /^(\w+(-\w+)?)\.(localhost|\w+(-\w+)?)(\.\w+)?/
    ) || [subdomains[subdomains.length - 1]];
    let domain = matcher[1] || matcher[0];
    console.log("域控", domain);
    console.log("「从host获取域」", matcher[1], "||", matcher[0]);

    return {
      host: req.headers.host,
      head: app.head, // nuxt.config.js 里的head配置
      FKasyncData: "肥客FK项目",
      UA,
      ServerRenderDataTag: true,
      cookie,
    };
  },
  fetch({ store, params }) {
    // fetch方法用于在呈现页面之前填充存储
    console.log("-------- 2.fetch --------");
    console.log("server:" + process.server, "client:" + process.client);
  },
  methods: {
    ...mapMutations({
      add: "todos/add",
    }),
    changeccav() {
      console.log("this.$utils", this.$utils);
      this.ccav = !this.ccav;
      console.log("ccav", this.ccav);
    },
  },
  data() {
    console.log("-------- 3.data --------");
    console.log("server:" + process.server, "client:" + process.client);
    //如果组件的数据不需要异步获取或处理，可以直接返回指定的字面对象作为组件的数据。

    var LUA = {};

    // 请检查您是否在客户端
    if (process.client) {
      var parser = new UAParser();
      LUA = parser.getResult();
      console.log("index.vue [data] ua_parser", LUA.browser);
      console.log("data访问不了asyncData的值呀", this.FKasyncData);
    }

    var ccav = "假的false";
    if (LUA.browser) {
      ccav = true;
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("         LUA.browser ", LUA.browser);
      console.log("ccav:", ccav);
      console.log("这里明明把CCAV置成了true为什么creat里还是false");
      console.log("");
      console.log("");
    }

    return { ServerRenderDataTag: false, FKdata: "测试数据bar", LUA, ccav };
  },
  computed: {
    todos() {
      return this.$store.state.todos.list;
    },
  },
  created() {
    console.log("--route--", this.$route);

    console.log("-------- 4.created --------");
    console.log("server:" + process.server, "client:" + process.client);
    console.log("==this==", this.ccav); //这里都还是 true
    console.log("==this==", this); // 展开后变成 false
    console.log("created访问asyncData的值", this.FKasyncData, this.UA);
    console.log("created访问data的值", this.FKdata, this.LUA);

    // 判断是否是客户端 并且 服务端没有渲染数据标识
    if (process.client && !this.ServerRenderDataTag) {
      // 客户端异步加载数据
    }
  },
  head() {
    console.log("-------- 5.head --------");
    console.log("server:" + process.server, "client:" + process.client);
    // 为此页设置元标记
    return {
      // 也可直接获取config配置内容 this.$nuxt.context.app.head.title
      // title: "网站的标题2(" + this.$route.params.id + ") - " + this.head.title,
      title: (this.$options.meta && this.$options.meta.title) +" - "+this.$nuxt.context.app.head.title ,
      meta: [
        {
          name: "keywords",
          hid: "keywords",
          content: "HTML,CSS,XML,JavaScript," + this.head.meta[2].content,
        },
        { name: "author", hid: "author", content: "FK68.net" },
        {
          hid: "description", //为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为 meta 标签配一个唯一的标识编号。
          name: "description",
          content: "网站的描述2...",
        },
      ],
    };
  },
  mounted() {
    console.log("-------- 6.mounted --------");
    console.log("server:" + process.server, "client:" + process.client);
  },
  //vue 容错功能，ssr服务端渲染由于数据结构错误导致白屏问题
  errorCaptured() {
    return process.env.NODE_ENV === "development"; // 如果是开发环境打开错误提示
  },

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
    color: @primaryColor;
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
  .aaa{
    border: 1px solid @primaryColor;
  }
  .bbb{
    border: 1px solid @defaultColor;
  }
}
</style>
