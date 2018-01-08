import Vue from 'vue'
import Vuex from 'vuex'
import summaryInfoStore from '../productComp/summaryInfoStore'
import baseInfoStore from '../productComp/baseInfoStore'

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
    pointShowBtn: false, // pointShow 弹框有无Btn按钮
    appScrollTop: 0, // id = app scroll 的高度
    floorListTop: '80px', // 楼梯层跟随
    appDom: '', // 获取app Dom元素
    summaryInfoTop: 0, // 总体评分模块的top值
    baseInfoTop: 0, // 基本信息模块的 top值
    telecomInfoTop: 0, // 运营商信息模块的 top值
    publicSecurityInfoTop: 0, // 公检法信息模块的 top值
    overdueInfoTop: 0, // 网贷逾期信息模块 top值
    borrowingInfoTop: 0, // 多猎头借贷模块的 top值
    contactsInfoTop: 0, // 联系人圈子模块 的top值
    appInfoTop: 0, // app注册模块 的top值
    historyInfoTop: 0 // 历史信息模块 的top值
  },
  mutations: {
    SHOWLOGIN (state) {
      // 显示登录
      this.state.isLogin = true
      this.state.isMask = true
      this.state.appOverflow = 'hidden'
    },
    HIDELOGIN (state) {
      // 隐藏登录
      this.state.isLogin = false
      this.state.isMask = false
      this.state.appOverflow = 'auto'
    },
    SHOWPOINT (state, pointText) {
      // 显示提示框
      this.state.pointShow = true
      this.state.pointText = pointText
      console.log(pointText)
    },
    HIDEOPTION (state) {
      // 隐藏提示框
      this.state.pointShow = false
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
      this.state.baseInfoStore.publicSecurityInfo = data.publicSecurityInfo
      this.state.baseInfoStore.overdueInfo = data.overdueInfo
      this.state.baseInfoStore.borrowingInfo = data.borrowingInfo
      this.state.baseInfoStore.contactsInfo = data.contactsInfo
      this.state.baseInfoStore.appInfo = data.appInfo
      this.state.baseInfoStore.historyInfo = data.historyInfo
    },
    GETFLOORLISTTOP (state, data) {
      // 楼梯层滚动跟随
      this.state.appScrollTop = data
      if (data < 160) {
        this.state.floorListTop = '80px'
      } else if (data > 160) {
        this.state.floorListTop = (data - 80).toString() + 'px'
      }
      // console.log(this.state.appScrollTop)
      // console.log(this.state.floorListTop)
    },
    CHANGEAPPSCROLLTOP (state, data) {
      // 修改App的scrollTop值
      this.state.appDom.scrollTop = data
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
      console.log(step)
      let vm = this;
      // commit('CHANGEAPPSCROLLTOP', data)
      (function smoothDown () {
        console.log(vm.state.appScrollTop)
        console.log(data)
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
    baseInfoStore
  }
})
