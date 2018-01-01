import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    score: '390',
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
    EMPTYDETILDS (state) {
      // 空数据处理
      console.log(state.length)
    }
  },
  actions: {}
})
