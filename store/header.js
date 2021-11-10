/*
 * @Author: FeikeQ
 * @Date: 2021-03-20 15:33:32
 * @LastEditTime: 2021-11-10 13:53:53
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/store/header.js
 * @Description: VUE状态管理
 * @Use: this.$store.state.header.user.token
 */

/*

 * vuex执行流程
 * 组件操作vuex this.$store.state.xxx  
 * dispatch:调用actions中的某个函数 this.$store.dispatch (触发的action函数名称, 传递给action的数据);
 * store.commit(触发的mutation函数名称, mutation函数要接受的数据);\
 * state:集中所有数据的对象
 * 
*/

/*
state
  是状态数据
  可以通过this.$store.state来直接获取状态
  也可以利用vuex提供的mapState辅助函数将state映射到计算属性（computed）中去。
  用data接收的值不能及时响应更新，用computed就可以
*/
export const state = () => ({
  menus: [],// 主站菜单项或子站顶部菜单项
  channels:[], // 子站导航菜单项
  list: [],// 子站菜单项
  links: [], // 友情链接
  // 用户信息
  user:  {
    id: "",
    token: "",
    referer: "",
    name: "",
    nickname:"",
    cell: "",
    avatar: "",
    remark: "",
  },
  title:"", // 页面标题
  domain:"", // 子域名
  routeMeta:{}, // 当前路由头信息
});


/*
mutations
  用来直接更新数据的方法对象
  直接对数据进行操作（数据操作后会更新state，从而组件会重新渲染）
  Mutation不能使用异步函数
*/
export const mutations = {
  setMenus(state, val) {
    state.menus = val
  },
  setList(state, val) {
    state.list = val
  },
  setLinks(state, val) {
    state.links = val
  },
  setUser(state, val) {
    state.user = val
  },
  setTitle(state, val) {
    state.title = val
  },
  setDomain(state, val) {
    state.domain = val
  },
  setChannels(state, val) {
    state.channels = val
  },
  setRouteMeta(state, val) {
    state.routeMeta = val
  },
}


/*
actions
用来间接更新数据的方法对象，包含n个方法，来间接更新数据
通常会做async异步操作，将操作完成的数据交给mutations函数更新
*/
export const actions = {
  setMenus({ commit }, menus) {
    commit('setMenus', menus)
  },
  async setList({ commit, state, rootState }, params) {
    try {
      //调用方式  data = await store.dispatch("header/setList", route.params.columns);
      // this.$axios.post() 和 this.$axios.$post() 不知啥子区别
      let data = await this.$axios.post(`/IFWebMainSite`,params); 
      console.log('：：nuxtAjaxTest::::::',data);
      commit('setList', data)
      return data;
    } catch (error) {
      return false;
    }
    
  },
  setLinks({ commit }, links) {
    commit('setLinks', links)
  },
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  setTitle({ commit }, title) {
    commit('setTitle', title)
  },
  setDomain({ commit }, domain) {
    commit('setDomain', domain)
  },
  setChannels({ commit }, channels) {
    commit('setChannels', channels)
  },
  setRouteMeta({ commit }, title) {
    commit('setRouteMeta', title)
  },
} 