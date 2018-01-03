import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    score: '390',
    prohibitoryInfo: {
      num: '1',
      detail: [
        {
          ruleName: '公检法信息异常',
          desc: '失信被执行人'
        }
      ]
    },
    restrictedInfo: {
      num: '1',
      detail: [
        {
          ruleName: '可疑查询信息',
          desc: '身份证关联过多个姓名'
        }
      ]
    },
    riskWarningInfo: {
      num: '1',
      detail: [
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
