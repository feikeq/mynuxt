<!--
 * @Author: FeikeQ
 * @Date: 2021-03-17 17:29:27
 * @LastEditTime: 2021-09-26 10:41:36
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/pages/domains/_columns/_category/_.vue
 * @Description: 
-->
<template>
  <div :class="$options.name" :com="params.pathMatch">
    "pathMatch": "操作(其它传参如翻页什么的)"
    因为上一级会使用 params.columns 和 params.category 所以更多的参数会在 pathMatch
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