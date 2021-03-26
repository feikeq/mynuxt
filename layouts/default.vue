<!--
 * @Author: FeikeQ
 * @Date: 2021-03-20 13:45:28
 * @LastEditTime: 2021-03-20 16:29:25
 * @LastEditors: FeikeQ
 * @FilePath: /lkr-pc/layouts/default.vue
 * @Description: 
-->
<template>
    <div class="nuxt-layout">
      <BaseMainTop v-if="$store.state.header.type" />
      <BaseSubTop v-else />
      <Nuxt />
      <BaseFooterBottom />
    </div>
</template>

<script>
export default {
  name:"nuxt-layout",
  middleware({app, route, store, env, query, params, req, res, redirect, error}) {
    // 组件内前置路由守卫
    // context 服务器上下文
    // 全局守卫前置业务判断
    // store 状态数信息
    // route 一条目标路由信息
    // redirect 路由强制跳转
    // params / query 校验参数的合理性
    // console.log('middleware nuxt.config outside-全局守卫前置业务处理')
    // redirect('/login') // 强制跳转到登录页，可做路由鉴权
  }
}
</script>

<style>

</style>

