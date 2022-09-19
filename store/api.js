import $utils from '@/plugins/utils';
export const state = () => ({
  // 用户信息
  user: {
    id: "",
    token: "",
    referer: "",
    name: "",
    nickname: "",
    cell: "",
    avatar: "/images/logo.png",
    remark: "",

  },
  // 微信授权
  weChatToken: {
    access_token: "",
    expires_in: 0,
    openid: "",
    refresh_token: "",
    scope: "",
    expires:0,
  },
  // 微信用户
  weChatInfo: {
    openid: "",
    nickname: "",
    sex: 0,
    province: "",
    city: "",
    country: "",
    headimgurl: "",
    privilege: [],
    unionid: ""
  },

  deviceType:{},
});


export const mutations = {
  setDeviceType(state, val) {
    state.deviceType = val
  },
  setUser(state, val) {
    val.id = parseInt(val.id)
    state.user = val
  },
  setWeChatToken(state, val) {
    state.weChatToken = val
  },
  setWeChatInfo(state, val) {
    state.weChatInfo = val
  }
}


export const actions = {
  // 获取远程数据
  async ajax({ commit, state, rootState }, { url, params, multiParameter }) {
    try {
      console.log("---- url ----", url);
      console.log("---- params ----", params);
      let data = await this.$axios.post(url, { params: JSON.stringify(params), ...multiParameter });
      // commit('setList', data);

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // 代理
  async proxy({ commit, state, rootState }, { url, params, multiParameter }) {
    try {
      console.log("---- url ----", url);
      console.log("---- params ----", params);
      let data = await this.$axios.post(url, { params: JSON.stringify(params), ...multiParameter });
      // commit('setList', data);

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

}
