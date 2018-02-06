<!-- 公司招聘 wuxiaobo-->
<template>
  <div  class="JobsWarp minWidthBox">
    <div class="jobsBoxWarp">
      <div class="header minWidthBox">
        <ComHeader :isActiveComp="isActives"/>
      </div>
      <div class="jobsBox">
        <div class="jobsList flex font12" >
          <div class="jobItem flex" v-bind:style="{'left': Math.ceil((Math.random() * 800)) + 'px','top': Math.ceil((Math.random() * 400 + 110)) + 'px',
          'background': '#' + bgColor[Math.floor((Math.random() * bgColor.length))]}" v-for="(item, index) in this.jobsList"
          @mouseenter="itemEnter(index)" @mouseout="itemOut(index)" ref="itemHover" @click="showTipsBox(item)">
            {{ item.position }}
          </div>
        </div>
      </div>
      <div class="imgBox flex">
        <div class="pre1 image" :style="{backgroundImage: 'url(' + pre1 + ')'}">
        </div>
        <div class="pre2 image" :style="{backgroundImage: 'url(' + pre2 + ')'}">
        </div>
        <div class="pre3 image" :style="{backgroundImage: 'url(' + pre3 + ')'}">
        </div>
      </div>
    </div>
    <login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
    <TipsBox v-show="this.$store.state.isTipsShow" :tipsInfoComp="tipsInfo" :jobsTellShow="true"/>
  </div>
</template>

<script>
import pre1 from '../images/jobs/per1.png'
import pre2 from '../images/jobs/per2.png'
import pre3 from '../images/jobs/per3.png'
import {mapState} from 'vuex'
import http from '@/utils/http'
import api from '@/utils/api'
import service from '@/service'
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'
import PointOut from '@/components/PointOut'
import TipsBox from '@/components/TipsBox'

export default {
  name: 'Jobs',
  data () {
    return {
      pre1: pre1,
      pre2: pre2,
      pre3: pre3,
      isActives: 'Jobs',
      jobsList: '', // 获取到的工作列表
      tipsInfo: '', // 给子组件传递的参数
      bgColor: [
        '4c94cb',
        '92c529',
        'e75454',
        'f0ab30',
        'dc6139',
        '69bdbb',
        'f1bd68',
        'a6569e'
      ]
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      isLogin: state => state.isLogin,
      pointShow: state => state.pointShow
    })
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      // console.log('Jobs init')
      // console.log(this.$store.state)
      this.fetchJobs()
    },
    fetchJobs: async function () {
      // 接口请求 ———— 搜索接口
      let params = {
        time: service.getNowFormatDate(Date())
      }
      const res = await http.post(api.getRecruitInfo, params)
      console.log(res)
      if (res.status === 200) {
        if (res.data.type && res.data.type === 'success') {
          // console.log(res.data.data)
          this.jobsList = res.data.data
        } else if (res.data.type === 'false') {
          this.pointOutFun(res.data.message)
        } else {
          this.pointOutFun('系统异常，请稍后再试')
        }
      } else {
        this.pointOutFun(res.msg)
      }
    },
    pointOutFun (data) {
      // 事件调用 -- 调用提示层
      this.$store.dispatch('showPoint', data)
    },
    itemEnter (index) {
      // console.log(index, 'itemEnter')
      // console.log(this.$refs.itemHover[index].style.backgroundColor)
      let itemHover = this.$refs.itemHover[index]
      let bgColor = this.rgb2hex(itemHover.style.backgroundColor)
      itemHover.style.backgroundColor = '#fff'
      itemHover.style.color = bgColor
      itemHover.style.borderColor = bgColor
      itemHover.style.zIndex = 3
      // setTimeout(function () {
      //   // 定时器
      //   itemHover.style.backgroundColor = '#fff'
      //   itemHover.style.color = bgColor
      //   itemHover.style.borderColor = bgColor
      //   itemHover.style.zIndex = 3
      // }, 80)
    },
    itemOut (index) {
      // console.log(index, 'itemOut')
      let itemHover = this.$refs.itemHover[index]
      let color = this.rgb2hex(itemHover.style.color)
      itemHover.style.backgroundColor = color
      itemHover.style.color = '#fff'
      itemHover.style.borderColor = '#fff'
      itemHover.style.zIndex = 0
    },
    showTipsBox (item) {
      this.$store.state.isTipsShow = true
      this.tipsInfo = item
      // console.log(item)
    },
    rgb2hex (rgb) {
      if (rgb.charAt(0) === '#') {
        return rgb
      }
      var ds = rgb.split(/\D+/)
      var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3])
      return '#' + this.zero_fill_hex(decimal, 6)
    },
    zero_fill_hex (num, digits) {
      var s = num.toString(16)
      while (s.length < digits) {
        s = '0' + s
      }
      return s
    }
  },
  components: {
    ComHeader,
    Login,
    PointOut,
    TipsBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.JobsWarp{ width: 100%; height:100%; background: #eee}
.header{width: 100%;position: absolute;top: 0}
.JobsWarp .jobsBoxWarp{width: 100%; height:100%;position: relative;}
.JobsWarp .jobsBox{width: 100%;}
.JobsWarp .imgBox{width: 50%;height: 50%;position: absolute;bottom: 20px;right: 0;}
.image{width: 100%;height: 100%;}
.pre1{width: 20%;background-size: 60%; background-repeat:no-repeat; background-position:bottom;
  animation: pre1Move 1s ease-in; }
@keyframes pre1Move {
  0% {width: 0%;}
  50% {width: 25%;}
  100% {width: 20%;}
}
.pre2{width: 60%; background-size: 60%;background-repeat:no-repeat; background-position:bottom;
  animation: pre2Move 1s ease; }
@keyframes pre2Move {
  0% {width: 0%;}
  100% {width: 60%;}
}
.pre3{width: 20%; background-size: 60%;background-repeat:no-repeat; background-position:bottom;}
.jobsList{position: absolute;top: 0px; padding: 100px;z-index: 2;}
.jobItem{width: 120px;height: 120px;border-radius: 50%; border: 8px solid #fff;box-sizing: border-box;
  justify-content: center;align-items: center; position: absolute;color: #fff;}
</style>
