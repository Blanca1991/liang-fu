<!-- 首页 wuxiaobo-->
<template>
  <div  class="HomeWarp minWidthBox">
    <div class="comHeaderBox">
      <ComHeader :isActiveComp="isActives" />
    </div>
    <div class="scoll">
      <BigBg />
      <OurServices />
      <AboutUs />
      <OurNews />
      <OurAddress />
    </div>
    <div class="loginBox">
      <login v-show="isLogin"/>
      <PointOut v-show="pointShow" />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'
import PointOut from '@/components/PointOut'
import BigBg from '@/homeComp/BigBg'
import OurServices from '@/homeComp/OurServices'
import AboutUs from '@/homeComp/AboutUs'
import OurNews from '@/homeComp/OurNews'
import OurAddress from '@/homeComp/OurAddress'

export default {
  name: 'Home',
  data () {
    return {
      isActives: 'Home' // ComHeader内对应的tag高亮
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
  },
  methods: {},
  components: {
    ComHeader,
    Login,
    PointOut,
    BigBg,
    OurServices,
    AboutUs,
    OurNews,
    OurAddress
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.HomeWarp{ width: 100%;position: relative;}
.comHeaderBox{position: absolute; z-index: 1;width: 100%}
.scoll{position: relative; height: auto;width: 100%;height: 100vh;overflow: auto;}
.scoll::-webkit-scrollbar {display: none;}
.loginBox{position: fixed;top: 0; width: 100%;}
</style>
