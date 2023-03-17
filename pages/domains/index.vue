<!--
 * @Author: FeikeQ
 * @Date: 2021-03-18 10:15:28
 * @LastEditTime: 2021-11-05 15:36:45
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/pages/domains/index.vue
 * @Description: 
-->

<template>
  <div class="main">
    "domains": "子站"
    <br/>

    相对路径
    <NuxtLink to="./search-sidebar">🚀 已有组件 </NuxtLink>
    <NuxtLink to="./search-sidebar">🚀 不存在的组件 </NuxtLink>
    (*推荐 例 www.fk68.net/domains/search-sidebar )
    <hr/>

    绝对路径
    <NuxtLink to="/domains/search-sidebar">🚀 已有组件 </NuxtLink>
    <NuxtLink to="/domains/search-sidebar">🚀 不存在的组件 </NuxtLink>
    (不推荐使用，在子域时不能访问 例 domains.fk68.net/search-sidebar )

    <NuxtLink to="/">🚀 回首页 </NuxtLink>

    <br/>
    <img width="100" src="/icon.png" />
  </div>
</template>

<script>
export default {
  async asyncData({ app, route, store, env, query, params, req, res, redirect, error }){
    
    


    // 服务端调用
    let test = await store.dispatch("header/setList",{code: "index"});
    console.log('服务端调用-------「测试结果」',test);
    
  },
  mounted(){
    // 客户端调用
    let test = this.$store.dispatch("header/setList",{code: "index"});
    console.log('客户端调用--------「测试结果」',test);
    test.then(res=>{
      console.log("刚才测试结果是个Promise对象而且状态是pending::::::这才是真正的结果",res);
    })
    .catch((err) => {
                this.$message.error(err.msg);
              });
  }
};
</script>

<style lang="less" scoped>


</style>
