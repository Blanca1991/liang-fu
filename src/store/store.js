import Vue from 'vue'
import Vuex from 'vuex'
import summaryInfoStore from '../productComp/summaryInfoStore'
import baseInfoStore from '../productComp/baseInfoStore'
import publicStore from '../productComp/publicStore'
import QMXStore from '../QmxComp/QMXStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appOverflow: 'auto',
    isLogin: false, // 登录窗口显示与否 true显示 false 隐藏
    isMask: false, // 灰色遮罩层 true显示 false 隐藏
    isLoginNav: true, // NAV 中的登录点击按钮显示与否
    userName: '',
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
    modelListTop: [
      {
        modelName: 'summaryInfo',
        topNum: 0 // 总体评分模块的top值
      },
      {
        modelName: 'baseInfo',
        topNum: 0 // 总体评分模块的top值
      },
      {
        modelName: 'telecomInfo',
        topNum: 0 // 总体评分模块的top值
      },
      {
        modelName: 'publicSecurityInfo',
        topNum: 0 // 总体评分模块的top值
      },
      {
        modelName: 'overdueInfo',
        topNum: 0 // 总体评分模块的top值
      },
      {
        modelName: 'borrowingInfo',
        topNum: 0 // 总体评分模块的top值
      },
      {
        modelName: 'contactsInfo',
        topNum: 0 // 总体评分模块的top值
      },
      {
        modelName: 'appInfo',
        topNum: 0 // 总体评分模块的top值
      },
      {
        modelName: 'historyInfo',
        topNum: 0 // 总体评分模块的top值
      }// 历史信息模块 的top值
    ],
    isTipsShow: false, // 控制TipsShow显示与否
    homeItemListTop: [
      {
        modelName: 'BigBg',
        topNum: 0
      },
      {
        modelName: 'OurServices',
        topNum: 0
      },
      {
        modelName: 'AboutUs',
        topNum: 0
      },
      {
        modelName: 'OurNews',
        topNum: 0
      },
      {
        modelName: 'OurAddress',
        topNum: 0
      }
    ]
  },
  mutations: {
    SHOWLOGIN (state) {
      // 显示登录
      this.state.isLogin = true
      this.state.isMask = true
      this.state.isLoginBox = true
      this.state.appOverflow = 'hidden'
    },
    HIDELOGIN (state) {
      // 隐藏登录
      this.state.isLogin = false
      this.state.isMask = false
      this.state.isLoginBox = false
      this.state.appOverflow = 'auto'
    },
    SHOWPOINT (state, pointText) {
      // 显示提示框
      this.state.pointShow = true
      this.state.pointText = pointText
    },
    HIDEOPTION (state) {
      // 隐藏提示框
      this.state.pointShow = false
      if (this.state.isLogin === true) {
        this.state.isLoginBox = true
      } else {
        this.state.isLoginBox = false
      }
    },
    GETUSERNAME (state, data) {
      // 获取登录用户名
      this.state.userName = data
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

      this.state.baseInfoStore.contactsInfo = data.contactsInfo
      this.state.baseInfoStore.appInfo = data.appInfo
      this.state.baseInfoStore.historyInfo = data.historyInfo
    },
    GETFLOORLISTTOP (state, data) {
      // 楼梯层滚动跟随
      // console.log(data)
      this.state.appScrollTop = data
      if (data < 160 && this.state.isWarning === true) {
        this.state.floorListTop = '20px'
      } else if (data > 80 && this.state.isWarning === false) {
        this.state.floorListTop = (data - 80).toString() + 'px'
      } else if (data > 160 && this.state.isWarning === true) {
        this.state.floorListTop = (data - 140).toString() + 'px'
      }
      // console.log(this.state.appScrollTop)
      // console.log(this.state.floorListTop)
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
    }
  },
  modules: {
    summaryInfoStore,
    baseInfoStore,
    publicStore,
    QMXStore
  }
})
