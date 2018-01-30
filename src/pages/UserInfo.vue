<!-- 用户信息 wuxiaobo-->
<template>
  <div  class="UserInfoWarp minWidthBox">
    <div class="ComHeader minWidthBox">
      <ComHeader :isActiveComp="isActives"/>
    </div>
    <div class="UserInfo flex">
      <div class="UserInfoList">
        <div class="infoList">
          <div class="infoItem flex" v-for="item in leftList">
            <div class="infoItemImg">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="infoItemText">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="contentDiv">
        <div class="contentDivIn">
          <div class="content flex">
            <div class="">
              <img :src="fbb" alt="">
            </div>
            <div class="userText textL">
              <div class="">
                <span>您好：</span>
                <span>{{ userName }}</span>
                <span class="queit pointer" @click="quitFun">退出</span>
              </div>
              <div class="">
                <span>资料完整度</span>
              </div>
              <div class="rule">
                <span class="ruleIn"></span>
                <span class="tuleNum">50%</span>
              </div>
            </div>
            <div class="divBtnBox flex">
              <div class="flex pointer divBtn">
                <div class="imgBox">
                  <img :src="person" alt="">
                </div>
                <div class="">
                  <span>个人信息</span>
                </div>
              </div>
              <div class="flex pointer divBtn">
                <div class="imgBox">
                  <img :src="lock" alt="">
                </div>
                <div class="">
                  <span>修改密码</span>
                </div>
              </div>
              <div class="flex pointer divBtn">
                <div class="imgBox">
                  <img :src="protect" alt="">
                </div>
                <div class="">
                  <span>企业认证</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ComHeader from '@/components/ComHeader'
import PointOut from '@/components/PointOut'
import Login from '@/components/Login'
import iconCloud from '../images/home/iconCloud.png'
import iconConsult from '../images/home/iconConsult.png'
import iconCredit from '../images/home/iconCredit.png'
import iconSurvey from '../images/home/iconSurvey.png'
import myOrder from '../images/userinfo/myorder.png'
import zhengxin from '../images/userinfo/myreport.png'
import protect from '../images/userinfo/protect.png'
import lock from '../images/userinfo/lock.png'
import person from '../images/userinfo/person.png'
import fbb from '../images/userinfo/fbb.png'

export default {
  name: 'UserInfo',
  data () {
    return {
      isActives: 'UserInfo',
      leftList: [
        {
          name: '我的订单',
          imgUrl: myOrder
        },
        {
          name: '征信报告',
          imgUrl: zhengxin
        },
        {
          name: '企业征信报告',
          imgUrl: iconCredit
        },
        {
          name: '实地调查报告',
          imgUrl: iconSurvey
        },
        {
          name: '云审批决策服务',
          imgUrl: iconCloud
        },
        {
          name: '信用风险管理咨询',
          imgUrl: iconConsult
        },
        {
          name: '个人信息',
          imgUrl: person
        }
      ],
      fbb: fbb,
      userName: localStorage.getItem('userName'),
      person: person,
      lock: lock,
      protect: protect
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
      console.log('UserInfo init')
    },
    quitFun () {
      this.$store.state.isLoginNav = true
      localStorage.clear()
      this.$router.push({name: 'Home'})
    }
  },
  components: {
    ComHeader,
    Login,
    PointOut
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.UserInfoWarp{background: #eee; height: 100vh; overflow: hidden;}
.ComHeader{}
.UserInfo .UserInfoList{box-sizing: border-box;background: #2c2e2d; width: 250px;height: 100vh;}
.infoList{}
.infoItem{ padding: 20px;background: #434445;border-bottom: 1px solid #666}
.infoItem:hover{background: #38b7ea}
.infoItemImg{width: 30px;}
.infoItemImg img{width: 60%;}
.infoItemText{color: #fff;padding-left: 10px;}
.contentDiv{ box-sizing: border-box; flex:1;}
.contentDivIn{width: 96%; background: #fff;margin: 10px auto;}
.content{padding:20px;position: relative;}
.userText{color: #38b7ea;padding: 20px;margin-left: 10px;}
.userText .rule{width: 100%;height: 10px;border-radius: 50px;border:1px solid #38b7ea;
   margin-top: 10px;position: relative;}
.queit{color: #EA5B56}
.ruleIn{display: inline-block;width: 50%;background:#38b7ea; height: 10px;border-radius: 50px;
  position: absolute;top: 0;left: 0; animation: widthChange  1s ease-in;}
@keyframes widthChange {
  0% {width: 0%;}
  100% {width: 50%;}
}
.tuleNum{position: absolute;right: -50px;top: -6px;}
.divBtnBox{color: #fff;position: absolute; right: 20px;top: 40px;}
.divBtnBox .divBtn{background: #38b7ea;height: 40px;line-height: 40px;margin: 10px;padding: 3px 15px;
  border-radius: 5px;}
.divBtn .imgBox{width: 30px;padding-top: 5px;box-sizing: border-box;}
.divBtn .imgBox img{width: 60%;}
</style>
