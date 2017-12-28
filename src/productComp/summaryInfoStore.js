import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prohibit: {
      num: '1',
      details: [
        {
          ruleName: '公检法信息异常',
          desc: '失信被执行人'
        }
      ]
    },
    restriction: {
      num: '0',
      details: []
    },
    prompt: {
      num: '1',
      details: [
        {
          ruleName: '运营商信息异常',
          desc: '申请人姓名与手机号不一致'
        }
      ]
    }
  },
  mutations: {
    CHANGEDETILDS (state) {
      // 空数据处理
      console.log(state)
      // for (let i = 0; i < state.length; i++) {
      //   console.log(data[i])
      // }
    },
    HIDELOGIN (state) {
      // 隐藏登录
      this.state.isLogin = false
      this.state.isMask = false
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
  }
})
