// const moment = require('moment')
// moment.locale('zh-CN')

// import utils2 from '@/plugins/utils2' //utils2.js  里的 export default
// import { realFormatSecond } from '@/plugins/utils2' //utils2.js  里的 export const realFormatSecond

/*
https://www.nuxtjs.cn/guide/plugins
如何使Nuxt成为全局对象？
plugin 一般向外暴露一个函数，该函数接收两个参数分别是 context 和 inject
    context： 上下文对象，该对象存储很多有用的属性。比如常用的 app 属性，包含所有插件的 Vue 根实例。例如：在使用 axios 的时候，你想获取 $axios 可以直接通过 context.app.$axios 来获取。
    inject： 该方法可以将 plugin 同时注入到 context， Vue 实例， Vuex 中。
    例：


    import Api from './api' // 自定变量内容 其他自便
    // 这里是 为了在 asyncData 方法中使用
    export default ({ app }, inject) => {
        // Set the function directly on the context.app object
        app.$api = Api // 名称
    };



// 注入对象。随处可见的通过前缀$访问插件。
// -----------------------------------
// 同时注入context，Vue实例，甚至Vuex
// 可以使用inject方法,它是plugin导出函数的第二个参数。 
// 将内容注入Vue实例的方式与在Vue应用程序中进行注入类似。
// 系统会自动将$添加到方法名的前面。

export default function ({ app: { $request } }, inject) {
    inject('utils', utils) //NUXT 注册全局组件
    //现在就可以在context，或者Vue实例中的this，或者Vuex的actions/mutations方法中的this来调用 $utils 内的方法与函数
  }
  

  注意：nuxt.config.js: 由于Nuxt.js 2.4，模式已被引入作为插件的选项来指定插件类型，可能的值是：client 或 server, ssr:false 在下一个主要版本中弃用,将过渡为 mode: 'client'。
 

 */

export default {
  /**
   * 匹配文本中的url
   * @param {string} str
   * @return {array}
   */
  matchUrl(str) {
    if (typeof str !== "string") {
      return [];
    }
    return (
      str.match(
        /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
      ) || []
    );
  },
  // 判断是否为 Array 数组
  isArray: function (obj) {
    return toString.apply(obj) === "[object Array]";
  },
  // 判断是否为 Object 对象
  isObject: function (obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  },
  trim: function (text) {
    return (text || "").replace(/^\s+|\s+$/g, "");
  },
  // 将JSON数组对象转成字符串参数 params 查询字符串 例 a=1&b=2
  params: function (json) {
    return Object.keys(json)
      .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
      })
      .join("&");
  },
  // 拼接地址链接URL的参数（检查 url 链接是否已经有参数，添加 ？问号 或 & 与号）
  addQueryString: function (url, query) {
    var separator = url.indexOf("?") != -1 ? "&" : "?";
    url += separator + query;
    return url;
  },

  // 秒钟转为00:00格式
  realFormatSecond: function (second) {
    var secondType = typeof second;
    if (secondType === "number" || secondType === "string") {
      second = parseInt(second);
      var mimute = Math.floor(second / 60);
      second = second - mimute * 60;
      var _addZero_mimute = mimute < 10 ? "0" + mimute : mimute;
      return _addZero_mimute + ":" + ("0" + second).slice(-2);
    } else {
      return "00:00";
    }
  },
  /*
    时间戳转化成日期格式
    console.log("2020-11-24 15:20:33", $$FK$$.formatime('1396555440000', "yyyy-MM-dd hh:mm:ss.S"));
    console.log('14-4-4 4:4:0.0', $$FK$$.formatime(new Date('2014-04-04 04:04').getTime(), "YYYY-M-d h:m:s.S"));
    console.log('2020年第4季度11月24日15小时24分18秒694毫秒星期二', $$FK$$.formatime(Date.now(), "yyyy年第q季度MM月dd日hh小时mm分ss秒S毫秒W"))
*/
  formatime: function (timestamp, str) {
    var now = new Date(timestamp * 1);
    var o = {
      "Y+": now.getFullYear().toString(), // 年
      "M+": now.getMonth() + 1, //month 月份
      "d+": now.getDate(), //day 日
      "h+": now.getHours(), //hour 小时
      "m+": now.getMinutes(), //minute 分
      "s+": now.getSeconds(), //second 秒
      "q+": Math.floor((now.getMonth() + 3) / 3), //quarter 季度
      S: now.getMilliseconds(), //millisecond 毫秒
      W: new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      )[now.getDay()],
    };
    if (/(y+)/.test(str))
      str = str.replace(
        RegExp.$1,
        (now.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(str))
        str = str.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return str;
  },


  // Cookie操作:获取、设置、删除 
  appCookie: function (c_name, value, expireday, path, domain) {
    var COOKIE = window.document.cookie;
    if (value) {
      //setCookie + delCookie
      if (expireday < 0) value = "";
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expireday);
      var _tmp = c_name +
        "=" +
        encodeURIComponent(value) +
        (expireday == null ? "" : "; expires=" + exdate.toGMTString()) +
        (path == null ? "" : "; path=" + path) +
        (domain == null ? "" : "; domain=" + domain);

      window.document.cookie =
        c_name +
        "=" +
        encodeURIComponent(value) +
        (expireday == null ? "" : "; expires=" + exdate.toGMTString()) +
        (path == null ? "" : "; path=" + path) +
        (domain == null ? "" : "; domain=" + domain);
    } else {
      //getCookie
      if (COOKIE.length > 0) {
        var c_start = COOKIE.indexOf(c_name + "=");
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          var c_end = COOKIE.indexOf(";", c_start);
          if (c_end == -1) c_end = COOKIE.length;
          return decodeURIComponent(COOKIE.substring(c_start, c_end));
        }
      }
      return null;
    }
    return true;
  },


  getCookieArray: function (cookiestr) {
    var _cookiestr = cookiestr || (process.browser ? window.document.cookie : false);
    if (!_cookiestr) return {};
    var arr = _cookiestr.split(";");
    var _temp = {};
    for (var i = 0; i < arr.length; i++) {
      var t = arr[i].split("=");
      var key = t[0].replace(/(^\s*)|(\s*$)/g, "");
      var val = t[1];
      _temp[key] = unescape(val);
    }
    return _temp;
  },
  // 呼叫
  e: function (r, n, t) {
    var e = this,
      i = arguments[3],
      s = function (r) {
        if (r && r.length) {
          for (var t = "", e = !1, i = 0; i < r.length; i++) {
            var s = r["ch" + o[1] + o[6] + "A" + o[7]](i);
            "|" == s
              ? (e = !0)
              : e
                ? ((e = !1), (t += s))
                : (t += n && void 0 !== n[s] ? n[s] : s);
          }
          return t;
        }
      },
      o = ["6", "a", "o", "e", "F", "l"],
      u = String["fr" + o[2] + "mCh" + o[1] + "rC" + o[2] + "d" + o[3]](
        1 * (4 + o[0])
      ),
      f = function (r) {
        if (!r) return !1;
        var n = "undefined" != typeof window ? window : e;
        if ("string" != typeof r) return !1;
        var t = r["sp" + o[5] + "i" + o[7]](u)[1],
          s = r["sp" + o[5] + "i" + o[7]](u)[2];
        ((t = (function (r) {
          for (
            var n = r.slice(-1),
            t = r.slice(0, -1),
            e = t.length,
            s = Math.PI.toString(),
            o = 0,
            u = 0;
            u < e;
            u++
          ) {
            var f = 1 * (s[u] || 10);
            f || (f = 10), (o += t[u] * f);
          }
          var a = o % 11;
          return (
            10 == a && (a = 0),
            i && v(arguments.callee.name, a, n),
            n == a ? 1 * t : 0
          );
        })(s + t)),
          s.length < 8) &&
          (s =
            new n["D" + o[1] + "te"]()[
              "g" + o[3] + "t" + o[4] + "ul" + o[5] + "Y" + o[3] + o[1] + "r"
            ]() + s);
        var f = t * (1 * ("8" + o[0] + "400")),
          a = n["D" + o[1] + "te"],
          p = a["n" + o[2] + "w"](),
          h = s.substr(0, 4) + "/" + s.substr(4, 2) + "/" + s.substr(6, 2),
          l = a["p" + o[1] + "rse"](h);
        return !!l && !(l > p) && !(p > l + 1e3 * f);
      },
      a = function (r) {
        if (r.length) var n = e;
        for (var t = 0; t < r.length; t++) {
          var i = r[t];
          n[i] && (n = n[i]);
        }
        return n;
      };
    o.push("r"), o.push("t");
    var v = console[o[5] + o[2] + "g"];
    return (
      i && v(e, t),
      i && v(typeof t),
      e && t && "string" == typeof t
        ? (i &&
          (v(this),
            v(s(t)),
            v(s(r)),
            v(a(s(t)["sp" + o[5] + "i" + o[7]](u))),
            v(f(a(s(t)["sp" + o[5] + "i" + o[7]](u))))),
          f(a(s(t)["sp" + o[5] + "i" + o[7]](u)))
            ? a(s(r)["sp" + o[5] + "i" + o[7]](u))
            : function () { })
        : function () { }
    );
  },
};
