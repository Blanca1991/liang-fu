<!-- 产品适用 wuxiaobo-->
<template>
  <div class="ProductWarp minWidthBox" onselectstart="return false">
    <div class="ProductBox" id='ProductBox' >
      <div class="headerBox">
        <div class="header minWidthBox">
          <LogoBg :bgHide="bgHides" class="logoBg"/>
          <input type="text" class="uesrName" placeholder="请输入姓名" v-model="searchName" />
          <input type="text" class="userId" placeholder="请输入身份证号"
          maxlength="18" v-model="searchId">
          <input type="text" class="userPhone" placeholder="请输入手机号"
          maxlength="11" v-model="searchPhone">
          <span class="fontFFF searchBtn pointer font14" @click="searchFun">搜索</span>
          <span class="fontFFF downBtn font14 " :class="{notAllowed: isDownLoad === false,isDown: isDownLoad === true}" @click="downLoadFun">下载</span>
          <LoginNav class="fontFFF" />
        </div>
      </div>
      <div class="warninBox">
        <div class="warning font16" v-show="this.$store.state.isWarning" >注意！！！此处为示例数据，查询可获取相关数据</div>
      </div>
      <div class="antiFraud" id="antiFraud">
        <!-- 总体情况评估 -->
        <SummaryInfo />
        <!-- 基本身份信息 运营商信息 -->
        <BaseInfo />
        <!-- 公检法 逾期信息 -->
        <PublicSecurityInfo />
        <!-- 多头借贷信息 联系人圈子 疑似APP注册  -->
        <BorrowingInfo />
        <!-- 历史查询信息 -->
        <HistoryInfo />
        <!-- 锚点楼层 -->
        <FloorList />
        <div class="footDiv">
          <div class="footDivText">
            报告结束
          </div>
          <div class="footDivRule"></div>
        </div>
      </div>
    </div>
    <Login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
    <Loading v-show="isLoading"/>
  </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/utils/api'
import service from '@/service'
import {mapState} from 'vuex'
import PointOut from '@/components/PointOut'
import Loading from '@/components/Loading'
import LogoBg from '@/components/LogoBg'
import LoginNav from '@/components/LoginNav'
import Login from '@/components/Login'
import SummaryInfo from '@/productComp/SummaryInfo'
import BaseInfo from '@/productComp/BaseInfo'
import PublicSecurityInfo from '@/productComp/PublicSecurityInfo'
import BorrowingInfo from '@/productComp/BorrowingInfo'
import HistoryInfo from '@/productComp/HistoryInfo'
import FloorList from '@/productComp/FloorList'
import { baseUrl } from '@/utils/env.js'

export default {
  name: 'Product',
  data () {
    return {
      bgHides: true, // 星护甲logo 显示和隐藏
      searchName: '',
      searchId: '',
      searchPhone: '',
      // searchName: '王立国',
      // searchId: '642102197107030914',
      // searchPhone: '15379509999',
      isLoading: false, // 加载动画 显示和隐藏
      isDownLoad: false,
      userCodeId: '', // 用户订单 -- 搜索接口返回  下载pdf使用
      TimeoutFun: ''
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      isLogin: state => state.isLogin,
      modelListTop: state => state.modelListTop
    })
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      // console.log('Product init')
      // 没有LFZXtoken的时候  显示登录页面
      // if (!localStorage.getItem('userName') && !localStorage.getItem('LFZXtoken')) {
      //   this.$store.commit('SHOWLOGIN')
      // }
    },
    getAllModelTop () {
      for (let i = 0; i < this.modelListTop.length; i++) {
        this.modelListTop[i].topNum = document.getElementById(this.modelListTop[i].modelName).offsetTop
      }
    },
    searchFun () {
      let userNameReg = /^[\u4E00-\u9FA5]{2,4}$/  // 姓名限制为二到四位的中文字符
      let userMobileReg = /^1(3|4|5|6|7|8|9)[0-9]\d{8}$/  // 手机号为1开头的11位数字
      if (this.searchName === '') {
        this.pointOutFun('请输入姓名')
      } else if (!userNameReg.test(this.searchName)) {
        this.pointOutFun('请输入正确的姓名')
      } else if (this.searchId === '') {
        this.pointOutFun('请输入身份证号')
      } else if (!service.IdentityCodeValid(this.searchId)) {
        this.pointOutFun('请输入正确的身份证号')
      } else if (this.searchPhone === '') {
        this.pointOutFun('请输入电话号码')
      } else if (!userMobileReg.test(this.searchPhone)) {
        this.pointOutFun('请输入正确的电话号码')
      } else {
        this.fetchSearch()
      }
    },
    pointOutFun (data) {
      // 事件调用 -- 调用提示层
      this.$store.state.pointShowBtn = false
      this.$store.dispatch('showPoint', data)
    },
    setTimeFun () {
      console.log('setTimeFun')
      let times = parseFloat(localStorage.getItem('startTimes'))
      times = times * 1000
      // let times = 30 * 1000
      let vm = this
      this.TimeoutFun = setTimeout(function () {
        vm.checkTokenFun()
      }, times)
    },
    checkTokenFun: async function () {
      let params
      params = {
        userName: localStorage.getItem('userName')
      }
      const res = await http.post(api.checkToken, params)
      console.log('checkToken', res)
      if (res.data.errorCode === '200') {
        console.log('token未失效')
        this.setTimeFun()
      } else if (res.data.errorCode === '-222') {
        clearTimeout(this.setTimeFun)
        this.isLogin = true
      }
    },
    fetchSearch: async function () {
      this.isLoading = true
      // 接口请求 ———— 搜索接口
      let params = {
        body: {
          personName: this.searchName,
          idNumber: this.searchId,
          mobileNo: this.searchPhone,
          token: localStorage.getItem('LFZXtoken')
        },
        header: {
          reqFlag: '0',
          userName: localStorage.getItem('userName'),
          source: 'web',
          reqDateTime: service.getNowFormatDate(Date()),
          reqDate: '',
          merchantId: localStorage.getItem('userName')
        }
      }
      // console.log(params)
      const res = await http.post(api.antifraud, params)
      // console.log('fetchSearch', res)
      if (res.status === 200) {
        // console.log(res.data)
        if (res.data.body.success && res.data.body.success !== 'false') {
          // console.log(res.data.body)
          this.searchName = ''
          this.searchId = ''
          this.searchPhone = ''
          let data = res.data.body.result
          this.$store.dispatch('changeSearchData', data)
          this.isLoading = false
          this.$store.state.isWarning = false
          this.userCodeId = res.data.header.ordeCode
          this.isDownLoad = true
          if (res.data.header.startTimes == null) {
            localStorage.setItem('startTimes', '3600')
          } else {
            localStorage.setItem('startTimes', res.data.header.startTimes)
          }
          console.log(localStorage.getItem('startTimes'))
          this.setTimeFun()
        } else if (res.data.body.success === 'false') {
          this.isLoading = false
          let data
          // this.pointOutFun(res.data.body.errorMsg)
          switch (res.data.body.errorCode) {
            case '-204':
              data = ['用户未添加或已注销', '请联系客服人员']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = false
              break
            case '-205':
              data = ['账号已到期', '请联系客服人员']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = false
              break
            case '-206':
              data = ['对应机构已停用', '请联系客服人员']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = false
              break
            case '-207':
              data = ['产品已到期', '请联系客服人员']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = false
              break
            case '-208':
              data = ['用户没有对应的机构', '请联系客服人员']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = false
              break
            case '-209':
              data = ['未开通查询权限', '请联系客服人员']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = false
              break
            case '-210':
              data = ['用量已用完', '请联系客服人员']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = false
              break
            case '-211':
              data = ['已达到今日最大用量', '请联系客服人员']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = false
              break
            case '-213':
              data = ['产品没有用量', '请联系客服人员']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = false
              break
            case '-214':
              data = ['未找到对应产品', '请联系客服人员']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = false
              break
            case '-8985':
              data = ['手机号格式不合法', '手机号码为虚拟号码']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = false
              break
            case '-8984':
              data = ['手机号为虚拟号段', '无法查询']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = false
              break
            case '-215':
              data = ['登录状态已失效', '请重新登录']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = true
              break
            case '-222':
              data = ['登录状态已失效', '请重新登录']
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = true
              break
            default:
              data = [res.data.body.errorMsg]
              this.showPointBtnFun(data)
              this.$store.state.pointOutLoginBtn = false
          }
        } else {
          this.pointOutFun('系统异常，请稍后再试')
        }
      } else {
        this.pointOutFun(res.msg)
        this.isWarning = true
        this.isLoading = false
        this.isDownLoad = false
      }
    },
    showPointBtnFun (data) {
      this.$store.state.pointShowBtn = true
      this.$store.commit('SHOWPOINT', data)
    },
    downLoadFun () {
      // console.log('downLoadFun')
      if (this.isDownLoad === false) {
        return
      }
      // sit 的链接
      // let commonApiUrl = 'http://10.166.10.111:20010/' // sit 登录 搜索 下载 接口使用
      // let commonApiUrl = 'http://10.166.8.56:11080' // uat 登录 搜索 下载 接口使用
      let url = baseUrl + '/credit-service/pdfbyOrderPersonal/file/' + this.userCodeId + '&' + localStorage.getItem('userName')
      // console.log(url)
      this.downLoad(url)
    },
    downLoad (strUrl) {
      var form = document.createElement('form') // 定义一个form表单
      form.setAttribute('style', 'display:none') // 在form表单中添加查询参数
      form.setAttribute('target', '_blank')
      form.setAttribute('method', 'get')
      form.setAttribute('action', strUrl)
      var input1 = document.createElement('input')
      input1.setAttribute('type', 'hidden')
      document.body.appendChild(form) // 将表单放置在web中
      form.appendChild(input1) // 将查询参数控件提交到表单上
      form.submit()

      // var form = $("<form>")   //定义一个form表单
      // form.attr('style', 'display:none')  //在form表单中添加查询参数
      // form.attr('target', '')
      // form.attr('method', 'get')
      // form.attr('action', strUrl)
      // var input1 = $('<input>')
      // input1.attr('type', 'hidden')
      // $('body').append(form)  //将表单放置在web中
      // form.append(input1)   //将查询参数控件提交到表单上
      // form.submit()
    }
  },
  components: {
    LogoBg,
    LoginNav,
    Login,
    PointOut,
    Loading,
    SummaryInfo,
    BaseInfo,
    PublicSecurityInfo,
    BorrowingInfo,
    HistoryInfo,
    FloorList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/product'
</style>
