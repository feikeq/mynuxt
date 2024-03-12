/*
 * @Author: FeikeQ
 * @Date: 2021-11-10 10:31:36
 * @LastEditTime: 2021-11-10 14:01:20
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/middleware/route_meta.js
 * @Description: 路由中间件获取meta信息
 */



export default ({ route, store, app, req, redirect }) => {

  // 路由中间件
  /*
 设置自动登录 (也可以通过 layouts/default 设置组件内前置路由守卫 )
 路由中间件兼容服务端和客户端获取cookie

 if (cookieArr) store.commit("header/setUser",cookieArr); //同步操作
 if (cookieArr) store.dispatch("header/setUser", cookieArr); //异步操作


 登录保存代码

    setUserInfo(res) {
      const userInfo = {
        id: res.id,
        token: res.token,
        referer: res.referer,
        name: res.username,
        nickname: res.nickname,
        cell: res.cell,
        avatar: res.avatar || `/images/user/pic.png`,
        remark: res.remark, // 消息红点
        joinTime: res.joinTime,
        memo: res.memo,
      };
      console.log("收到的form表单: ", userInfo);

      // localStorage 自动登录 localStorage
      // localStorage.setItem("userInfo", JSON.stringify(userInfo));

      // cookie 自动登录 
      for (const key in userInfo) {
        this.$utils.appCookie(
          this.cacheName + key,
          userInfo[key],
          this.cacheDay,
          "/"
        );
      }

      this.$store.dispatch("sys/setUser", userInfo);
      this.$router.go(0); //刷新页面 this.$router.push("/");
      // this.$message.success("登录成功");
    },
    
 */



  // console.log("------------------", process.client);
  var cookieArr = app.$utils.getCookieArray(req && req.headers && req.headers.cookie);
  var cacheName = process.env.LAUNCH_APP ? process.env.LAUNCH_APP.cacheName : '';
  // console.log('cookie', typeof cookieArr, cookieArr);
  var userInfo = {};
  for (let key in cookieArr) {
    var name = key.replace(cacheName, "");
    userInfo[name] = cookieArr[key];
  }
  // console.log(userInfo);
  store.dispatch("sys/setUser", userInfo);


  // console.log("-=-=-=-=-==-=-=",app.$utils)
  if (route.meta && route.meta[0]) {
    store.commit('header/setRouteMeta', route.meta[0])
    // console.log("结果：\n",store.state.sys)
  }
}