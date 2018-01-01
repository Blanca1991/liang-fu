import Vue from 'vue'
import Vuex from 'vuex'
import summaryInfoStore from '../productComp/summaryInfoStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appOverflow: 'auto',
    isLogin: false, // 登录窗口显示与否 true显示 false 隐藏
    isMask: false, // 灰色遮罩层 true显示 false 隐藏
    isLoginNav: true, // NAV 中的登录点击按钮显示与否
    userName: '',
    pointShow: false, // 控制提示框的显示 true为显示 false为隐藏
    pointText: '' // 提示框内显示的文字
  },
  mutations: {
    SHOWLOGIN (state) {
      // 显示登录
      this.state.isLogin = true
      this.state.isMask = true
      this.state.appOverflow = 'hidden'
    },
    HIDELOGIN (state) {
      // 隐藏登录
      this.state.isLogin = false
      this.state.isMask = false
      this.state.appOverflow = 'auto'
    },
    SHOWPOINT (state, pointText) {
      this.state.pointShow = true
      this.state.pointText = pointText
    },
    HIDEOPTION (state) {
      this.state.pointShow = false
    },
    GETUSERNAME (state, data) {
      this.state.userName = data
    }
  },
  actions: {
    showPoint ({commit}, pointText) {
      commit('SHOWPOINT', pointText)
      setTimeout(function () {
        // 定时器
        commit('HIDEOPTION')
      }, 1800)
    },
    hidePoint ({commit}) {
      commit('HIDEOPTION')
    }
  },
  modules: {
    summaryInfoStore
  }
})
