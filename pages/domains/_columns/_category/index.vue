<!--
 * @Author: FeikeQ
 * @Date: 2021-03-17 17:02:26
 * @LastEditTime: 2021-03-20 11:59:48
 * @LastEditors: FeikeQ
 * @FilePath: /lkr-pc/pages/domains/_columns/_category/index.vue
 * @Description: 
-->
<template>
  <div :class="$options.name" :com="params.category">
    "category": "分类"
    <pre>
      {{params}}

      {{query}}
    </pre>
  </div>
</template>

<script>
export default {
  name:"category",
  layout: "",
  async asyncData({ app, params, query, store, env, $config }) {
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