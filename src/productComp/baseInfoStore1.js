import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseInfo: {
      name: '李晓天',
      idNumber: '64***********14',
      age: '36',
      sex: '男',
      idNumberOwnership: '宁夏回族自治区银南地区青铜峡市',
      idNumberCheck: '是',
      nameMatchIdNumber: '是'
    },
    telecomInfo: {
      type: '联通',
      mobileNo: '15379509999',
      mobileOwnership: '上海',
      inTime: '3-6个月',
      onLineStatus: '正常在用',
      nameMatchMobile: '否'
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
