<!-- 产品适用 wuxiaobo-->
<template>
  <div  class="ProductWarp">
    <div class="headerBox">
      <div class="header">
        <LogoBg :bgHide="bgHides" class="logoBg"/>
        <input type="text" class="uesrName" placeholder="请输入姓名" v-model="searchName" />
        <input type="text" class="userId" placeholder="请输入身份证号"
        maxlength="18" v-model="searchId">
        <input type="text" class="userPhone" placeholder="请输入手机号"
        maxlength="11" v-model="searchPhone">
        <span class="fontFFF searchBtn pointer font14" @click="searchFun">搜索</span>
        <span class="fontFFF downBtn font14">下载</span>
        <LoginNav class="fontFFF" />
      </div>
    </div>
    <div class="antiFraud">
      <div class="warning font16">注意！！！此处为示例数据，查询可获取相关数据</div>
      <SummaryInfo />
      <BaseInfo />
    </div>
    <Login v-show="isLogin"/>
    <MaskBox v-show="false"/>
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
import MaskBox from '@/components/MaskBox'
import LogoBg from '@/components/LogoBg'
import LoginNav from '@/components/LoginNav'
import Login from '@/components/Login'
import SummaryInfo from '@/productComp/SummaryInfo'
import BaseInfo from '@/productComp/BaseInfo'

export default {
  name: 'Product',
  data () {
    return {
      bgHides: true,
      searchName: '',
      searchId: '',
      searchPhone: '',
      isLoading: false
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
      if (this.searchName === '') {

      }
    },
    fetchSearch: async function () {
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
          userName: localStorage.getItem('username'),
          source: 'web',
          reqDateTime: service.getNowFormatDate(Date()),
          reqDate: '',
          merchantId: localStorage.getItem('username')
        }
      }
      const res = await http.post(api.login, params)
      // console.log(res)
      if (res.data.success && res.data.success === 'true') {
        console.log('loginSuccess')
      } else {}
    }
  },
  components: {
    LogoBg,
    LoginNav,
    Login,
    PointOut,
    MaskBox,
    Loading,
    SummaryInfo,
    BaseInfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/product'
</style>
