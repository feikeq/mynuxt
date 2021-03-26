/*
 * @Author: FeikeQ
 * @Date: 2020-12-23 11:15:12
 * @LastEditTime: 2021-02-05 17:56:15
 * @LastEditors: FeikeQ
 * @FilePath: /demo/store/todos.js
 * @Description: 
 */
export const state = () => ({
    list: [{text:'123456789',done:false},{text:2,done:false}]
  })
  
  export const mutations = {

    // 通用业务逻辑处理调取API接口 可服务端和客户端一起调用(处理数据的逻辑写这里)
    // 在asyncData里使用 store.dispatch("todos/add", { box_num: currentTab });
    // 在客户端mossd 里使用 this.$store.dispatch("todos/add", { subtype });
    add(state, text) {
        
      state.list.push({
        text,
        done: true
      });

      console.log('ttttttiis',this);
        return this.$axios.get('/api/fk68').then(res => {
            console.log('resresresresres',res);
            store.commit('setStars', res.data);
            return res.data;
        });
    },
    remove(state, { todo }) {
      state.list.splice(state.list.indexOf(todo), 1)
    },
    toggle(state, todo) {
      todo.done = !todo.done
    }
  }