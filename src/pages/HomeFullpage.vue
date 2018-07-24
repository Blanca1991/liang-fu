<!-- 首页 wuxiaobo-->
<template>
  <div class="HomeWarp minWidthBox" >
    <div class="" class="app">
      <page :currentPage="currentPage" >
        <BigBg />
      </page>
      <div class="" v-show="isShow">
        <page :currentPage="currentPage" >
          <OurServices />
        </page>
        <page :currentPage="currentPage">
          <AboutUs />
        </page>
        <page :currentPage="currentPage">
          <OurNews />
        </page>
        <page :currentPage="currentPage">
          <OurAddress />
        </page>
      </div>
      <page-controller :pageNum="pageNum" :currentPage="currentPage" @changePage="changePage" :option="controllerOption"></page-controller>
    </div>
    <div class="comHeaderBox flex" >
      <div class="LogoBg">
        <LogoBg />
      </div>
      <div class="comHeader">
        <ComHeader :isActiveComp="isActives" :isLogoShow="isLogoShow"/>
      </div>
    </div>
    <div class="loginBox" v-show="isLoginBox">
      <Login v-show="isLogin"/>
      <PointOut v-show="pointShow" />
    </div>
  </div>
</template>

<script>

import {mapState} from 'vuex'
import ComHeader from '@/components/ComHeader'
import LogoBg from '../components/LogoBg'
import LoginNav from '../components/LoginNav'

import Login from '@/components/Login'
import PointOut from '@/components/PointOut'

import Page from '@/homeComp/Page.vue'
import PageController from '@/homeComp/PageController.vue'

import BigBg from '@/homeComp/BigBg'
import OurServices from '@/homeComp/OurServices'
import AboutUs from '@/homeComp/AboutUs'
import OurNews from '@/homeComp/OurNews'
import OurAddress from '@/homeComp/OurAddress'
//
// function afterEnterAnimate($child) {
//   $child.$el.querySelector('.animate').classList.remove('move-left', 'move-right')
// }
// function beforeLeaveAnimate($child) {
//   let moveType = Math.random() > 0.5 ? 'move-left' : 'move-right'
//   $child.$el.querySelector('.animate').classList.add(moveType)
// }

export default {
  name: 'HomeFullpage',
  data() {
    return {
      isShow: false,
      screenWidth: document.documentElement.offsetWidth,
      isLogoShow: false, // 当页面宽度不够 隐藏掉logo
      isActives: 'Home.html', // ComHeader内对应的tag高亮
      currentPage: 1,
      options: [{
        // the color of background
        background: '',
        // the color of text
        color: '',
        // is content center
        isCenter: true,
        // the function before page show
        // afterEnter: afterEnterAnimate,
        // // the function after page show
        // beforeLeave: beforeLeaveAnimate
      }, {
        background: '',
        color: '',
        isCenter: true,
        // afterEnter: afterEnterAnimate,
        // beforeLeave: beforeLeaveAnimate
      }, {
        background: '',
        color: '',
        isCenter: true,
        // afterEnter: afterEnterAnimate,
        // beforeLeave: beforeLeaveAnimate
      }, {
        background: '',
        color: '',
        isCenter: true,
        // afterEnter: afterEnterAnimate,
        // beforeLeave: beforeLeaveAnimate
      },{
        background: '',
        color: '',
        isCenter: true,
        // afterEnter: afterEnterAnimate,
        // beforeLeave: beforeLeaveAnimate
      }],
      controllerOption: {
        arrowsType: false,
        navbar: true,
        highlight: true,
        loop: false
      }
    }
  },
  computed: {
    // 总page数

    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      isLogin: state => state.isLogin,
      isLoginBox: state => state.isLoginBox,
      scrollLeft: state => state.scrollLeft,
      appWidth: state => state.appWidth
    }),
    pageNum() {
      return this.options.length
    }
  },
  mounted() {
    this.$children.forEach((child, index) => {
      // 动态设置各个page内的options
      if (child.option === null) {
        let childOption = this.options[index]
        this.$set(childOption, 'index', index + 1)
        child.option = childOption
      }
    })
    this.init ()
    // console.log('this.appWidth', this.appWidth)
  },
  methods: {
    init () {
      // if (this.screenWidth <= 1050) {
      //   this.isLogoShow = false
      // } else {
      //   this.isLogoShow = true
      // }
    },
    changePage(index) {
      // beforeLeave Hook
      let beforeIndex = this.currentPage - 1;
      let leaveFunction = this.options[beforeIndex].beforeLeave;
      typeof leaveFunction === 'function' && leaveFunction.call(this, this.$children[beforeIndex]);
      // change page
      this.currentPage = index;
      // afterEnter Hook
      let nextIndex = index - 1;
      let enterFunction = this.options[nextIndex].afterEnter;
      this.$nextTick(function() {
        typeof enterFunction === 'function' && enterFunction.call(this, this.$children[nextIndex]);
      })
    }
  },
  updated () {
    this.isShow = true
  },
  components: {
    Page,
    PageController,
    BigBg,
    OurServices,
    AboutUs,
    OurNews,
    OurAddress,
    ComHeader,
    Login,
    PointOut,
    LogoBg
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}
.comHeaderBox {position: absolute;z-index: 99999;width: 100vw;
   top: 0;background: #2a2d2c;align-items: center;}
 @media screen and (max-width: 1050px) {
     .LogoBg {
         display: none;
     }
 }
.comHeader{width: 100%;}
.app { height: 100vh; width: 100vw; }
/* 下面的是与fullPage无关的样式 */
.animate { transition: all 1s ease-out 0s; }
.move-left {transform: translateX(-1000%);}
.move-right {transform: translateX(1000%);}
@media screen and (max-width:768px) {
  html,
  body {
    font-size: 12px;
  }
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: underline;
}

.person-img {
  width: 223px;
  height: 185px;
  float: left;
  background-color: #fff;
  box-shadow: 3px 3px 10px #999;
}

.person-img img {
  height: 100%;
  width: 100%;
}

.person-basic-info {
  overflow: hidden;
  float: right;
  margin-left: 40px;
}

.info-line {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.text-center {
  text-align: center;
}

.text-bold {
  font-weight: bold;
}

.demo-intro {
  text-indent: 2em;
}

dt {
  font-weight: bold;
  font-size: 16px;
}

ul {
  padding-left: 1em;
}

.avatar {
  margin: 10px auto;
  display: block;
  box-shadow: 1px 1px 5px #666;
}

.author-info {
  text-align: center;
}
</style>
