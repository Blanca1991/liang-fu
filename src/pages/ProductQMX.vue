<!-- 产品适用 wuxiaobo-->
<template>
  <div class="ProductWarp minWidthBox" >
    <LogoBg :bgHide="bgHides" class="logoBg"/>
    <Login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
    <Loading v-show="isLoading"/>
  </div>
</template>

<script>
// import http from '@/utils/http'
// import api from '@/utils/api'
// import service from '@/service'
import {mapState} from 'vuex'
import LogoBg from '@/components/LogoBg'
import PointOut from '@/components/PointOut'
import Loading from '@/components/Loading'
import LoginNav from '@/components/LoginNav'
import Login from '@/components/Login'

export default {
  name: 'Product',
  data () {
    return {
      bgHides: false, // 星护甲logo 显示和隐藏
      isLoading: false, // 加载动画 显示和隐藏
      isDownLoad: false
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
      console.log('ProductQMX init')
    },
    pointOutFun (data) {
      // 事件调用 -- 调用提示层
      this.$store.dispatch('showPoint', data)
    }
  },
  components: {
    LogoBg,
    LoginNav,
    Login,
    PointOut,
    Loading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
