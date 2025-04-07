var theTimeStamp = Date.now();
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  /*
  在使用 npm create-nuxt-app [项目名] 进行安装时
  Deployment target: [开发目标:] 
❯ Server (Node.js hosting)  [服务器（Node.js 托管）]
  Static (Static/Jamstack hosting) [静态（静态/Jamstack 托管）]
  开发目标要选服务器（Node.js 托管）这样才能打包部署到
  其它网页服务器如Nginx环境进行生产部署，运行 npm run builde后
  ℹ Generating output directory: dist/                                                                         16:56:51
  ℹ Generating pages                                                                                           16:56:52
  ✔ Generated route "/"                                                                                        16:56:52
  ✔ Client-side fallback created: 200.html    
  把项目目录下dist文件夹里的所有内容复制到WEB服务器即可 
  注意：为了防止访问 `_id.vue` 路由页（例如 `/some-id`）出现 404 错误，需在 Nginx 配置支持基于参数的动态路由 ：
  location / {
        try_files $uri $uri/ /index.html;  # 这是关键配置，处理所有未匹配的路由
    }   
  */

  // ssr: false, // 仅限客户端渲染
  /**
    https://nuxt.com.cn/docs/getting-started/deployment
    如果你不想预渲染你的路由，另一种使用静态托管的方式是在 nuxt.config 文件中将 ssr 属性设置为 false。nuxi generate 命令将输出一个 .output/public/index.html 入口点和类似经典客户端端 Vue.js 应用程序的 JavaScript 捆绑包。
    使用 ssr: true 进行静态站点生成（SSG），在构建时预渲染应用程序的路由（这是运行 nuxi generate 时的默认行为）。它还会生成 /200.html 和 /404.html 单页面应用回退页面，这些页面可以在客户端上渲染动态路由或 404 错误（尽管您可能需要在静态主机上进行配置）。
    或者，你可以使用 ssr: false 进行预渲染（静态单页面应用）。这将产生带有空的 <div id="__nuxt"></div> 的 HTML 页面，通常用于渲染 Vue 应用的位置。你会失去许多预渲染站点的 SEO 优势，因此建议使用 <ClientOnly> 来包装无法在服务器端渲染的站点部分（如果有的话）
    https://v2.nuxt.com/docs/get-started/commands Nuxt 将创建一个.nuxt目录，其中包含准备部署到您的服务器托管上的所有内容。
    1. 在开发环境中运行`npm run build`命令来编译Nuxt项目，这会生成静态文件和服务端渲染的相关文件。
    2. 客户端渲染部署时，传统VUE项目一样通常只需要将 `dist`目录 上传到服务器www工作目录下就可以了。
    3. 服务端渲染部署得将 `.nuxt`编译目录(可通过配置文件里buildDir自定主) 、 `static`静态资源目录 、 `package.json`项目描述文件 、 `nuxt.config.js`配置文件 `.evn`或其它配置文件文件一起上传到www服务器上。
    4. 在服务器中安装Node.js运行环境，并通过`npm install`安装项目依赖。
    5. 配置服务器，例如使用PM2等工具来启动Nuxt.js应用，可以使用相关命令`npm run start`。
    当然也可以不用`package.json`和`nuxt.config.js`文件，只要npm install nuxt后就能运行 nuxt start（默认端口3000）
    7. 在服务器上安装Node.js和npm环境。
    8. 在服务器上使用npm安装Nuxt.js的依赖包：
      ```
      npm install nuxt
      ```
    3. 接着可以使用`nuxt start`命令来启动Nuxt.js应用，此命令将启动内置的服务器并开始提供Nuxt应用程序。
  **/


  // The generate property https://v2.nuxt.com/docs/configuration-glossary/configuration-generate
  generate: {
    dir: 'dist' //默认值：“dist” 使用nuxt generate命令构建web应用程序时创建的目录名。
  },

  // The env property:  https://nuxtjs.org/docs/configuration-glossary/configuration-env
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
    BASE_URL: process.env.BASE_URL || 'https://testapi.fk68.net',
    NODE_ENV: process.env.NODE_ENV, // NODE_ENV由 Node.js 暴露给执行脚本的变量，在webpack中它的用途是判断生产环境或开发环境。其值通常为“production”（生产环境）和“development”（开发环境）
    APP_DOMAINS: ".ccav.tv:8888", // 主域(使用方法process.env.APP_DOMAINS)
    APP_STATIC: ".html", // 伪静态(了可以"/"结尾 process.env.APP_STATIC )
    // BUILD_TIME:new Date().toLocaleString(), // 构建时间 '9/29/2022, 3:01:01 PM'
    BUILD_TIME: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split(".")[0].replace(/T/, ' '), // 构建时间  '2022-09-29 15:01:01'
  },

  server: {
    port: process.env.PORT || 8888, // 默认值 3000
    host: "0.0.0.0", // 默认值 localhost
    // https: {
    //     key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
    //     cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    //   }
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    // 也可直接获取config配置内容 this.$nuxt.context.app.head.title
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
      { hid: 'shortcut-icon', rel: 'shortcut-icon', href: '/icon.png' },
      { hid: 'apple-touch-icon', rel: 'apple-touch-icon', sizes: '512x512', href: '/icon.png' },
    ],
    script: [
      {
        type: 'text/javascript',
        src: 'https://unpkg.com/flv.js/dist/flv.min.js'
      },
    ]
  },

  router: {
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
    middleware: ['route_meta'], // 路由中间件获取pages下meta页头信息

    /* 
    trailingSlash: 
    true：所有路由路径末尾都会自动添加斜杠。例如，访问 /about 时会自动重定向到 /about/。
    false：所有路由路径末尾都不会添加斜杠。若访问 /about/，会重定向到 /about。
    undefined：Nuxt 会根据文件系统的结构来决定是否添加斜杠。
     */
    // trailingSlash: true,// 路由地址中自动添加尾部斜杠结尾(nuxt 2.10 以上)
    
    // scrollBehavior 通过全局路由守卫，你可以在路由切换时执行特定的操作，比如滚动至页面顶部。(以前此方法写在router配置里) https://v2.nuxt.com/docs/configuration-glossary/configuration-router/#scrollbehavior
    // 使用scrollBehavior选项可以为管线之间的滚动位置定义自定义行为。每次呈现页面时都会调用此方法。要了解更多信息，请参阅vue-router scrollBehavior文档。https://v3.router.vuejs.org/guide/advanced/scroll-behavior.html

    // 从nuxt v2.9.0开始，你可以使用一个文件来覆盖路由器的scrollBehavior，这个文件应该放在~/app/router.scrollBehBehavior.js中（注意：如果在Windows上运行，文件名区分大小写）。
    // router.scrollBehavior.js文件必须位于应用程序文件夹中，而应用程序文件夹又位于项目的根目录中。
    // 你可以在这里看到Nuxt默认router.scrollBehavior.js文件：packages/vue-app/template/router.scrollehavior.js。 https://github.com/nuxt/nuxt/blob/2.x/packages/vue-app/template/router.scrollBehavior.js
    // scrollRestoration 是window.history.scrollRestoration的接口—— 「滚动恢复属性」 允许 web 应用程序在历史导航上显式地设置默认滚动恢复行为，auto：将恢复用户已滚动到的页面上的位置(默认值)； manual：不还原页上的位置用户必须手动滚动到该位置。
    
    // 其实不需要下面scrollBehavior这个因为好像nuxt做了这个事，只是layouts里的<Nuxt />元素，它千万只能是一个容器里不能再用if来渲染不同的Nuxt容器
    // scrollBehavior(to, from, savedPosition) {
    //   // 返回一个包含x, y或者selector属性的对象
    //   if (savedPosition) {
    //     return savedPosition;
    //   } else {
    //     return { x: 0, y: 0 };
    //   }
    // },

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
    "ant-design-vue/dist/antd.less", // "ant-design-vue/dist/antd.css",
    // "~assets/main.css", // 引用中使用~assets（没有斜杠）或@别名，即background:url("~assets/banner.svg")
    "~assets/main.less", // 直接引用less会编译成css
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "@/plugins/antd-ui",
    "~/plugins/FKaxios",
    '@/plugins/FKaxiosProxy',
    { src: '@/plugins/statistics.js', ssr: false }, // 统计 - 关闭服务端加载
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // components设置为true时，它将包含nuxt/components依赖项并将~/components在模板中使用它们时自动导入您的组件
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxtjs/style-resources'],// style-resources 文档 https://github.com/nuxt-community/style-resources-module/

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
    // baseURL: process.env.BASE_URL,
    // prefix: '/api', // prefix默认值为/  http://[HOST]:[PORT][PREFIX]
  },
  // nuxt跨域 proxy 代理配置
  proxy: {
    // 访问配置
    // 使用方法 this.$axios.post('/PROXY_FK68/gogogo/, {a:1,b:2});
    "/PROXY_FK68/": {
      // 当访问本地 127.0.0.1/PROXY_FK68/gogogo/ 将自动代理到  https://api.fk68.net/gogogo/
      target: "https://testapi.fk68.net",
      changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      // 路径重写 （当本地请求 /PROXY_FK68/abc/ 时会访问远端 http://php.test/abc/ 而不是 http://php.test/PROXY_FK68/abc/
      // 注意：在代理模块中，/PROXY_FK68/会将所有请求添加到 API 端点。如果您需要删除它，请使用以下 pathRewrite选项：
      pathRewrite: {
        "^/PROXY_FK68/": "", // 替换target中的请求地址。
      },
    },
    "/PROXY_WECHAT/": {
      target: "https://api.weixin.qq.com",
      pathRewrite: {
        "^/PROXY_WECHAT/": "",
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {

    //PWA 模块是一组较小的模块，旨在神奇地一起开箱即用。

    // icon: false, // disables the icon module 
    // 禁用图标模块，也就是禁用每个子模块 
    // 其实关闭禁用 pwa 直接注释 modules 里的 "@nuxtjs/pwa" 即可!!
    icon: {
      source: "images/logo.png",
      // fileName: `images/themes/logo.png`, // 默认位置是从当前项目static/开始
    },
    manifest: {
      name: '这是一个演示',  // 应用名称
      description: "这是演示nuxt框架特性的", // 应用描述
      theme_color: "#fff333", // 主题颜色 
      lang: 'zh-CN'
    },
    meta: {
      /* meta options https://pwa.nuxtjs.org/meta */
      // mobileApp:false, // 默认 true 开打 mobile-web-app-capable
    }
  },


  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    //Nuxt.js 本身并没有提供专门的组件或配置来实现代码混淆，但你可以通过自定义构建配置来集成代码混淆工具。你可以使用 Webpack 的 UglifyJsPlugin 插件来对 JavaScript 代码进行压缩和混淆。以下是一个示例 Nuxt.js 项目中的自定义构建配置，用于集成 UglifyJsPlugin 插件：
    terser: {
      terserOptions: {
        compress: {
          // drop_console: true  // 禁用控制台日志输出
          drop_console: process.env.NODE_ENV === 'production',
        }
      }
    },

    //　extractCSS是将内嵌的css提取到外部，allChunks代表所有的都执行，
    extractCSS: true, // { allChunks: true }
    // 在NUXTjs中提取CSS生成，将主块中的CSS提取到单独的CSS文件中
    /*上述内容将自动处理 *.vue 文件内的 <style> 提取，并与大多数预处理器一样开箱即用。
    您的所有 CSS 将被提取到单独的文件中，通常每个组件一个。这允许单独缓存您的 CSS 和 JavaScript，如果您有很多全局或共享 CSS，则值得一试。
    注意这只是提取 *.vue 文件 - 但在 JavaScript 中导入的 CSS 仍然需要单独配置。 */

    // https://nuxtjs.org/docs/configuration-glossary/configuration-build/#filenames
    filenames: {
      /*
      https://survivejs.com/webpack/optimizing/adding-hashes-to-filenames/
      占位符
      Webpack 为此提供了占位符。这些字符串用于将特定信息附加到 webpack 输出。最有价值的是：

      [id]- 返回块 ID。
      [path]- 返回文件路径。
      [name]- 返回文件名。
      [ext]- 返回扩展名。[ext]适用于大多数可用领域。
      [fullhash]- 返回构建哈希。如果构建的任何部分发生变化，这也会发生变化。 （webpack 7.6.3 无效好像要到 8.X）
      [chunkhash]- 返回条目块特定的哈希。配置中定义的每个都entry接收自己的哈希。如果条目的任何部分发生变化，哈希值也会发生变化。[chunkhash]比[fullhash]定义更细化。
      [contenthash]- 返回基于内容生成的哈希。这是从 webpack 5 开始的生产模式中的新默认值。( 好像和 [hash] 一样)
      最好仅将hash文件名用于生产环境因其在开发过程中并没有多大用处。

      
      
      filenames自定义捆绑文件名。
      默认：
      app: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
      chunk: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash:7].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]'

      */

      /*
      构建环境对象，包括这些属性(全部为布尔类型):isDev，isClient，isServer
      警告: 提供的isClient和isServer键与context中可用的键分开， 它们是长期支持的。
      这里不要使用process.client和process.server，因为它们是'undefined'。
      chunk 表示打包的时候产生得模块 - Chunk是Webpack打包过程中，一堆module的集合。
      我们知道Webpack的打包是从一个入口文件开始，也可以说是入口模块，入口模块引用这其他模块，模块再引用模块。
      Webpack通过引用关系逐个打包模块，这些module就形成了一个Chunk。
      示列：将 chunk 名称更改为数字 id+hash+时间戳 (nuxt.config.js):
      */
      chunk: ({ isDev }) => (isDev ? '[name].js' : `[id].[contenthash].${theTimeStamp}.js`)

    },

    // Nuxt.js 也已经集成了 Webpack 的 BundleAnalyzerPlugin 插件，使用它分析打包后的文件大小找出大文件问题所在。好像只有 npm run build 才能显示，也可使用 nuxt build --analyze
    analyze: true, // 生成打包后文件大小的地图(打包时生成一个名为 dist/stats.html 的文件来浏览项目文件大小的地图)

    loaders: {
      less: {
        lessOptions: {
          modifyVars: {
            /*
            ant-design-vue 定制主题theme
            可参考官网定制主题之在 https://1x.antdv.com/docs/vue/customize-theme-cn/ 
            由于 less-loader 版本不兼容会导致报错所以使用
            npm install less-loader@6.0.0 --save-dev
            使用这种方式时  css: ["ant-design-vue/dist/antd.css"] 要修改为 antd.less
            */
            'primary-color': '#657812', // 全局主色
            'link-color': '#657812', // 全局主色
          },
          javascriptEnabled: true,
        }
      },
    },

    optimization: {
      splitChunks: {
        chunks: 'all',// 将所有的 JavaScript 代码分割成多个块并进行缓存。这样可以最大化地利用浏览器的缓存机制减少页面加载时间。 将所有的公共代码和第三方库打包成一个单独的块，而每个页面的特定代码则会打包成另一个块，这样可以确保每个页面只加载必要的代码从而提高性能。
        maxInitialRequests: 5, // 用于控制入口点（entry point）的最大并行请求数量,这有助于减少请求数量提高页面加载性能,仅适用于入口点（entry point
        // 如果自动分包文件还很大的话就手动拆包
        cacheGroups: {
          ant_design: {
            // test: /[\\/]node_modules[\\/](@ant-design|ant-design-vue)[\\/]/,
            test: /[\\/]node_modules[\\/](@ant-design)[\\/]/,
            name: 'ant_design',
            chunks: 'all',
            priority: 100 //优先级
          },
          ant_design_vue: {
            test: /[\\/]node_modules[\\/](ant-design-vue)[\\/]/,
            name: 'ant_design_vue',
            chunks: 'all',
            priority: 90
          },

        }
      }
    },
    
    // publicPath 编译文件目录名或CDN域名  https://www.nuxtjs.cn/api/configuration-build
    // Nuxt.js 允许您将dist文件上传到 CDN 来获得最快渲染性能，只需将publicPath设置为 CDN 即可。 (类型: String  默认: '/_nuxt/')
    // 服务端渲染将 .nuxt/dist/client 目录的内容上传到您的 CDN 即可！客户端加载将 /dist/{PUBLIC_PATH}/ 目录的内容上传到您的 CDN 即可！
    // 如果开启了 buildDir  自定义编译目录 那就是{buildDir/dist/client 目录上传到CDN
    publicPath: process.env.PUBLIC_PATH || '/_nuxt/',
    // 如果 ssr:true 服务端渲染可能拿不到 PUBLIC_PATH 像prot端口一样只能写入node环境变量里才行。
    // 命令配置有PUBLIC_PATH的这个.env文件 "start": "nuxt start --dotenv .env.seo" 和写node环境变量也是一样的。
  },
  // buildDir: '.nuxt/', // 自定义编译目录

  // nuxt项目中使用全局less@变量引入style-resources  
  // 安装插件：npm i @nuxtjs/style-resources --save-dev
  styleResources: {
    less: './assets/vars.less' // 全局scss变量 自定义主题颜色
  },

  // A config object for Vue.config https://nuxtjs.org/docs/configuration-glossary/configuration-vue-config/
  vue: {
    config: {
      // Vue 忽略在 Vue 之外的自定义元素自己定标签 (e.g. 使用了 Web Components APIs)。否则，它会假设你忘记注册全局组件或者拼错了组件名称，从而抛出一个关于 Unknown custom element 的警告。
      // https://vuejs.bootcss.com/api/#ignoredElements
      ignoredElements: ['wx-open-launch-app', 'wx-open-launch-weapp', 'wx-open-subscribe', 'wx-open-audio'],
      // 微信开放标签属于自定义标签，Vue会给予未知标签的警告，可通过配置Vue.config.ignoredElements来忽略 Vue 对开放标签的检查。
      // 注意：微信开放标签现在只能在公众号下网下连接或卡片链接的方式才有效，普通用户发出去的连接是无效的。
    }
  },

  // telemetry 为 false 在打包过程中调用的命令（nuxt dev、nuxt build等）nuxt收集有关一般用途的匿名遥测数据， 禁止提示 收集信息 
  // The telemetry property https://nuxtjs.org/docs/configuration-glossary/configuration-telemetry/
  telemetry: false // disable Nuxt Telemetry for your project
}