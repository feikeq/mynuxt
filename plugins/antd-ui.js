/*
 * @Author: FeikeQ
 * @Date: 2021-03-26 15:06:23
 * @LastEditTime: 2021-03-26 15:40:22
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/plugins/antd-ui.js
 * @Description: 
 */
import Vue from 'vue'


// ant-design-vue 安装指定版本  "ant-design-vue": "^1.7.8"
// npm install ant-design-vue@1.7.8 --save
import Antd from 'ant-design-vue/lib'
import utils from '~/plugins/utils'
Vue.prototype.hasComponent = (comp_name) => {
  var getCamelCase = function (str, mark, big) {
    if (big) str = (mark || "_") + str;
    var reg = new RegExp("\\" + (mark || "_") + "(\\w)", "g");
    return str.replace(reg, function (all, letter) {
      return letter.toUpperCase();
    });
  };
  var compName = getCamelCase(comp_name, "-", 1);
  return typeof Vue.component(compName) === "function"
    ? compName
    : "";
};
Vue.use(Antd)

/*
注入对象。随处可见的通过前缀$访问插件。
-----------------------------------
同时注入context，Vue实例，甚至Vuex
可以使用inject方法,它是plugin导出函数的第二个参数。 
将内容注入Vue实例的方式与在Vue应用程序中进行注入类似。
系统会自动将$添加到方法名的前面。
*/
export default function ({ app: { $request } }, inject) {
  inject('utils', utils) //NUXT 注册全局组件
  //现在就可以在context，或者Vue实例中的this，或者Vuex的actions/mutations方法中的this来调用 $utils 内的方法与函数
}




/* 
// Ant Design 按需加载 按需引用 
注解掉 import Antd from 'ant-design-vue/lib' 和 Vue.use(Antd)

import {
  Input,
  Modal,
  Button,
  Message,
  Icon,
  Drawer, 
  Spin,
  Carousel,
  Tabs,
  Switch
} from "ant-design-vue";

Vue.use(Input);
Vue.use(Modal); // prototype(Message).use(Notification); //这两个JS组件无法使用use只能挂原型上
Vue.use(Button);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Spin);
Vue.use(Carousel);
Vue.use(Tabs);
Vue.use(Switch);


// 注入
Message.config({
  duration: 2,
  maxCount: 2,
});
Vue.prototype.$message = Message;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;


*/