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
      <Login v-show="isLogin"/>
      <PointOut v-show="pointShow" />
    </div>
    <FloorItem />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'
import PointOut from '@/components/PointOut'
import FloorItem from '@/homeComp/FloorItem'
import BigBg from '@/homeComp/BigBg'
import OurServices from '@/homeComp/OurServices'
import AboutUs from '@/homeComp/AboutUs'
import OurNews from '@/homeComp/OurNews'
import OurAddress from '@/homeComp/OurAddress'

export default {
  name: 'Home',
  data () {
    return {
      isActives: 'Home', // ComHeader内对应的tag高亮
      clientHeight: 0 // 屏幕的高度
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      isLogin: state => state.isLogin,
      homeItemListTop: state => state.homeItemListTop
    })
  },
  mounted () {
    // 钩子函数
    this.scroolFun()
    this.clientHeight = document.documentElement.clientHeight
  },
  methods: {
    scroolFun () {
      console.log(this.homeItemListTop)
      // console.log(this.$store.state.appDom)
    }
  },
  components: {
    ComHeader,
    Login,
    PointOut,
    BigBg,
    OurServices,
    AboutUs,
    OurNews,
    OurAddress,
    FloorItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.HomeWarp{ width: 100%;position: relative;}
.comHeaderBox{position: fixed; z-index: 1;width: 100%;top: 0}
.scoll{position: relative; height: auto;width: 100%;}
.scoll::-webkit-scrollbar {display: none;}
.loginBox{position: fixed;top: 0; width: 100%;}
</style>
