<!--
 * @Author: FeikeQ
 * @Date: 2021-03-19 15:27:40
 * @LastEditTime: 2021-03-20 16:59:37
 * @LastEditors: FeikeQ
 * @FilePath: /lkr-pc/pages/domains/_columns/index.vue
 * @Description: 
-->
<template>
  <div :class="$options.name" :com="params.columns">
    <!-- <page-search-sidebar /> -->
    "columns": "栏目" 
    <br/>
    <component v-bind:is="hasComponent('page-' + params.columns)"></component>
    <br/>

    <b>
      上面是动态组件
    </b>
    <pre>

      {{ params }}

      {{ query }}
    </pre>
  </div>
</template>

<script>
export default {
  name: "columns",
  layout: "",
  async asyncData({ app, route, store, env, query, params, req, res, redirect, error }){
  
    
    let _data = {
      params,
      query,
    };
    return _data;
  },
  methods: {},
  created() {},
  mounted() {},
  computed:{
  }
};
</script>

<style lang="less" scoped>
</style> 