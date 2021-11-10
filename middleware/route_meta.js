/*
 * @Author: FeikeQ
 * @Date: 2021-11-10 10:31:36
 * @LastEditTime: 2021-11-10 14:01:20
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/middleware/route_meta.js
 * @Description: 路由中间间获取meta信息
 */

export default ({ route, store , app }) => {
  // 设置自动登录
  const cookieArr = app.$utils.getCookieArray();
  if (cookieArr) store.commit("header/setUser",cookieArr);
  // console.log("-=-=-=-=-==-=-=",app.$utils)
  if (route.meta && route.meta[0]) {
    store.commit('header/setRouteMeta', route.meta[0])
    // console.log("结果：\n",store.state.sys)
  }
}
 