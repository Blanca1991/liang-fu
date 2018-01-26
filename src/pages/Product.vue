<!-- 产品适用 wuxiaobo-->
<template>
  <div class="ProductWarp minWidthBox" >
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
          <span class="fontFFF downBtn font14" :class="{pointer: isDownLoad === true}" @click="downLoadFun">下载</span>
          <LoginNav class="fontFFF" />
        </div>
      </div>
      <div class="warninBox">
        <div class="warning font16" v-if="this.isWarning">注意！！！此处为示例数据，查询可获取相关数据</div>
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

export default {
  name: 'Product',
  data () {
    return {
      bgHides: true, // 星护甲logo 显示和隐藏
      searchName: '王立国',
      searchId: '642102197107030914',
      searchPhone: '15379509999',
      isLoading: false, // 加载动画 显示和隐藏
      isWarning: true, // 注意 实例显示和隐藏
      isDownLoad: false,
      userCodeId: '' // 用户订单 -- 搜索接口返回  下载pdf使用
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      isLogin: state => state.isLogin
    })
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('Product init')
    },
    searchFun () {
      let userNameReg = /^[\u4E00-\u9FA5]{2,4}$/  // 姓名限制为二到四位的中文字符
      let userMobileReg = /^1(3|4|5|7|8)[0-9]\d{8}$/  // 手机号为1开头的11位数字
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
      this.$store.dispatch('showPoint', data)
    },
    fetchSearch: async function () {
      this.isLoading = true
      // 接口请求 ———— 搜索接口
      let params = {
        body: {
          personName: this.searchName,
          idNumber: this.searchId,
          mobileNo: this.searchPhone,
          token: localStorage.getItem('token')
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
      console.log(params)
      const res = await http.post(api.antifraud, JSON.stringify(params))
      if (res.status === 200) {
        console.log(res.data)
        if (res.data.body.success && res.data.body.success !== 'false') {
          console.log(res.data.body)
          let data = res.data.body.result
          this.$store.dispatch('changeSearchData', data)
          this.isLoading = false
          this.isWarning = false
          this.userCodeId = res.data.header.ordeCode
          this.isDownLoad = true
        } else if (res.data.body.success === 'false') {
          this.isLoading = false
          this.pointOutFun(res.data.body.errorMsg)
        } else {
          this.isLoading = false
          this.pointOutFun('系统异常，请稍后再试')
        }
      } else {
        this.pointOutFun(res.msg)
        this.isLoading = false
      }
    },
    downLoadFun () {
      console.log('downLoadFun')
      if (this.isDownLoad === false) {
        return
      }
      let commonApiUrl = 'http://10.166.10.111:20010/' // sit 登录 搜索 下载 接口使用
      let url = commonApiUrl + '/credit-service/downloadpdf/' + this.userCodeId
      console.log(url)
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
      document.body.append(form) // 将表单放置在web中
      form.append(input1) // 将查询参数控件提交到表单上
      form.submit()
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
