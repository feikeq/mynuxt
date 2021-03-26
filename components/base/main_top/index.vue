<!--
 * @Author: FeikeQ
 * @Date: 2021-03-20 14:26:26
 * @LastEditTime: 2021-03-26 17:34:17
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/components/base/main_top/index.vue
 * @Description: 
-->
<template>
  <header>头部</header>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name:"BaseMainTop",
  data() {
    return {
    };
  },
  computed: {
    // initData(){},
    // ...mapGetters('user', ['getNav']),
    // ...mapState('user', ['bNav'])
  },
  watch: {},
  methods: {
    // getStore(){
    //   this.A_UPDATE_USER({})
    //   this.M_UPDATE_USER({})
    // },
  },
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  // ...mapActions('user', ['A_UPDATE_USER']),
  // ...mapMutations('user', ['M_UPDATE_USER']),
}
</script>

<style>

</style>