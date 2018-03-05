<!-- 首页 wuxiaobo-->
<template>
  <div  class="HomeWarp minWidthBox">
    <div class="comHeaderBox" :style="{left: - scrollLeft + 'px'}">
      <ComHeader :isActiveComp="isActives" />
    </div>
    <div class="scrollWarp">
      <div class="" id="scroll">
        <BigBg />
        <OurServices />
        <AboutUs />
        <OurNews />
        <OurAddress />
      </div>
    </div>
    <div class="loginBox" v-show="isLoginBox">
      <Login v-show="isLogin"/>
      <PointOut v-show="pointShow" />
    </div>
    <FloorItem />
  </div>
</template>

<script>
// import $ from 'jquery' // 为了兼容IE 引入jq 崩溃啊对IE  不想玩了
// import fullpage from '@/fullpage/jquery.fullPage.js'
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
      screenHeight: document.documentElement.offsetHeight
    }
  },
  watch: {},
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      isLogin: state => state.isLogin,
      homeItemListTop: state => state.homeItemListTop,
      isLoginBox: state => state.isLoginBox,
      scrollLeft: state => state.scrollLeft
    })
  },
  mounted () {
    // 钩子函数
    console.log(this.screenHeight)
    console.log(this.homeItemListTop)
    // this.getChangeHeight()
  },
  methods: {
    getChangeHeight () {
      let vm = this
      setInterval(function () {
        if (window.location.hash.indexOf('Home') >= 0) {
          vm.screenHeight = document.documentElement.offsetHeight
          // console.log(vm.screenHeight)
          for (let i = 0; i < vm.homeItemListTop.length; i++) {
            vm.homeItemListTop[i].topNum = document.getElementById(vm.homeItemListTop[i].modelName).offsetTop
          }
        }
      }, 400)
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
.comHeaderBox{position: fixed;top: 0; width: 100%;z-index: 11;}
.scrollWarp{width: 100%;}
.scroll{position: relative; height: auto;width: 100%;}
.scrollWarp::-webkit-scrollbar {display: none;}
.loginBox{position: fixed;top: 0; width: 100%;height: 100vh;z-index: 22}
</style>
