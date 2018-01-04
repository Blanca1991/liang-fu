// 存放 基本身份信息 运营商信息 公检法  网贷逾期信息 多头借贷信息 store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseInfo: {
      name: '李晓天',
      idNumber: '302102197107030971',
      age: '36',
      sex: '男',
      idNumberOwnership: '宁夏回族自治区银南地区青铜峡市',
      idNumberCheck: '否',
      nameMatchIdNumber: '否'
    },
    // 运营商信息
    telecomInfo: {
      type: '电信',
      mobileNo: '18616915961',
      mobileOwnership: '上海',
      inTime: '24个月',
      onLineStatus: '正常在用',
      nameMatchMobile: '否'
    },
    // 公检法信息
    publicSecurityInfo: {
      negativeInfo: [
        {
          date: '2016年01月05日',
          type: '失信公告',
          title: '申请执行人甘志望与被执行人王大平、吕枝民间借贷纠纷一案',
          matchDegree: '高'
        },
        {
          date: '2015年10月10日',
          type: '执行公告',
          title: '顾英全与丁玉国民间借贷纠纷一审民事判决书',
          matchDegree: '高'
        }
      ],
      // 不良行为分
      negativeScore: {
        score: '',
        level: '中风险'
      }
    },
    // 网贷逾期信息
    overdueInfo: {
      isOverdue180: '否',
      isOverdue90: '是'
    },
    // 多头借贷信息
    borrowingInfo: {
      borrowingNumber: '31',
      applyAmount: '1400000',
      passedAmount: '1400000',
      overdueAmount: '49500',
      record: [
        {
          type: '个人信贷',
          borrowingStatus: '批贷已放款',
          amount: '50000',
          date: '2015-10-01',
          numberOfPeriods: '1',
          repaymentStatus: '未知',
          overdueAmount: '0'
        },
        {
          type: '个人信贷',
          borrowingStatus: '批贷已放款',
          amount: '50000',
          date: '2015-10-01',
          numberOfPeriods: '1',
          repaymentStatus: 'M6+',
          overdueAmount: '49500'
        }
      ]
    },
    // 联系人圈子信息
    contactsInfo: {
      directContacts: '940',
      directContactsBlacklist: '2',
      indirectContactsBlacklist: '3156',
      score: '0'
    },
    // 疑似APP注册信息
    appInfo: {
      financialAppCount: null,
      borrowingAppCount: null,
      financialOrBorrowingAppCount: '1'
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