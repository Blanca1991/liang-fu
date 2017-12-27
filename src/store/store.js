import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false, // 登录窗口显示与否 true显示 false 隐藏
    isMask: false, // 灰色遮罩层 true显示 false 隐藏
    isLoginNav: true, // NAV 中的登录点击按钮显示与否
    userName: ''
  },
  mutations: {
    showLogin (state) {
      // 显示登录
      this.state.isLogin = true
      this.state.isMask = true
    },
    hideLogin (state) {
      // 隐藏登录
      this.state.isLogin = false
      this.state.isMask = false
    },
    hideLoginNavBtn (state) {
      this.state.loginNav = false
    }
  },
  actions: {}
})
