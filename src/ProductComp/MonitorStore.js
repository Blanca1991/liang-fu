// 存放 企业监测 store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 企业监测预警的数据
    monitorList: [ // 预警监测 list表
      {
        // company: '复星金服',
        // id: 250,
        // riskLevel: '关注信息',
        // changeItem: 'FRINV',
        // changeType: 'remove',
        // altDate: '2018-04-20',
        // msgStatus: '0', // 0：未读， 1：已读
        // changeDetail: {},
        // companyInfoDTO: {
        //   companyName: '复星金服',
        //   legalPerson: '李四',
        //   creditCode: '91310115733387126K',
        //   foundingDate: '1900-01-01'
        // }
      }
    ],
    totalResultMon: null || 0, // 监测预警 list表的总条数
    // 企业监测 关注企业list
    attentionList: [
      // {
      //   companyName: '八十米八股份有限公司',
      //   monitorPeriod: '2018-01-01至2018-04-04',
      //   updateNum: 3,
      //   laterUpdateDate: '2018-03-03',
      //   statusDsc: 1,
      //   companyInfoDTO: {
      //     companyName: '复星金服',
      //     creditCode: '91310115733387126K',
      //     foundingDate: '1900-01-01',
      //     legalPerson: '李四'
      //   }
      // }
    ],
    totalResultAtt: null || 0, // 关注企业 list表的总条数
    // 企业监测 添加监控企业 搜索到的 list
    addMonCompanyList: [
      // {
      //   companyName: '辉山乳业（安徽有限公司）',
      //   companyCode: '91110108551385082Q',
      //   legalPerson: '雷军',
      //   createdDt: '2010-01-01',
      //   status: 1,
      //   monitorPeriod: ''
      // }
    ],
    isShowAddMon: false, // 添加监控企业弹框显示
    isShowDelMon: false, // 删除监控企业弹框显示
    // 监测预警 我的信息列表
    monMsgList: [
      // {
      //   companyName: '上海复星产业投资有限公司',
      //   sendTime: '2017-02-02',
      //   id: 13,
      //   mailContent: '您监控的征信报告有限公司已经过期，请重新监控',
      //   status: 0 // 0已读 1未读 messageList 查看和未查看
      // }
    ],
    totalResultMsg: null || 0,
    noReadCount: null || 0, // 消息未读
    companyInfo: { // 重新监控 监控信息
      companyName: 'xiaomi',
      creditCode: '124',
      legalPerson: 'sdgagasga',
      foundingDate: 'gasdgasgas'
    },
    routerCompanyName: null , // 企业监测 从消息跳转到 关注企业用的 企业名
  },
  mutations: {
  },
  actions: {
  }
})
