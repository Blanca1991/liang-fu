// 存放 基本身份信息 运营商信息 公检法  网贷逾期信息 多头借贷信息 store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 公检法信息
    publicSecurityInfoNew: {
      negativeList: {
        // 失信公告
        shixin: [
          {
            jtqx: '有履行能力而拒不履行生效法律文书确定义务',
            pname: '肖猛',
            sortTime: 1495036800000,
            dataType: 'shixin',
            matchRatio: 0.99,
            matchDegree: '高',
            body: '有履行能力而拒不履行生效法律文...',
            court: '平湖市人民法院',
            shixinId: 'c2017330482zhi1024_t20170518_pxiaomeng',
            caseNo: '（2017）浙0482执1024号',
            yjCode: '（2016）浙0482刑初1149号',
            postTime: 1499356800000,
            lxqk: '全部未履行',
            province: '浙江省',
            sortTimeString: '2017年05月18日',
            yiwu: '详见生效法律文书',
            partyIdentity: '被执行人',
            yjdw: '嘉兴平湖法院'
          }
        ],
        // 法院公告
        fygg: [
          {
            sortTimeString: '2017年01月01日',
            pname: '肖猛',
            sortTime: 1483200000000,
            dataType: 'fygg',
            partyIdentity: '被执行人',
            fyggId: '4761465',
            matchRatio: 0.99,
            matchDegree: '高',
            body: '4206031979****2...',
            court: '浙江省平湖市人民法院',
            ggType: '裁判文书',
            caseNo: null
          }
        ],
        // 裁判文书
        cpws: [
          {
            partys: [
              {
                birthday: '19920813',
                address: '湖北省孝昌县',
                pname: '肖猛',
                idcardNo: '',
                partyResult: '平',
                lawOffice: '',
                partyType: '自然人',
                title: '被执行人',
                lawyer: '',
                status: 'p'
              }
            ],
            sortTime: 1502985600000,
            dataType: 'cpws',
            judgeResult: '',
            matchRatio: 0.4,
            matchDegree: '低',
            body: '被执行人:肖猛 平 肖猛执行实...',
            court: '浙江省平湖市人民法院',
            title: '肖猛执行实施类执行裁定书',
            caseNo: '（2017）浙0482执1024号',
            caseCause: '诈骗罪',
            sortTimeString: '2017年08月18日',
            cpwsId: 'c2017330482zhi1024_t20170818',
            partyId: 'c2017330482zhi1024_t20170818_pxiaomeng_rt_111'
          }
        ],
        // 执行公告
        zxgg: [
          {
            zxggId: 'c2017330482zhi1024_t20170518_pxiaomeng',
            sortTimeString: '2017年05月18日',
            pname: '肖猛',
            sortTime: 1495036800000,
            dataType: 'zxgg',
            partyIdentity: '被执行人',
            matchRatio: 0.99,
            matchDegree: '高',
            body: '肖猛 42092119920*...',
            court: '平湖市人民法院',
            execMoney: 0,
            caseNo: '（2017）浙0482执1024号'
          }
        ],
        // 网贷黑名单
        wdhmd: [
          {
            caseCode: '',
            pname: '肖猛',
            sortTime: 1431532800000,
            dataType: 'wdhmd',
            idcardNo: '4206846*******1518',
            updateTime: '',
            matchRatio: 0.99,
            matchDegree: '高',
            execCourt: '',
            relatedParty: '',
            court: null,
            caseNo: null,
            bjbx: '685.98',
            yhje: '',
            sortTimeString: '2015年05月14日',
            whfx: '01',
            datasource: '金归子催收服务平台',
            partyIdentity: '被告'
          }
        ],
        // 开庭公告
        ktgg: [
          {
            plaintiff: '公诉人/原告/上诉人/申请人:未知',
            pname: '刘晨',
            sortTime: 1487295000000,
            dataType: 'ktgg',
            matchRatio: 0.99,
            matchDegree: '高',
            body: '4209211992****4...',
            court: '浙江省平湖市人民法院',
            caseNo: '（2016）浙0482刑初1149号',
            ktggId: 'c2016330482xingchu1149_t20170217',
            caseCause: '诈骗罪',
            sortTimeString: '2017年02月17日',
            courtroom: '第十一审判法庭',
            defendant: '被告人:刘佩佩,盛梦园,周龙,刘晨,彭露,肖肖,彭超,张涛,席字经',
            judge: ''
          }
        ],
        // 案件流程
        ajlc: [
          {
            sortTimeString: '2016年12月26日',
            ajlcId: 'c2016330482xingchu1149_t20161226',
            ajlcStatus: '立案受理',
            pname: '肖猛',
            sortTime: 1482681600000,
            dataType: 'ajlc',
            partyIdentity: '被执行人',
            matchRatio: 0.99,
            matchDegree: '高',
            body: '4209211992****4...',
            court: null,
            caseNo: '（2016）浙0482刑初1149号'
          }
        ],
        // 曝光台
        bgt: [
          {
            pname: '肖猛',
            sortTime: 1495036800000,
            dataType: 'bgt',
            matchRatio: 0.99,
            matchDegree: '高',
            body: '{姓名=肖猛, 标的金额=20...',
            court: '平湖市人民法院',
            execMoney: 20000,
            caseNo: '（2017）浙0482执1024号',
            caseCause: '诈骗罪',
            sortTimeString: '2017年05月18日',
            bgDate: 1514131200000,
            partyIdentity: '被执行人',
            bgtId: 'c2017330482zhi1024_t20170518_pxiaomeng'
          }
        ]
      },
      // 不良行为分
      badbehaviorInfo: {
        type: '0', // 0 低风险 1中  234 高风险  0：无； 1：前科；2：涉案；3：犯罪嫌疑人 ；4：吸毒
        level: '低风险'
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
