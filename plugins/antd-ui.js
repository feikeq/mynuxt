/*
 * @Author: FeikeQ
 * @Date: 2021-03-26 15:06:23
 * @LastEditTime: 2021-03-26 15:26:02
 * @LastEditors: FeikeQ
 * @FilePath: /mynuxt/plugins/antd-ui.js
 * @Description: 
 */
import Vue from 'vue'
import Antd from 'ant-design-vue/lib'
import utils from '~/plugins/utils'

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
