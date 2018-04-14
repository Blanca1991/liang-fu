<!-- productQMX 引用组件 消息通知和我的订单 wuxiaobo-->
<template>
  <div class="minWidthBox">
    <div class="header flex">
      <div class="flex">
        <!-- <LogoBg :bgHide="bgHides" class="logoBg"/>
        <span class="font28">企明星</span> -->
        <div class="logo" @click="goHome">
          <img class="img1 pointer" :src="liangfu" alt="liangfu_logo">
        </div>
        <div class="logo">
          <span class="logoLeft"></span>
          <img class="img2 pointer" :src="qimingxing" alt="qimingxing_logo" @click="goQMX">
        </div>
      </div>
      <div class="loginNavBox flex">
        <div class="msgBox">
          <div class="font16 pointer positionR" @click="isMsgShowFun" :class="{colorBlue: isMsgShow === true }">
            <span>消息通知</span>
            <span v-if="isUserName && !isNoMessage">
              <span class="msgNumBox" v-if="noReadNum && noReadNum > 0 ">
                <span class="msgNumDouble" v-if="noReadNum > 9">
                  {{ noReadNum }}
                </span>
                <span class="msgNum" v-if="noReadNum < 10">
                  {{ noReadNum }}
                </span>
              </span>
            </span>
          </div>
          <div class="msgPointBox font14 textL" :class="{ismsgPointBox : isMsgShow === true}" v-if="isMsgShow">
            <div class="pL20 fontColor msgTip" v-if="!isNoMessage">
              <span>您有{{ noReadNum }}条未读消息</span>
              <i class="triangle"></i>
            </div>
            <div class="msgList" v-if="!isNoMessage">
              <div class="pL20 msgItem flex" v-for="item in messageList" >
                <div class="">
                  <img :src="icon01" alt="itemImg" class="itemImg" v-if="item.status == '1' || item.status == '3'">
                  <img :src="icon02" alt="itemImg" class="itemImg" v-if="item.status =='2'">
                  <i class="msgIsRead" v-if="item.visited == '1'"></i>
                </div>
                <div class="pL10"  @click="isReadFun(item)">
                  <div class="height24 font12">
                    {{ item.commitTime }}
                  </div>
                  <div class="height24">
                    <!-- {{ item.message }} -->
                    <span v-if="item.status == '1' || item.status == '3'" >量富企业征信报告已经生成完毕，请点击查看</span>
                    <span v-if="item.status =='2'" >量富企业征信报告生成失败</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="" v-if="isNoMessage">
              <div class="font18 noMessage" >
              暂无消息
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
import liangfu from '@/images/liangfu_logoQ.png'
import qimingxing from '@/images/qimingxing_logoQ.png'
import icon01 from '@/images/QMX/icon01.png'
import icon02 from '@/images/QMX/icon02.png'
import LogoBg from '@/components/LogoBg'
import LoginNav from '@/components/LoginNav'
import {mapState} from 'vuex'
import http from '@/utils/http'
import api from '@/utils/api'
import service from '@/service'

export default {
  name: 'homeBigBg',
  data () {
    return {
      isUserName: localStorage.getItem('userName'),
      liangfu: liangfu,
      qimingxing: qimingxing,
      bgHides: false, // 星护甲logo 显示和隐藏
      icon01: icon01,
      icon02: icon02,
      isBule: false,
      isMsgShow: false, // 控制消息列表的显示
      orderCode: '', // 订单编号
      isNoMessage: false, // 暂时没有消息通知
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      messageList: state => state.QMXStore.messageList,
      noReadNum: state => state.QMXStore.noReadNum
    })
  },
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
      if (localStorage.getItem('userName')) {
        this.getMessageInfo()
      } else {
        return
      }
    },
    goHome () {
      // 跳转到量富首页
      this.$router.push({ name: 'Home.html' })
    },
    goQMX () {
      // 跳转到企明星首页
      this.$router.push({ name: 'ProductQMX' })
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
          // window.open(window.location.href.split('#')[0] + '#/' + 'ProductQMXOrder.html')
          this.$router.push({ name: 'ProductQMXOrder' })
        } else {
          this.$store.dispatch('showPoint', '请先登录')
        }
      } else {
        window.location.hash = '#/ProductQMXOrder.html'
      }
    },
    getMessageInfo () {
      this.fetchMessage()
    },
    fetchMessage: async function () {
      // 接口请求 ———— 获取企明星的消息list
      let params = {
        body: {
          pageNum: '1',
          orderCode: '',
          companyName: '',
          isMsgOrderFlag: 'message'
        },
        header: {
          reqFlag: '0',
          source: '',
          userName: localStorage.getItem('userName'),
          reqDateTime: service.getNowFormatDate(Date()),
          reqTransID: '0990000sss091111'
        }
      }
      console.log(params)
      const res = await http.post(api.getOrderList + '?time=' + Date.now(), params)
      if (res.status == 200) {
        console.log(res.data.body.success);
        if (res.data.body.success != 'false') {
          // 成功
          console.log("拉取数据")
          // 更新消息通知列表
          this.$store.dispatch('changeMessageList', res.data.body.result.venusResponseBody)
          // 添加未读消息数字的 方法
          this.$store.commit('CHANGEREADNUM', res.data.body.result.noReadNum)
        } else {
          console.log('暂时没有消息');
          this.isNoMessage = true;
          // this.$store.dispatch('showPoint', res.data.body.errorMsg)
        }
      } else {
        this.isLoading = false
        this.isNoMessage = true;
        console.log('网络异常请稍后再试');
        // this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    },
    isReadFun (item) {
      this.orderCode = item.orderCode
      if (item.visited == '1') {
        this.fetchMessageRead()
      }
    },
    timeFun () {
      setTimeout(this.getMessageInfo(), 3000)
    },
    fetchMessageRead: async function () {
      // 接口请求 ———— 获取企明星的消息list
      let params = {
        body: {
          orderCode: this.orderCode
        },
        header: {
          reqFlag: '0',
          source: '',
          userName: localStorage.getItem('userName'),
          reqDateTime: service.getNowFormatDate(Date()),
          reqTransID: '0990000sss091111'
        }
      }
      console.log(params)
      const res = await http.post(api.updateMessage + '?time=' + service.getNowDateTime(), params)
      console.log(res)
      if (res.status == 200) {
        console.log('已读le')
        console.log(res.data);
        if (res.data == true) {
          this.timeFun()
        }
      } else {

        // this.$store.dispatch('showPoint', '网络异常请稍后再试')
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
.logo{display: flex;align-items:center;margin-left: 20px;}
.logo .img1{ width: 180px;}
.logo .img2{ width: 110px;}
.logoLeft{display: inline-block;height: 30px;width: 2px;background: #555;margin-right:20px;}
.msgNumBox{background: #C30000;color: #fff;font-size: 12px;width: 16px;height: 16px;
  position: absolute;top: 12px;right: -8px;display: inline-block;border-radius: 50%;}
.msgNum{position: absolute;top: -20px;right: 4px;transform: scale(0.8);}
.msgNumDouble{position: absolute;top: -20px;right: 1px;transform: scale(0.8);}
.header{background: #fff; justify-content: space-between;height: 56px;line-height: 56px;
  box-shadow: 0px 0px 5px #ccc;}
.blank{padding-left: 10px}
.msgBox{position: relative;}
.colorBlue{color: #3b77e3}
.msgList{height: 268px;overflow: auto;}
.msgItem{border-bottom: 1px solid #eee;border-right: 1px solid #eee;border-left: 1px solid #eee;
  position: relative;}
.msgItem:hover{background: #e3edfe}
.msgTip{height: 40px;line-height: 40px;background: #f0f0f0;position: absolute;
    top: 0;width: 100%;}
.itemImg{transform: translateY(10px); width: 30px;height: auto;}
.msgPointBox{ left: -80px;width: 390px;background: #fff;position: absolute;z-index: 9999; top: 66px;
  transform: rotateX(90deg) ; transform-origin: 0 0;transition: transform 0.5s;}
.ismsgPointBox{ padding-top: 40px;left: -80px;width: 390px;background: #fff;position: absolute;
  z-index: 9999; top: 66px;transform: rotateX(0deg) ; transform-origin: 0 0; transition: transform 0.5s;}
.triangle{display: inline-block;width: 10px;height: 10px;background: #f0f0f0;
  position: absolute; top: -4px; left: 110px; transform: rotate(45deg);}
.height24{height: 24px;line-height: 32px}
.msgIsRead{display: inline-block;width: 8px;height: 8px;background: #C30000;border-radius: 50%;
  position: absolute;top: 10px;left: 45px;}
.noMessage{text-align: center;color: #ccc;line-height: 200px;}
</style>
