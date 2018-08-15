<!-- 引用组件 企业监测预警 引用头部  wuxiaobo-->
<template>
  <div class="minWidthBox monBox">
    <div class="header flex">
      <NavEntrance />
      <div class="loginNavBox flex">
        <div class="">
          <span class="pointer font16 enter" v-for="(item, index) in items" @click="goTo(index)" :class="{ 'enterActive': isActive==index }">{{ item }}</span>
        </div>
        <div class="msgBox">
          <div class="font16 pointer positionR" @click="isMsgShowFun" :class="{colorBlue: isMsgShow === true }">
            <span class="height58" :class="{enterActive: isActive == 3}">我的消息</span>
            <span v-if="userName && !isNoMessage ">
              <span class="msgNumBox fontBold" v-if="noReadCount && noReadCount > 0 ">
                <span class="msgNumDouble " v-if="noReadCount > 9">
                  {{ noReadCount }}
                </span>
                <span class="msgNum" v-if="noReadCount < 10">
                  {{ noReadCount }}
                </span>
                <span class="msgNum msgNumMax" v-if="noReadCount > 99">
                  99+
                </span>
              </span>
            </span>
          </div>
          <div class="msgPointBox borderB borderT borderL borderR font14 textL" :class="{ismsgPointBox : isMsgShow === true}" v-if="isMsgShow">
            <div class="pL20 fontColor " >
              <i class="triangle"></i>
              <div class="msgTip" v-if="!isNoMessage && !!messageList && messageList.length >= 1">
                <span>您有{{ noReadCount }}条未读消息</span>
              </div>
            </div>
            <div class="msgList" v-if="!isNoMessage && !!messageList && messageList.length >= 1">
              <div class="msgListIn">
                <div class="pL20 msgItem flex" v-for="item in messageList" >
                  <div class="">
                    <img :src="icon_out" alt="itemImg" class="itemImg">
                    <i class="msgIsRead" v-if="item.status == '0'"></i>
                  </div>
                  <div class="pL10"  @click="isReadFun(item)">
                    <div class="height24 font12 color666">
                      监控过期提醒
                    </div>
                    <div class="height24 overText font12">
                      <span >{{ item.mailContent }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pageBoxWarp textC pointer" @click="goToMsgList">
                <span class="pointer colorBlue" >查看更多</span>
              </div>
            </div>
            <div class="" v-if="isNoMessage || ! messageList || messageList.length < 1">
              <div class="font18 noMessage" >
              暂无消息
              </div>
            </div>
          </div>
        </div>
        <span class="blank"></span>
        <div class="font16 pointer ml10 height58" @click="goCompanyHelp" :class="{enterActive: isActive == 2}">帮助中心</div>
        <span class="blank"></span>
        <div class="pL10 pointer font16" @click="showUserBoxFun">
          <span class="">我的账户</span>
        </div>
        <!-- 用户信息弹窗 start -->
        <div class="account" v-if="isUserBox">
          <i class="triangle2"></i>
          <div class="flex padding20 borderB">
            <div class="useImg">
              <img :src="userNameImg" alt="" class="">
            </div>
            <div class="ml10">
              <div class="textL font18">
                {{ userName }}
              </div>
              <div class="textL color666 font14">
                欢迎来到企业监测预警中心
              </div>
            </div>
          </div>
          <div class="textL pl20 font14">
            企业名称：{{ companyName || '——'}}
          </div>
          <div class="textL pl20 font14">
            手机号：{{ userMobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") || '——' }}
          </div>
          <div class="textL pl20 borderB font14">
            邮箱：{{ userEmail || '——' }}
          </div>
          <div class="padding20 color666 font18 pointer" @click="quitFun">
            <span>退出登录</span>
          </div>
        </div>
        <!-- 用户信息弹窗 end -->
        <!-- 透明白色遮罩层 start-->
        <div class="closeMsg mask" @click="closeMsg" v-if="isMsgShow || isUserBox"></div>
        <!-- 透明白色遮罩层 end-->
      </div>
    </div>
    <LoginNav v-show="false"/>
  </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/utils/api'
import service from '@/service'
import Login from '@/components/Login'
import LoginNav from '@/components/LoginNav'
import NavEntrance from '@/ProductComp/NavEntrance'
import userNameImg from '@/images/QMX/userName.png'
import icon_out from '@/images/QMX/icon_out.png'
import {mapState} from 'vuex'

export default {
  name: 'QmxHaderNav',
  data () {
    return {
      items: [
        '预警中心',
        '关注企业'
      ],
      isActive: 0, // 控制入口被选中的颜色 预警中心 关注企业
      bgHides: false, // 星护甲logo 显示和隐藏
      icon_out: icon_out,
      isBule: false,
      isMsgShow: false, // 控制消息列表的显示
      isNoMessage: false, // 暂时没有消息通知
      pageNum: '1',
      userNameImg: userNameImg,
      isUserBox: false, // 个人账号是否显示
      companyName: '',
      userMobile: '',
      userEmail: '',
      messageList: []
    }
  },
  watch: {
    userName () {
      if (!!this.userName) {
        this.isNoMessage = false
        this.fetchUserInfo()
        this.fetchMessageList()
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
      noReadCount: state => state.MonitorStore.noReadCount,
      userName: state => state.userName
    })
  },
  mounted () {
    // 钩子函数
    this.init()
    if (localStorage.getItem('userName')) {
      this.fetchUserInfo()
      this.fetchMessageList()
      this.$store.state.userName = localStorage.getItem('userName')
    }
  },
  methods: {
    init () {
      // 初始化
      if (window.location.hash.indexOf('CompanyMonitor') >=0) {
        this.isActive = 0
      } else if (window.location.hash.indexOf('CompanyAttention') >= 0){
        this.isActive = 1
      } else if (window.location.hash.indexOf('CompanyHelp') >= 0){
        this.isActive = 2
      } else if (window.location.hash.indexOf('CompanyMsgList') >= 0){
        this.isActive = 3
      }
      service.getUrlParmas('emailEntery')
      let isEmailEntery = localStorage.getItem('emailEntery')
      console.log(!!isEmailEntery, !localStorage.getItem('userName'));
      if (!!isEmailEntery && !localStorage.getItem('userName')) {
        window.location.replace(window.location.href)
        this.$store.commit('SHOWLOGIN')
        localStorage.removeItem('emailEntery')
      }
    },
    showUserBoxFun () {
      // 事件绑定 —— 已登录显示user信息  未登录登录
      if (localStorage.getItem('userName')) {
        this.isUserBox = !this.isUserBox
      } else {
        // 请先登录
        this.$store.commit('SHOWLOGIN')
      }
    },
    goTo (index) {
      // 跳转 预警中心 还是 关注企业
      this.isActive = index
      if (index == 0) {
        this.$router.push({ name: 'CompanyMonitor' })
      } else if (index == 1) {
        this.$router.push({ name: 'CompanyAttention' })
        this.$store.commit('ROUTERCOMPANYNAME', '')
      }
    },
    goToMsgList () {
      // 跳转到我的消息页面
      this.$router.push({name: 'CompanyMsgList'})
    },
    isMsgShowFun () {
      // 事件绑定——消息列表展示前 判断登录
      if (localStorage.getItem('userName')) {
        this.isMsgShow = !this.isMsgShow
      } else {
        this.$store.dispatch('showPoint', '请先登录')
      }
    },
    goCompanyHelp () {
      // 跳转到帮助页面
      this.$router.push({ name: 'CompanyHelp' })
    },
    fetchUserInfo: async function () {
      // 获取用户的相信信息
      let params = {
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('LFZXtoken')
      }
      const res = await http.post(api.getUserInfo + '?time=' + Date.now(), params)
      // console.log(res);
      if (res.status == 200) {
        // console.log(res.data.body.success);
        if (res.data.status == '-0000') {
          // 成功
          this.companyName = res.data.body.companyName
          this.userMobile = res.data.body.mobile
          this.userEmail = res.data.body.email
        } else {
          console.log('暂时没有消息');
          // this.$store.dispatch('showPoint', res.data.body.errorMsg)
        }
      } else {
        this.isNoMessage = true;
        console.log('网络异常请稍后再试');
        // this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    },
    fetchMessageList: async function () {
      // 接口请求 ———— 获取企业监测的消息list
      let params = {
        pageNum: '1',
        pageSize: '10',
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('LFZXtoken')
      }
      // console.log(params)
      const res = await http.post(api.getOverdueInfoList + '?time=' + Date.now(), params)
      if (res.status == 200) {
        if (res.data.status == 'true') {
          // 成功
          this.isNoMessage = false;
          this.messageList = res.data.body
          this.$store.dispatch('getMessageList',res.data)
        } else {
          this.isNoMessage = true;
          this.$store.dispatch('showPoint', res.data.msg)
        }
      } else {
        this.isNoMessage = true;
        console.log('网络异常请稍后再试');
        // this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    },
    closeMsg () {
      // 关闭message 和 UserBox
      this.isMsgShow = false
      this.isUserBox = false
    },
    isReadFun (item) {
      if (item.status == '0') {
        let id = item.id
        this.fetchMessageRead(id)
      }
      this.$store.commit('ROUTERCOMPANYNAME', item.companyName)
      this.$router.push({ name: 'CompanyAttention'})
    },
    fetchMessageRead: async function (id) {
      // 接口请求 ———— 已度未读企业监测的消息list
      let params = {
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('LFZXtoken'),
        id: id
      }
      console.log(params)
      const res = await http.post(api.updateOverdueInfo + '?time=' + service.getNowDateTime(), params)
      console.log(res)
      if (res.status == 200) {
        if (res.data.status == true) {
          this.fetchMessageList()
        } else {
          console.log('未读修改为已读失败');
        }
      } else {
        this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    },
    quitFun () {
      localStorage.clear()
      this.$store.commit('ClEANUSERNAME')
      this.closeMsg()
    }
  },
  components: {
    NavEntrance,
    LoginNav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.monBox{background: #fff; justify-content: space-between;height: 56px;line-height: 56px;width: 100%;}
.loginNavBox{width: 440px}
.enterActive{ border-bottom: 3px solid #76B3DD;}
.enter{margin-right: 20px;height: 58px;display: inline-block;}
.positionR{position: relative;}
.logo{display: flex;align-items:center;margin-left: 20px;}
.logo .img1{ width: 180px;}
.logo .img2{ width: 110px;}
.logoLeft{display: inline-block;height: 30px;width: 2px;background: #555;margin-left:20px;}
.msgNumBox{background: #C30000;color: #fff;font-size: 12px;width: 16px;height: 16px;
  position: absolute;top: 12px;right: -8px;display: inline-block;border-radius: 50%;}
.msgNum{position: absolute;top: -20px;right: 4px;transform: scale(0.8);}
.msgNumDouble{position: absolute;top: -20px;right: 1px;transform: scale(0.8);}
.header{ justify-content: space-between;border-bottom: 1px solid #eee;}
.blank{padding-left: 10px}
.msgBox{position: relative;}
.colorBlue{color: #4EA0D5}
.msgList{height: 228px;overflow: auto;}
.msgItem{border-bottom: 1px solid #eee; position: relative;}
.msgItem:hover{background: #e3edfe}
.msgTip{height: 40px;line-height: 40px;background: #fff;position: absolute;
    top: 0;width: 100%;border-bottom: 1px solid #eee}
.itemImg{transform: translateY(10px); width: 30px;height: auto;}
.msgPointBox{ left: -80px;width: 390px;background: #fff;position: absolute;z-index: 9999; top: 66px;
  transform: rotateX(90deg) ; transform-origin: 0 0;transition: transform 0.5s;}
.ismsgPointBox{ padding-top: 40px;left: -180px;width: 390px;background: #fff;position: absolute;
  z-index: 9999; top: 66px;transform: rotateX(0deg) ; transform-origin: 0 0; transition: transform 0.5s;}
.triangle{display: inline-block;width: 10px;height: 10px;background: #fff;border-left: 1px solid #eee;
  border-top: 1px solid #eee; position: absolute; top: -6px; left: 206px; transform: rotate(45deg);}
.height24{height: 24px;line-height: 32px}
.msgIsRead{display: inline-block;width: 8px;height: 8px;background: #C30000;border-radius: 50%;
  position: absolute;top: 24px; left: 7px;}
.noMessage{text-align: center;color: #ccc;line-height: 170px;height: 200px;}
.overText{overflow: hidden;text-overflow:ellipsis;white-space: nowrap; width: 300px;}
.pageBox{ position: absolute;left: 50%;transform: translateX(-50%) scale(0.7); bottom: -12px;}
.pageBoxWarp{height: 56px;position: relative;}
.closeMsg{width: 100vw; height: 100vh; position: absolute;top:0 ;left: 0;
  z-index: 1;min-width: 1200px;}
.ml10{margin-left: 10px;}
.msgListIn{min-height: 171px;}
.msgNumMax{transform: scale(0.6);right: -4px}
.height58{ height: 58px;display: inline-block;}
.textC{text-align: center;}
.borderT{border-top: 1px solid #eee;}
.borderB{border-bottom: 1px solid #eee;}
.borderL{border-left: 1px solid #eee;}
.borderR{border-right: 1px solid #eee;}
.account{position: absolute; background: #fff;top: 65px;z-index: 2;width: 360px;
  line-height: 32px;right: 30px;border:1px solid #ddd;border-radius: 3px;}
.useImg{width: 64px;height: 64px;border-radius: 50%;border:1px solid #ddd;position: relative;}
.useImg img{width: 90%;position: absolute; width: 70%; left: 16%;   top: 11%;}
.triangle2{display: inline-block;width: 10px;height: 10px;background: #fff;border-top: 1px solid #eee;
  position: absolute;z-index: 3;transform: rotate(45deg);top: -6px;border-left: 1px solid #eee;
  left:315px;}
.padding20{padding:20px;}
.pl20{padding-left: 20px;}
.color666{color: #666;}
</style>
