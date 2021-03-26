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
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    NODE_ENV: process.env.NODE_ENV
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
          "width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover",
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
      { name: "msapplication-TileImage", content: "/exp.png" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/exp.png" },
      { rel: "apple-touch-icon", type: "image/x-icon", href: `/exp.png` },
      { rel: "apple-touch-icon", href: "/exp.png", sizes: "512x512" },
    ],
    script: [
      {
        type: 'text/javascript',
        src: 'https://unpkg.com/flv.js/dist/flv.min.js'
      },
    ]
  },

  /*
   ** Customize the progress-bar color
   ** 自定义Nuxt进度条状态条颜色
   */
  loading: {
    color: "red",
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "ant-design-vue/dist/antd.css",
    "~assets/main.css", //你必须在 url CSS 引用中使用~assets（没有斜杠）或@别名，即background:url("~assets/banner.svg")
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["@/plugins/antd-ui", "~/plugins/FKaxios"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // components设置为true时，它将包含nuxt/components依赖项并将~/components在模板中使用它们时自动导入您的组件
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

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
    proxy: true, // 跨域请求代理
    // baseURL: 'http://www.baidu.com/', //定义用于请求服务器端请求的基本URL。
  },

  proxy: {
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
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}