 
/*
** 只在生产模式的客户端中使用
*/

/*
** 只在生产模式的客户端中使用
*/
var la51 = function () {
  if (process.client && process.env.NODE_ENV !== 'production') return;
  var hm = document.createElement("script");
  hm.src = "//sdk.51.la/js-sdk-pro.min.js";
  hm.id = "LA_COLLECT";
  hm.setAttribute("charset","UTF-8");
  hm.onload = function() {
    LA.init({id: "JLEUCyBYttzTWhgC",ck: "JLEUCyBYttzTWhgC"})
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
}


var fk_analytics = function () {
  console.log('<script type="text/javascript" src="https://s9.cnzz.com/z_stat.php?id=128113&web_id=128113"></script>')
  var hm = document.createElement("script");
  hm.src = "https://s9.cnzz.com/z_stat.php?id=128113&web_id=128113";
  hm.id = "cnzz_tj_byfk";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
};


export default ({ app: { router }, store }) => {
  /*
  ** 每次路由变更时进行pv统计
  */
  if (process.client && process.env.NODE_ENV === 'production') {
    router.afterEach((to, from) => {
      fk_analytics();
    })
  }
}
