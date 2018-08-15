import Vue from 'vue'
import Vuex from 'vuex'
import summaryInfoStore from '../AntifraudComp/summaryInfoStore'
import baseInfoStore from '../AntifraudComp/baseInfoStore'
import publicStore from '../AntifraudComp/publicStore'
import QMXStore from '../ProductComp/QMXStore'
import MonitorStore from '../ProductComp/MonitorStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appOverflow: 'auto',
    itemGo: null , // 跳转的产品页  1：企明星  2：星护甲
    isLogin: false, // 登录窗口显示与否 true显示 false 隐藏
    isMask: false, // 灰色遮罩层 true显示 false 隐藏
    isLoginNav: true, // NAV 中的登录点击按钮显示与否
    userName: null,
    pointShow: false, // 控制提示框的显示 true为显示 false为隐藏
    pointText: '', // 提示框内显示的文字
    pointShowBtn: false, // pointShow 弹框有无Btn按钮 fasle 隐藏btn true 显示btn
    pointOutLoginBtn: false, // 弹框有无登录 Btn按钮 fasle 隐藏   true 显示
    appScrollTop: 0, // id = app scroll 的高度
    floorListTop: '20px', // 楼梯层跟随
    isWarning: true, // product用到的   注意 实例显示和隐藏
    isLoginBox: false, // 在home页面中 需要用到的控制isLoginBox显示与否 true显示  false 隐藏
    appDom: '', // 获取app Dom元素
    scrollLeft: 0, // 被浏览器卷去的宽度
    appWidth: '',
    qmxOrderCode: '', // 企明星的orderCode
    modelListTop: [
      {
        modelName: 'summaryInfo',
        topNum: 0 // 总体评分模块的top值
      },
      {
        modelName: 'baseInfo',
        topNum: 0 // 基本身份信息
      },
      {
        modelName: 'telecomInfo',
        topNum: 0 // 运营商信息
      },
      {
        modelName: 'publicSecurityInfo',
        topNum: 0 // 公检法信息
      },
      {
        modelName: 'overdueInfo',
        topNum: 0 // 网贷逾期信息
      },
      {
        modelName: 'borrowingInfo',
        topNum: 0 // 多头借贷信息
      },
      {
        modelName: 'riskListInfo',
        topNum: 0 // 风险名单信息
      },
      {
        modelName: 'contactsInfo',
        topNum: 0 // 联系人圈子
      },
      {
        modelName: 'appInfo',
        topNum: 0 // 疑似App
      },
      {
        modelName: 'historyInfo',
        topNum: 0 // 历史信息
      },
      {
        modelName: 'bottomLine',
        topNum: 0 // 总体评分模块的top值
      }//
    ],
    isTipsShow: false, // 控制TipsShow显示与否
    pdfUrl: '../staticV2/pdf/征信报告样例.pdf'
  },
  mutations: {
    SHOWLOGIN (state) {
      // 显示登录
      this.state.isLogin = true
      this.state.isMask = true
      this.state.isLoginBox = true
      // this.state.appOverflow = 'hidden'
    },
    HIDELOGIN (state) {
      // 隐藏登录
      this.state.isLogin = false
      this.state.isMask = false
      this.state.isLoginBox = false
      // this.state.appOverflow = 'auto'
    },
    SHOWPOINT (state, pointText) {
      // 显示提示框
      this.state.pointShow = true
      this.state.pointText = pointText
      // this.state.appOverflow = 'hidden'
    },
    HIDEOPTION (state) {
      // 隐藏提示框
      this.state.pointShow = false
      if (this.state.isLogin === true) {
        this.state.isLoginBox = true
      } else {
        this.state.isLoginBox = false
      }
      // this.state.appOverflow = 'auto'
    },
    GETUSERNAME (state, data) {
      // 获取登录用户名
      this.state.userName = data
    },
    ClEANUSERNAME (state, data) {
      // 清除登录用户名
      this.state.userName = null
    },
    CHANGESEARCHDATA (state, data) {
      // 星护甲查询三要素返回参数更新
      console.log(this.state)
      console.log(data)
      this.state.summaryInfoStore = data.summaryInfo
      this.state.baseInfoStore.baseInfo = data.baseInfo
      this.state.baseInfoStore.telecomInfo = data.telecomInfo
      // 公检法信息 --------公检法
      this.state.publicStore.publicSecurityInfoNew = data.publicSecurityInfo
      // 基本信息
      this.state.baseInfoStore.overdueInfo = data.overdueInfo
      // 多头借贷信息
      this.state.baseInfoStore.borrowingInfo = data.borrowingInfo
      // 风险名单信息
      this.state.baseInfoStore.riskListInfo = data.riskListInfo
      // 联系人圈子信息
      this.state.baseInfoStore.contactsInfo = data.contactsInfo
      // app注册信息
      this.state.baseInfoStore.appInfo = data.appInfo
      // 历史记录信息
      this.state.baseInfoStore.historyInfo = data.historyInfo
    },
    GETFLOORLISTTOP (state, data) {
      // 星护甲 右侧楼梯层滚动跟随 右侧楼梯层始终出现在窗口
      // console.log(data)
      this.state.appScrollTop = data
      if (data < 160 && this.state.isWarning === true) {
        this.state.floorListTop = '20px'
      } else if (data > 80 && this.state.isWarning === false) {
        this.state.floorListTop = (data - 80).toString() + 'px'
      } else if (data > 160 && this.state.isWarning === true) {
        this.state.floorListTop = (data - 140).toString() + 'px'
      }
    },
    CHANGEAPPSCROLLTOP (state, data) {
      // 修改App的scrollTop值
      this.state.appDom.scrollTop = data
    },
    CHANGESCROLLLEFT (state, data) {
      this.state.scrollLeft = data
    },
    CHANGEAPPWIDTH (state, data) {
      this.state.appWidth = data
    },
    SHOWQMXSUBTIPS (state) {
      this.state.QMXStore.isQmxSubTips = true
    },
    HIDEQMXSUBTIPS (state) {
      this.state.QMXStore.isQmxSubTips = false
    },
    CHANGEMESSAGELIST (state, data) {
      // 企明星消息通知列表 信息修改
      this.state.QMXStore.messageList = data.venusResponseBody
      this.state.QMXStore.pageSizeNumMsg =  data.pageSize
      this.state.QMXStore.totalResultMsg =  data.totalResult
    },
    CHANGEREADNUM (state, data) {
      // 企明星 未读消息数修改
      this.state.QMXStore.noReadNum = data
    },
    CHANGEORDERLIST (state, data) {
      // 企明星 订单信息修改
      this.state.QMXStore.orderList = data.result.venusResponseBody
      this.state.QMXStore.pageSizeNum =  data.result.pageSize
      this.state.QMXStore.totalResult =  data.result.totalResult
      console.log(this.state.QMXStore.pageSizeNum, this.state.QMXStore.totalResult);
    },
    CHANGEORDERCODER (state, data) {
      // 企明星 订单信息修改
      this.state.qmxOrderCode = data
    },
    CHANGEPDFURL (state, data) {
      // 企明星 pdf url路径
      this.state.pdfUrl = data
    },
    SHOWADDMON (state) {
      // 企业预警监测 添加监控企业 显示
      this.state.MonitorStore.isShowAddMon = true
    },
    CLOSEADDMON (state) {
      // 企业预警监测 添加监控企业 关闭
      this.state.MonitorStore.isShowAddMon = false
      this.state.MonitorStore.addMonCompanyList = []
    },
    SHOWDELMON (state) {
      // 企业预警监测 删除监控企业 显示
      this.state.MonitorStore.isShowDelMon = true
    },
    CLOSEDELMON (state) {
      // 企业预警监测 删除监控企业 显示
      this.state.MonitorStore.isShowDelMon = false
    },
    GETMONITORLIST (state, data) {
      // 企业预警监测 预警中心->获取Monitorlist和相关信息
      this.state.MonitorStore.monitorList = data.body
      this.state.MonitorStore.totalResultMon = data.total
    },
    GETATTENTIONLIST (state, data) {
      // 企业预警监测 关注企业->获取Monitorlist和相关信息
      this.state.MonitorStore.attentionList = data.body
      this.state.MonitorStore.totalResultAtt = data.total
      // this.state.MonitorStore.routerCompanyName = ''
    },
    GETMESSAGELIST (state, data) {
      // 企业预警监测 消息列表->获取 messageList和相关信息
      this.state.MonitorStore.monMsgList = data.body
      this.state.MonitorStore.totalResultMsg = data.total
      this.state.MonitorStore.noReadCount = data.noReadCount
    },
    GETSEARCHCOMPANY (state, data) {
      // 企业预警监测 关注企业-> 新增 -> 搜索企业 addMonCompanyList 和相关信息
      this.state.MonitorStore.addMonCompanyList = data.body
    },
    CHANGECOMPANYINFO (state, data) {
      // 企业预警监测 关注企业-> 添加监控 显示的企业信息
      let info = this.state.MonitorStore.companyInfo
      for (var key in info) {
        info[key] = data[key]
      }
    },
    ROUTERCOMPANYNAME (state, data) {
      // 企业预警监测 从我的消息列表跳转 — >关注企业页面 将companyName 带到关注企业页面
      this.state.MonitorStore.routerCompanyName = data
    }
  },
  actions: {
    showPoint ({commit}, pointText) {
      commit('SHOWPOINT', pointText)
      setTimeout(function () {
        // 定时器
        commit('HIDEOPTION')
      }, 1800)
    },
    hidePoint ({commit}) {
      commit('HIDEOPTION')
    },
    changeSearchData ({commit}, data) {
      commit('CHANGESEARCHDATA', data)
    },
    changeAppScrollTop ({commit}, data) {
      let step = data / 50
      // console.log(step)
      let vm = this;
      // commit('CHANGEAPPSCROLLTOP', data)
      (function smoothDown () {
        // console.log(vm.state.appScrollTop)
        // console.log(data)
        // start
        if (vm.state.appScrollTop < data) {
          vm.state.appDom.scrollTop += step
          // 设定每一次跳动的时间间隔为10ms
          setTimeout(smoothDown, 5)
        } else {
          // 限制滚动停止时的距离
          vm.state.appDom.scrollTop = data
        }
        // end
      })()
    },
    changeMessageList ({commit}, data) {
      // 企明星消息通知列表 信息修改
      commit('CHANGEMESSAGELIST', data)
    },
    changeOrderList ({commit}, data) {
      // 企明星订单信息更新
      commit('CHANGEORDERLIST', data)
    },
    getMonitorList ({commit}, data) {
      // 企业预警监测 预警中心->获取Monitorlist和相关信息
      commit('GETMONITORLIST', data)
    },
    getAttentionList ({commit}, data) {
      // 企业预警监测 关注企业->获取AttentionList和相关信息
      commit('GETATTENTIONLIST', data)
    },
    getMessageList ({commit}, data) {
      // 企业预警监测 消息列表->获取AttentionList和相关信息
      commit('GETMESSAGELIST', data)
    },
    getSearchCompany ({commit}, data) {
      // 企业预警监测 关注企业-> 新增 -> 搜索企业 addMonCompanyList 和相关信息
      commit('GETSEARCHCOMPANY', data)
    },
    changeCompanyInfo ({commit}, data) {
      // 企业预警监测 关注企业-> 添加监控 显示的企业信息
      commit('CHANGECOMPANYINFO', data)
    }
  },
  modules: {
    summaryInfoStore,
    baseInfoStore,
    publicStore,
    QMXStore,
    MonitorStore
  }
})
