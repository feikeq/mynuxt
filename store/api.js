import $utils from '@/plugins/utils';
export const state = () => ({

});

export const actions = {
  // 获取远程数据
  async ajax({ commit, state, rootState }, { url, params, multiParameter}) {
    try {
      console.log("---- url ----", url);
      console.log("---- params ----", params);
      let data = await this.$axios.post(url, {params:JSON.stringify(params),...multiParameter});
      // commit('setList', data);
      
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
}
