<!-- productQMX 引用组件 消息通知和我的订单 wuxiaobo-->
<template>
  <div class="minWidthBox">
    <div class="header flex">
      <div class="flex">
        <LogoBg :bgHide="bgHides" class="logoBg"/>
        <span class="font28">企明星</span>
      </div>
      <div class="loginNavBox flex">
        <div class="msgBox">
          <div class="font16 pointer positionR" @click="isMsgShowFun" :class="{colorBlue: isMsgShow === true }">
            <span>消息通知</span>
            <span class="msgNumBox" v-if="msgNum && msgNum > 0">
              <span class="msgNum">
                {{ msgNum }}
              </span>
            </span>
          </div>
          <div class="msgPointBox font14 textL" :class="{ismsgPointBox : isMsgShow === true}" v-if="isMsgShow">
            <div class="pL20 fontColor msgTip">
              <span>您有{{ msgNum }}条未读消息</span>
              <i class="triangle"></i>
            </div>
            <div class="pL20 msgItem flex" v-for="item in itemList">
              <div class="">
                <img :src="icon01" alt="itemImg" class="itemImg" v-if="item.isRead">
                <img :src="icon02" alt="itemImg" class="itemImg" v-if="!item.isRead">
              </div>
              <div class="pL10">
                <div class="height28">
                  {{ item.time }}
                </div>
                <div class="height28">
                  {{ item.message }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <span class="blank"></span>
        <div class="font16 pointer" @click="goAMXOrder" :class="{colorBlue: isBule === true}">我的订单</div>
        <LoginNav />
      </div>
    </div>
  </div>
</template>

<script>
import icon01 from '@/images/QMX/icon01.png'
import icon02 from '@/images/QMX/icon02.png'
import LogoBg from '@/components/LogoBg'
import LoginNav from '@/components/LoginNav'

export default {
  name: 'homeBigBg',
  data () {
    return {
      msgNum: 2, //未读消息
      bgHides: false, // 星护甲logo 显示和隐藏
      icon01: icon01,
      icon02: icon02,
      isBule: false,
      isMsgShow: false, // 控制消息列表的显示
      itemList: [
        {
          time: '2018-01-20',
          message: '消息1111111111',
          isRead: true
        },
        {
          time: '2018-01-20',
          message: '消息2222222222',
          isRead: false
        },
        {
          time: '2018-01-20',
          message: '消息3333333333',
          isRead: false
        },
        {
          time: '2018-01-20',
          message: '消息4444444444',
          isRead: false
        }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      // console.log('init')
      if (window.location.hash === '#/ProductQMXOrder.html') {
        this.isBule = true
      }
    },
    isMsgShowFun () {
      if (localStorage.getItem('userName')) {
        this.isMsgShow = !this.isMsgShow
      } else {
        this.$store.dispatch('showPoint', '请先登录')
      }
    },
    goAMXOrder () {
      // 跳转到我的订单页面
      if (window.location.hash != '#/ProductQMXOrder.html') {
        if (localStorage.getItem('userName')) {
          window.open(window.location.href.split('#')[0] + '#/' + 'ProductQMXOrder.html')
        } else {
          this.$store.dispatch('showPoint', '请先登录')
        }
      } else {
        window.location.hash = '#/ProductQMXOrder.html'
      }
    }
  },
  components: {
    LogoBg,
    LoginNav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.positionR{position: relative;}
.msgNumBox{background: #C30000;color: #fff;font-size: 12px;width: 16px;height: 16px;position: absolute;top: 12px;right: -8px;
  display: inline-block;border-radius: 50%;}
.msgNum{position: absolute;top: -20px;right: 4px;transform: scale(0.8);}
.header{background: #f0f0f0; justify-content: space-around;height: 56px;line-height: 56px;box-shadow: 0px 0px 5px #ccc;}
.blank{padding-left: 10px}
.msgBox{position: relative;}
.colorBlue{color: #3b77e3}
.msgItem{border-bottom: 1px solid #eee;border-right: 1px solid #eee;border-left: 1px solid #eee;}
.msgItem:hover{background: #e3edfe}
.msgTip{height: 40px;line-height: 40px;background: #f0f0f0}
.itemImg{transform: translateY(10px); width: 30px;height: auto;}
.msgPointBox{ left: -80px;width: 390px;background: #fff;position: absolute;z-index: 9999; top: 66px;
  transform: rotateX(90deg) ; transform-origin: 0 0;transition: transform 0.5s;}
.ismsgPointBox{ left: -80px;width: 390px;background: #fff;position: absolute;z-index: 9999; top: 66px;
  transform: rotateX(0deg) ; transform-origin: 0 0; transition: transform 0.5s;}
.triangle{display: inline-block;width: 10px;height: 10px;background: #f0f0f0;
  position: absolute; top: -4px; left: 110px; transform: rotate(45deg);}
.height28{height: 28px;line-height: 32px}
</style>
