<!--
 * @Author: FeikeQ
 * @Date: 2021-03-20 13:45:28
 * @LastEditTime: 2021-03-26 15:56:15
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/layouts/default.vue
 * @Description: 
-->
<template>
  <div class="nuxt-layout">
    <BaseMainTop v-if="$store.state.header.type" />
    <BaseSubTop v-else />
    <!-- 
      缓存包裹在里面的动态切换组件
      <Nuxt>组件和<NuxtChild/>组件都接受 keep-alive 和 keep-alive-props 属性 来缓存页面 。
      keep-alive-props 里属性 include是包含，exclude是排除 需要在pages页面进行name命名，如：
      <script>
        export default {
          name: "PagesIndex"
          // watch:{
          //   "$route.query":{
          //     handler:function(newV,oldV){
          //       if(this.$route.name === 'subject-list'){
          //         console.log('当遇到缓存时强制刷新页面数据',this.$route.name);
          //         this.getListData(); // 当遇到缓存时强制刷新页面数据
          //       }
          //     },
          //   }
          // },
        }
      </script> 
    -->
    <Nuxt keep-alive :keep-alive-props="{ exclude: ['PagesIndex'] }" />
    <BaseFooterBottom />
  </div>
</template>

<script>
// 需要注意的是在默认布局里不要加入头部信息，只是关于<template>标签下的内容统一订制。
export default {
  name: "nuxt-layout",
  // layouts 里没有asyncData这个方法，其实是所有组件都没有这个只有放到pages智能路由目录的才有asyncData
  middleware({
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
    // 组件内前置路由守卫
    

    // context 服务器上下文
    // 全局守卫前置业务判断
    // store 状态数信息
    // route 一条目标路由信息
    // redirect 路由强制跳转
    // params / query 校验参数的合理性
    // console.log('middleware nuxt.config outside-全局守卫前置业务处理')
    // redirect('/login') // 强制跳转到登录页，可做路由鉴权
    
    // // 设置自动登录 (推荐使用优先级更高的 middleware/route_meta 路由中间间获取meta信息 来 前置路由守卫 )
    // const cookieArr = app.$utils.getCookieArray();
    // if (cookieArr) store.dispatch("header/setUser", cookieArr);
  },
  mounted() {
    if (process.client) {
      console.log('客户端加载')
    }
  },
};
</script>

<style>
</style>

