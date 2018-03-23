// 存放 基本身份信息 运营商信息 公检法  网贷逾期信息 多头借贷信息 store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isQmxSubTips: false, // 企明星提交订单的成功提示弹框
    // 企明星订单list
    orderList: [
      {
        orderNo: '127892982737',
        company: '量富征信管理有限公司',
        num: '127892982737',
        name: '张张',
        orderDate: '2017-01-01',
        orderState: '完成'
      },
      {
        orderNo: '127892982737',
        company: '量富征信管理有限公司',
        num: '127892982737',
        name: '张张',
        orderDate: '2017-01-01',
        orderState: '完成'
      },
      {
        orderNo: '127892982737',
        company: '量富征信管理有限公司',
        num: '127892982737',
        name: '张张',
        orderDate: '2017-01-01',
        orderState: '完成'
      },
      {
        orderNo: '127892982737',
        company: '量富征信管理有限公司',
        num: '127892982737',
        name: '张张',
        orderDate: '2017-01-01',
        orderState: '完成'
      },
      {
        orderNo: '127892982737',
        company: '量富征信管理有限公司',
        num: '127892982737',
        name: '张张',
        orderDate: '2017-01-01',
        orderState: '完成'
      },
      {
        orderNo: '127892982737',
        company: '量富征信管理有限公司',
        num: '127892982737',
        name: '张张',
        orderDate: '2017-01-01',
        orderState: '完成'
      },
      {
        orderNo: '127892982737',
        company: '量富征信管理有限公司',
        num: '127892982737',
        name: '张张',
        orderDate: '2017-01-01',
        orderState: '完成'
      },
      {
        orderNo: '127892982737',
        company: '量富征信管理有限公司',
        num: '127892982737',
        name: '张张',
        orderDate: '2017-01-01',
        orderState: '完成'
      },
      {
        orderNo: '127892982737',
        company: '量富征信管理有限公司',
        num: '127892982737',
        name: '张张',
        orderDate: '2017-01-01',
        orderState: '完成'
      },
      {
        orderNo: '127892982737',
        company: '量富征信管理有限公司',
        num: '127892982737',
        name: '张张',
        orderDate: '2017-01-01',
        orderState: '完成'
      }
    ]
  },
  mutations: {
  },
  actions: {
  }
})
