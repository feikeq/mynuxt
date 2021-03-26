//Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。
export const state = () => ({
    someValue: '',
    counter: 0,
  })
  
  //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
  //Vuex 中的 mutation 非常类似于事件：
  //每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
  //这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
  export const mutations = {
    increment(state) {
        // 变更状态
        state.counter++
      },
    changeSomeValue(state, newValue) {
      this.$myInjectedFunction('accessible in mutations')
      state.someValue = newValue
    }
  }
  
  //Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作
  //解决mutations只有同步的问题,提出了actions(异步),专门用来解决mutations只有同步无异步的问题
  export const actions = {
    setSomeValueToWhatever({ commit }) {
      this.$myInjectedFunction('accessible in actions')
      const newValue = 'whatever'

      //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
      //因此你可以调用 context.commit 提交一个 mutation，
      //或者通过 context.state 和 context.getters 来获取 state 和 getters。
      //当你了解到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。
      commit('changeSomeValue', newValue) // 调用 mutations 里的 changeSomeValue 方法
    }
  }
 