// 存放 基本身份信息 运营商信息 公检法  网贷逾期信息 多头借贷信息 store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    liangfuNews: [
      {
        title:'复星联合健康保险股份有限公司获准筹建',
      }
    ]
  },
  mutations: {},
  actions: {}
})
