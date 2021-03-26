/*
 * @Author: FeikeQ
 * @Date: 2021-03-20 15:33:32
 * @LastEditTime: 2021-03-24 16:34:52
 * @LastEditors: FeikeQ
 * @FilePath: /lkr-pc/store/header.js
 * @Description: 顶部导航条数据
 */

export const state = () => ({
  type:0,
  list:[],
  user:{},
});

export const mutations = {
  setType(state,val) {
    state.type = val
  },
}
export const actions = {
  setType({commit}, type) {
    commit('setType',type)
  },
  async nuxtAjaxTest({ commit },params) {
    // this.$axios.post() 和 this.$axios.$post() 不知啥子区别
    let data = await this.$axios.post(`/IFAreaInfo`,params); 
    console.log('：：nuxtAjaxTest::::::',data);
    return data;
  }
}