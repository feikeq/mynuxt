<!--
 * @Author: FeikeQ
 * @Date: 2021-03-26 15:06:23
 * @LastEditTime: 2021-03-26 15:49:45
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
export default {
  async asyncData({ app, route, store, env, query, params, req, res, redirect, error }){
    store.dispatch("header/setType",1);
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
