<!--
 * @Author: FeikeQ
 * @Date: 2021-03-20 14:26:26
 * @LastEditTime: 2021-03-20 14:35:40
 * @LastEditors: FeikeQ
 * @FilePath: /lkr-pc/components/base/main_top/index.vue
 * @Description: 
-->
<template>
  <header>头部</header>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name:"BaseMainTop",
  methods: {
    // getStore(){
    //   this.A_UPDATE_USER({})
    //   this.M_UPDATE_USER({})
    // },
  },
  // ...mapActions('user', ['A_UPDATE_USER']),
  // ...mapMutations('user', ['M_UPDATE_USER']),

  computed:{
    // initData(){},
    // ...mapGetters('user', ['getNav']),
    // ...mapState('user', ['bNav'])
  }

}
</script>

<style>

</style>