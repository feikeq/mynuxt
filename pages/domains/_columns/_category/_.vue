<!--
 * @Author: FeikeQ
 * @Date: 2021-03-17 17:29:27
 * @LastEditTime: 2021-03-20 16:59:50
 * @LastEditors: FeikeQ
 * @FilePath: /lkr-pc/pages/domains/_columns/_category/_.vue
 * @Description: 
-->
<template>
  <div :class="$options.name" :com="params.pathMatch">
    "pathMatch": "操作(其它传参如翻页什么的)"
    <pre>
      {{params}}

      {{query}}
    </pre>
  </div>
</template>

<script>
export default {
  name:"pathMatch",
  layout: "",
  async asyncData({ app, route, store, env, query, params, req, res, redirect, error }){
    
    let _data ={
      params,
      query
    }
    return _data;
  }
}
</script>

<style lang="less" scoped>

</style> 