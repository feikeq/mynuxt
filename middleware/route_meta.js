/*
 * @Author: FeikeQ
 * @Date: 2021-11-10 10:31:36
 * @LastEditTime: 2021-11-10 14:01:20
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/middleware/route_meta.js
 * @Description: 路由中间件获取meta信息
 */

export default ({ route, store , app }) => {
  // 路由中间件

  // 设置自动登录 (也可以通过 layouts/default 设置组件内前置路由守卫 )
  const cookieArr = app.$utils.getCookieArray();
  if (cookieArr) store.commit("header/setUser",cookieArr); //同步操作
  // if (cookieArr) store.dispatch("header/setUser", cookieArr); //异步操作

  // console.log("-=-=-=-=-==-=-=",app.$utils)
  if (route.meta && route.meta[0]) {
    store.commit('header/setRouteMeta', route.meta[0])
    // console.log("结果：\n",store.state.sys)
  }
}
 