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
      idNumberCheck: '是',
      nameMatchIdNumber: '否'
    },
    // 运营商信息
    telecomInfo: {
      type: '电信',
      mobileNo: '18616915961',
      mobileOwnership: '上海市上海',
      inTime: '24个月',
      onLineStatus: '正常在用',
      nameMatchMobile: '否'
    },
    // 网贷逾期信息
    overdueInfo: {
      isOverdue180: '否',
      isOverdue90: '是'
    },
    // 多头借贷信息
    borrowingInfo: {
      borrowingNumber: null,
      applyAmount: '[6000,100000)',
      passedAmount: '[6000,100000)',
      // applyAmount: '6000',
      // passedAmount: '6000',
      overdueAmount: '49500',
      record: [
        {
          type: '个人信贷',
          borrowingStatus: '批贷已放款',
          amount: '[3000,50000)',
          // amount: '3000',
          date: '2015-10-01',
          numberOfPeriods: '1',
          repaymentStatus: '未知',
          overdueAmount: '0'
        },
        {
          type: '个人信贷',
          borrowingStatus: '批贷已放款',
          amount: '[3000,50000)',
          // amount: '3000',
          date: '2015-10-01',
          numberOfPeriods: '1',
          repaymentStatus: 'M6+',
          overdueAmount: '49500'
        }
      ]
    },
    // 风险名单信息
    riskListInfo: [
      {
        riskListType: '虚假申请名单',
        hit: '是',
        listDetail: '伪冒,资料虚假,申请信息虚假'
      },
      {
        riskListType: '逾期不良名单',
        hit: '是',
        listDetail: '丧失还款能力,长期拖欠,不良客户'
      },
      {
        riskListType: '司法高危名单',
        hit: '是',
        listDetail: '法院失信,法院被执行'
      },
      {
        riskListType: '其他风险名单',
        hit: '是',
        listDetail: '同行中介,用途风险,其他,疑似欺诈或高风险'
      }
    ],
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
    },
    // 历史查询信息
    historyInfo: {
      queryInfo: [
        {
          date: '2017-10-25',
          type: '线下消费分期',
          isLocal: 'true'
        }
      ],
      // 可疑信息记录
      suspiciousQueryInfo: {
        userIdNumberForName: '',
        userIdNumberForMobile: [
          {
            date: '2017-10-19',
            mobile: '18516508888'
          }
        ],
        userMobileForName: [
          {
            date: '2017-10-25',
            personName: '王国'
          },
          {
            date: '2017-10-25',
            personName: '李二狗'
          }
        ],
        userMobileForIdNumber: [
          {
            date: '2017-10-25',
            idNumber: '642102197107030933'
          }
        ]
      }
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
