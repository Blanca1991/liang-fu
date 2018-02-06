<!-- 首页 wuxiaobo-->
<template>
  <div  class="HomeWarp minWidthBox">
    <!-- <div class="comHeaderBox" :style="{left: - scrollLeft + 'px'}">
      <ComHeader :isActiveComp="isActives" />
    </div> -->
    <div class="scrollWarp" id="scrollWarp" :style="{height: '100vh'}">
      <div class="" id="scroll">
        <div class="section section1">
          <div class="homeBigBgWarp minWidthBox homeItem" id="BigBg">
            <div class="bigBg">
              <div class="imgBox">
                <img :src="imgUrl" alt="">
              </div>
              <div class="textBox">
                <div class="font30">
                  <strong>信仰是力量，信用是财富！</strong>
                </div>
                <div class="font28">Faith is power, credit is wealth! </div>
              </div>
              <div class="circleBox">
                <div class="circle">
                  <em class="leftEm"></em>
                  <em class="rightEm"></em>
                </div>
              </div>
            </div>
          </div>
      	</div>
        <div class="section section2">
      	</div>
        <div class="section section3">
      	</div>
        <!-- <BigBg />
        <OurServices />
        <AboutUs />
        <OurNews />
        <OurAddress /> -->
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
import $ from 'jquery' // 为了兼容IE 引入jq 崩溃啊对IE  不想玩了
import section from '../images/home/section.jpg'
import '@/fullpage/jquery.fullPage.js'
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
      screenHeight: document.documentElement.offsetHeight,
      imgUrl: section
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
    this.fullpageFun()
  },
  methods: {
    fullpageFun () {
      let scrollWarp = $('#scroll')
      scrollWarp.fullpage({
        sectionsColor: ['', '#4e9dd8', '#97d20c', '#f55557', '#b15aa9'],
        css3: true,
        scrollingSpeed: 1000
      })
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
@import '../css/homeComp'
</style>
