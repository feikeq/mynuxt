<template>
  <div>
      <app-title title="战队排行" icon="/icon.png">[插槽 组件不需要 import 好像默认都是全局的，但vuex必须 import { mapMutations } from "vuex" ]</app-title>
    
    {{ name }}：：{{ $route.fullPath }}
    <p>_id:{{ $route.params }}</p>
    <p>{{ todos }}</p>
    <p>{{ foo }}</p>
    <p>当前时间：{{ $utils.formatime(Date.now(), "yyyy-MM-dd hh:mm:ss") }}</p>
    <div>
      <AButton type="primary" @click="add('hahahahah')">添加数据ADD</AButton>
      <AButton @click="currentChange">ADD COOIKE</AButton>
      <AButton type="dashed">Dashed AButton</AButton>
      <br />
      <a-icon type="step-forward" />
      <AButton type="text">Text AButton</AButton>
      <AButton type="link">Link AButton</AButton>
    </div>
    
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// import axios from 'axios';

export default {
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
  async asyncData({ app, route, store, env, query, params, req, res, redirect, error }) {
    // 每次加载组件前调用 https://www.nuxtjs.cn/api/context
    // 由于asyncData方法是在组件 初始化 前被调用的，所以在方法内是没有办法通过 this 来引用组件的实例对象会提示undefined。
    console.log(
      ".......async.asyncData......",
      app.$utils.formatime(1606722602362, "yyyy-MM-dd hh:mm:ss")
    ); //
    // console.log('request:',req);
    // console.log('response:',res);
    console.log("this.$route.params:", params);
    // console.log('req.headers.host:',req.headers);
    console.log("aaaaapppp app axios", app.$axios);
    console.log("this.$route.query", query);

    var name = "(没有异步) 路由地址 fullPath";

    var ajaxTest = function () {
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          name = "(异步操作) 路由地址 fullPath";
          resolve(name);
        }, 500);
      });
    };
    await ajaxTest();
    return {
        head:app.head,  // nuxt.config.js 里的head配置
        currentPage:(query.page || 1)*1,  //翻页 当前页码
        name 
    };
  },
  methods: {
    ...mapMutations({
      add: "todos/add",
    }),
    currentChange(page){
        console.log(this.$utils.appCookie('token_5','55555',10,"/"));
        console.log('--------------翻页------------',this.$utils.getCookieArray());
        console.log('this.$utils.appCookie',this.$utils.appCookie('token_5'))


        this.$router.push({ query: {page: page}});
        /* 其实没必要开启 watchQuery: ['page'] // watchQuery监听翻页 - 网址路径上参数的变化
        服务端：直接通过 asyncData 里的 query 获取地址栏参数再去请求数据服务端渲染即可 
        客户端：直接在 methods 里添加请求数据的方法修改 data 数据异步渲染即可
        现在就是要有个公共函数能让服务端和客户端一起调用的：
        import * as api from "@/api/team";
        api.getXXXXX();
        */
    },
  },
  data() {
    //如果组件的数据不需要异步获取或处理，可以直接返回指定的字面对象作为组件的数据。
    console.log("------data------", this);
    // console.log('data访问不了asyncData的值呀',this.name);
    
    console.log("------process.client------", process.client);
    console.log("------process.env------",process.env);
    
    // 如果有 asyncData 有返回，都可以不用data这个项
    // 当然如果你想区别同步和异步数据 可以在这个data里定义其它名字的异步数据对象
    // 一般是同步和已不的数据对象体共用的，
    // 例如你页面初始加载 list 在服务端拿了数据，之后客户端有相应翻页交互也要更新这个 list ，
    //这种就只要在 asyncData定义好list 就行了 data里就别定了
    return { foo: "bar", current: null };
  },
  fetch(store, params) {
    // fetch方法用于在呈现页面之前填充存储
    // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。
    // 不同的是 fetch 方法不会设置组件的数据。
    // 如果页面组件设置了 fetch 方法，它会在组件每次加载前被调用（在服务端或切换至目标路由之前）。
    // 警告: 您无法在内部使用this获取组件实例，fetch是在组件初始化之前被调用
    // fetch 方法会在渲染页面前被调用，作用是填充状态树 (store) 数据，与 asyncData 方法类似，不同的是它不会设置组件的数据。

    console.log("----fetch----", this);
  },

  head() {
    // 你也可以在页面组件中使用 head 配置并通过 this 关键字来获取组件的数据
    // 配置当前页面的 Meta 标签 ,为此页设置元标记
    return {
      title: "网站的标题(" + this.$route.params.id + ")🚀 - " + this.head.title,
      meta: [
        { name: "keywords", hid: "keywords", content: "微信小程序,React Native,Wireshark,敏捷开发,Bootstrap,WebGL,Webpack,Docker,MVVM," + this.head.meta[2].content },
        { name: "author", hid: "author", content: "FK68.net" },
        {
          hid: "description", //为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为 meta 标签配一个唯一的标识编号。
          name: "description",
          content: "为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为 meta 标签配一个唯一的标识编号",
        },
      ],
    };
  },
  layout(context) {
    // 指定当前页面使用的布局（layouts 根目录下的布局文件）。
    // layouts 根目录下的所有文件都属于个性化布局文件，可以在页面组件中利用 layout 属性来引用。
    //   return 'blog'
  },
  computed: {
    todos() {
      return this.$store.state.todos.list;
    },
  },
  /*
  watchQuery: ['page'] // watchQuery监听翻页 - 网址路径上参数的变化
  nuxt的官方文档中提供了watchQuery属性可以监听参数字符串的更改。
  如果定义的字符串发生变化，将调用所有组件方法(asyncData, fetch, validate, layout, …)。 
  为了提高性能，默认情况下禁用。
  如果您要为所有参数字符串设置监听， 请设置： watchQuery: true.
  首先如果要全局使用watchQuery，那就在nuxt.config.js中全局配置
    module.exports = {
        watchQuery: true
    }
  如果不在nuxt.config.js中全局配置，那就默认是只在当前页面的监听
  */
};
</script>

<style></style>
