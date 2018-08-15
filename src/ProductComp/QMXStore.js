// 存放 企明星 store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isQmxSubTips: false, // 企明星提交订单的成功提示弹框
    // 消息通知列表
    messageList: [
      {
        companyCode: '',
　　　　　commitTime: '',
　　　　　companyName: '',
　　　　　legalPerson: '',
　　　　　visited: '', // 0已读 1未读 messageList 查看和未查看
　　　　　orderCode: '',
　　　　　status: ''   // 订单状态（0：生成中，1：获取数据成功，2：获取数据失败，3：部分成功）
      }
    ],
    noReadNum: 0, // 消息列表未读消息
    // 企明星订单list
    orderList: [
//       {
//         companyCode: '91110108551385082Q',
// 　　　　　commitTime: '2018-04-12',
// 　　　　　companyName: '八十米八股份有限公司',
// 　　　　　legalPerson: '雷军',
// 　　　　　visited: '1', // 已读 未读 messageList 查看和未查看
// 　　　　　orderCode: 'FOSUN-20180412173857714-FAN-379090',
// 　　　　　status: '1'   // 订单状态（0：审批中，1：获取数据成功，2：获取数据失败，3：部分成功）
//       }
    ],
    totalResult: null, // 订单信息的总条数
    pageSizeNum: 10 , // 分页中 每条展示设置默认为10
    totalResultMsg: null, // 消息通知分页中 每条展示设置默认为10
    pageSizeNumMsg: 10, // 消息通知分页中 每条展示设置默认为10
  },
  mutations: {
  },
  actions: {
  }
})
