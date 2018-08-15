<!-- 引用组件 企业征信报告引用头部 wuxiaobo-->
<template>
  <div class="minWidthBox">
    <div class="header flex">
      <NavEntrance />
      <div class="loginNavBox flex">
        <div class="msgBox">
          <div class="font16 pointer positionR" @click="isMsgShowFun" :class="{colorBlue: isMsgShow === true }">
            <span>消息通知</span>
            <span v-if="userName && !isNoMessage">
              <span class="msgNumBox fontBold" v-if="noReadNum && noReadNum > 0 ">
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
            <div class="pL20 fontColor msgTip" v-if="!isNoMessage && messageList">
              <span>您有{{ noReadNum }}条未读消息</span>
              <i class="triangle"></i>
            </div>
            <div class="msgList" v-if="!isNoMessage && messageList">
              <div class="msgListIn">
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
                    <div class="height24 overText">
                      <!-- {{ item.message }} -->
                      <span v-if="item.status == '1' || item.status == '3'" >{{ item.companyName }}征信报告已经生成完毕，请点击查看</span>
                      <span v-if="item.status =='2'" >{{ item.companyName }}征信报告生成失败</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pageBoxWarp" >
                <div class="pageBox">
                  <el-pagination
                    background
                    :page-size="pageSizeNumMsg"
                    layout="total, prev, pager, next"
                    :total="totalResultMsg"
                    @current-change="handleCurrentChange">
                  </el-pagination>
                </div>
              </div>
            </div>
            <div class="" v-if="isNoMessage || !messageList">
              <div class="font18 noMessage" >
              暂无消息
              </div>
            </div>
          </div>
        </div>
        <span class="blank"></span>
        <div class="font16 pointer pl10" @click="goAMXOrder" :class="{colorBlue: isBule === true}">我的订单</div>
        <LoginNav />
        <div class="closeMsg" @click="closeMsg" v-if="isMsgShow"></div>
      </div>
    </div>
  </div>
</template>

<script>
import liangfu from '@/images/liangfu_logoQ.png'
import qimingxing from '@/images/qimingxing_logoQ.png'
import NavEntrance from '@/ProductComp/NavEntrance'
import icon01 from '@/images/QMX/icon01.png'
import icon02 from '@/images/QMX/icon02.png'
import LogoBg from '@/components/LogoBg'
import LoginNav from '@/components/LoginNav'
import {mapState} from 'vuex'
import http from '@/utils/http'
import api from '@/utils/api'
import service from '@/service'

export default {
  name: 'QmxHaderNav',
  data () {
    return {
      liangfu: liangfu,
      qimingxing: qimingxing,
      bgHides: false, // 星护甲logo 显示和隐藏
      icon01: icon01,
      icon02: icon02,
      isBule: false,
      isMsgShow: false, // 控制消息列表的显示
      orderCode: '', // 订单编号
      isNoMessage: false, // 暂时没有消息通知 false为有信息
      pageNum: '1'
    }
  },
  watch: {
    userName () {
      if (!!userName) {
        this.isNoMessage = false
        this.getMessageInfo()
      } else {
        this.pageNum = 1
        this.isNoMessage = true
        this.isMsgShow = false
        return
      }
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      messageList: state => state.QMXStore.messageList,
      noReadNum: state => state.QMXStore.noReadNum,
      totalResultMsg: state => state.QMXStore.totalResultMsg,
      pageSizeNumMsg: state => state.QMXStore.pageSizeNumMsg,
      qmxOrderCode: state => state.qmxOrderCode,
      userName: state => state.userName
    })
  },
  mounted () {
    // 钩子函数
    this.init()
    // console.log(this.qmxOrderCode);
  },
  methods: {
    init () {
      // 初始化
      // console.log('init')
      if (window.location.hash === '#/ProductQMXOrder.html') {
        this.isBule = true
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
        if (localStorage.getItem('userName')) {
          // window.open(window.location.href.split('#')[0] + '#/' + 'ProductQMXOrder.html')
          this.$router.push({ name: 'ProductQMXOrder' })
        } else {
          this.$store.dispatch('showPoint', '请先登录')
        }
      }
    },
    getMessageInfo () {
      this.fetchMessage()
    },
    fetchMessage: async function () {
      // 接口请求 ———— 获取企明星的消息list
      let params = {
        body: {
          pageNum: this.pageNum,
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
      // console.log(params)
      const res = await http.post(api.getOrderList + '?time=' + Date.now(), params)
      if (res.status == 200) {
        // console.log(res.data.body.success);
        if (res.data.body.success != 'false') {
          // 成功
          // console.log("拉取数据")
          // 更新消息通知列表
          this.$store.dispatch('changeMessageList', res.data.body.result)
          // 添加未读消息数字的 方法
          this.$store.commit('CHANGEREADNUM', res.data.body.result.noReadNum)
          this.isNoMessage = false
        } else {
          console.log('暂时没有消息')
          this.isNoMessage = true
          // this.$store.dispatch('showPoint', res.data.body.errorMsg)
        }
      } else {
        this.isNoMessage = true
        console.log('网络异常请稍后再试')
        // this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    },
    closeMsg () {
      // 关闭message
      this.isMsgShow = false
    },
    isReadFun (item) {
      this.orderCode = item.orderCode
      if (item.visited == '1') {
        item.visited = '0'
        this.fetchMessageRead()
      }
      this.$store.commit('CHANGEORDERCODER', this.orderCode)
      this.$router.push({ name: 'ProductQMXOrder' })
      localStorage.setItem('orderCode', this.orderCode)
      // localStorage.setItem('orderCode', this.orderCode)
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
        console.log(res.data);
        if (res.data == true) {
          // let data = this.noReadNum-1
          // console.log(this.noReadNum);
          // this.$store.commit('CHANGEREADNUM', data)
          this.getMessageInfo()
        }
      } else {

        // this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    },
    handleCurrentChange (val) {
      // 获取页签数值
      console.log(val)
      this.pageNum = val
      this.getMessageInfo()
    },
  },
  components: {
    LogoBg,
    LoginNav,
    NavEntrance
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.positionR{position: relative;}
.logo{display: flex;align-items:center;margin-left: 20px;}
.logo .img1{ width: 180px;}
.logo .img2{ width: 110px;}
.logoLeft{display: inline-block;height: 30px;width: 2px;background: #555;margin-left:20px;}
.msgNumBox{background: #C30000;color: #fff;font-size: 12px;width: 16px;height: 16px;
  position: absolute;top: 12px;right: -8px;display: inline-block;border-radius: 50%;}
.msgNum{position: absolute;top: -20px;right: 4px;transform: scale(0.8);}
.msgNumDouble{position: absolute;top: -20px;right: 1px;transform: scale(0.8);}
.header{background: #fff; justify-content: space-between;height: 56px;line-height: 56px;
  box-shadow: 0px 0px 5px #ccc;}
.blank{padding-left: 10px}
.msgBox{position: relative;}
.colorBlue{color: #3b77e3}
.msgList{height: 228px;overflow: auto;}
.msgItem{border-bottom: 1px solid #eee;border-right: 1px solid #eee;border-left: 1px solid #eee;
  position: relative;}
.msgItem:hover{background: #e3edfe}
.msgTip{height: 40px;line-height: 40px;background: #f0f0f0;position: absolute;
    top: 0;width: 100%;}
.itemImg{transform: translateY(10px); width: 30px;height: auto;}
.msgPointBox{ left: -80px;width: 390px;background: #fff;position: absolute;z-index: 9999; top: 66px;
  transform: rotateX(90deg) ; transform-origin: 0 0;transition: transform 0.5s;}
.ismsgPointBox{ padding-top: 40px;left: -80px;width: 390px;background: #fff;position: absolute;
  z-index: 9999; top: 66px;transform: rotateX(0deg) ; transform-origin: 0 0; transition: transform 0.5s;
  overflow-x: hidden;}
.triangle{display: inline-block;width: 10px;height: 10px;background: #f0f0f0;
  position: absolute; top: -4px; left: 110px; transform: rotate(45deg);}
.height24{height: 24px;line-height: 32px}
.msgIsRead{display: inline-block;width: 8px;height: 8px;background: #C30000;border-radius: 50%;
  position: absolute;top: 10px;left: 45px;}
.noMessage{text-align: center;color: #ccc;line-height: 200px;}
.overText{overflow: hidden;text-overflow:ellipsis;white-space: nowrap; width: 300px;}
.pageBox{ position: absolute;left: 50%;transform: translateX(-50%) scale(0.7); bottom: -12px;}
.pageBoxWarp{height: 56px;position: relative;}
.closeMsg{width: 100vw; height: 100vh; position: absolute;top:0 ;left: 0;
  z-index: 1;}
.pl10{padding-left: 10px;}
.msgListIn{min-height: 171px;}
</style>
