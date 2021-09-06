export default {
  /*
  env属性定义客户端应可用的环境变量也可从服务端共享
  通过 process.env.baseUrl 或 context.env.baseUrl 请参阅 context API.
  我们可以使用它来配置axios。插件/axios.js
  import axios from 'axios'
  export default axios.create({
    baseURL: process.env.baseUrl
  })
  */
  env: {
    BASE_URL: process.env.BASE_URL || 'http://192.168.172.132:8080',
    NODE_ENV: process.env.NODE_ENV, // NODE_ENV由 Node.js 暴露给执行脚本的变量，在webpack中它的用途是判断生产环境或开发环境。其值通常为“production”（生产环境）和“development”（开发环境）
    APP_DOMAINS: ".ccav.tv:8888", // 主域(使用方法process.env.APP_DOMAINS)
    APP_STATIC: ".html" // 伪静态(了可以"/"结尾 process.env.APP_STATIC )
  },

  // ssr: false,//仅限客户端渲染
  server: {
    port: process.env.PORT || 8888, // default: 3000
    host: "0.0.0.0", // default: localhost
    // https: {
    //     key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
    //     cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    //   }
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "肥客联邦",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover",
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "肥客,FK,FeiKeWorld,肥客联邦,FK68,FK68.net,废客网站,废客软件,肥客官网,废客官方,废客CS,FK,网站设计制作建设,软件定制外包开发,平面设计UI设计UX设计",
      },
      {
        hid: "description",
        name: "description",
        content:
          "肥客是专业的网络应用服务商。我们的团队凭借扎实的技术与优质的服务为企业、公司、政府等部门量身定制软件与网站的网络应用和用户体验。有非凡志向，才有非凡成就。",
      },

      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
      { name: "apple-mobile-web-app-title", content: "网站标题" },
      { hid: "og:title", name: "og:title", content: "网站标题1" },
      { hid: "og:site_name", name: "og:site_name", content: "网站标题2" },
      { name: "msapplication-TileImage", content: "/icon.png" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "apple-touch-icon", type: "image/x-icon", href: `/icon.png` },
      { rel: "apple-touch-icon", href: "/icon.png", sizes: "512x512" },
    ],
    script: [
      {
        type: 'text/javascript',
        src: 'https://unpkg.com/flv.js/dist/flv.min.js'
      },
    ]
  },

  router: {
    // scrollBehavior(to, from, savedPosition) {
    //   return { x: 0, y: 0 };
    // }
    // // 扩展路由 您可能要扩展由Nuxt.js创建的路由。您可以通过该extendRoutes选项进行操作。
    // // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router
    // middleware: "auth", // 中间件钩子(路由中间件)
    // extendRouters(routes, resolve) { 
    //   // routes 路由数组
    //   routes.push(
    //     {
    //       name: "root", // index 起个别名root
    //       path: "/index",
    //       component: resolve(__dirname, "pages/index.vue")
    //     },
    //     {
    //       path: '/:type', // index带传参,获取此type使用 this.$route.params.type
    //       name: 'index',
    //       component: resolve(__dirname, 'pages/index.vue')
    //     },
    //     {
    //       path: '/live/:id', // live 带传参,获取此ID使用 this.$route.params.id
    //       name: 'live',
    //       // component: resolve(__dirname, 'pages/live/index.vue')
    //       component: resolve(__dirname, 'pages/live')

    //     },
    //   )
    // }
  },

  /*
   ** Customize the progress-bar color
   ** 自定义Nuxt进度条状态条颜色
   */
  loading: {
    color: "red",
    height: '30px'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "ant-design-vue/dist/antd.css",
    // "~assets/main.css", // 引用中使用~assets（没有斜杠）或@别名，即background:url("~assets/banner.svg")
    "~assets/main.less", // 直接引用less会编译成css
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["@/plugins/antd-ui", "~/plugins/FKaxios"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // components设置为true时，它将包含nuxt/components依赖项并将~/components在模板中使用它们时自动导入您的组件
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxtjs/style-resources'],

  // 渲染属性 Nuxt.js使您可以自定义呈现页面的运行时选项 https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-render
  render: {
    // 设置静态资源如图片的缓存时间 https://www.npmjs.com/package/serve-static
    static: {
      // 设置http缓存的最大时间（以毫秒为单位），默认为0。可以是 ms毫秒数据 或 maxAge: '1d' 字符串 maxAge: '1y'
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios", //您现在可以在Nuxt应用中使用$axios✨
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true, // 跨域请求代理 (只有开启代理 下面的 proxy 配置才能生效)
    // baseURL: 'http://www.baidu.com/', //定义用于请求服务器端请求的基本URL。
  },
  // nuxt跨域 proxy 代理配置
  proxy: {
    // 当访问本地 127.0.0.1/api/gogogo 将自动代理到  http://www.baidu.com/gogogo
    "/api": {
      target: "http://www.baidu.com/",
      changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite: {// 路径重写
        "^/api": "/", // 替换target中的请求地址，也就是说/api=/target，请求target这个地址的时候直接写成/api即可。
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: "/logo.png"
    },
    manifest: {
      lang: 'zh-CN'
    }
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    //　extractCSS是将内嵌的css提取到外部，allChunks代表所有的都执行，
    extractCSS:true, // { allChunks: true }
    // 在NUXTjs中提取CSS生成，将主块中的CSS提取到单独的CSS文件中
    /*上述内容将自动处理 *.vue 文件内的 <style> 提取，并与大多数预处理器一样开箱即用。
    您的所有 CSS 将被提取到单独的文件中，通常每个组件一个。这允许单独缓存您的 CSS 和 JavaScript，如果您有很多全局或共享 CSS，则值得一试。
    注意这只是提取 *.vue 文件 - 但在 JavaScript 中导入的 CSS 仍然需要单独配置。 */
  },
  
  // nuxt项目中使用全局less@变量引入style-resources  
  // 安装插件：npm i @nuxtjs/style-resources --save-dev
  styleResources: {
    less: './assets/vars.less'
  }
}