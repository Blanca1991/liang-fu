<!-- 登录输入信息框 -->
<template>
  <div class="LoginWarp">
    <div class="Login" >
      <span class="close inBlock pointer" @click="closeLogin"></span>
      <div class="font18 colorRed ">
        <span>登录</span>
      </div>
      <div class="inputBox userNameBox font14">
        <label class="colorRed ">用户名</label>
        <input type="text" class="userName" v-model="userName" @keyup="enterFun($event)"/>
      </div>
      <div class="inputBox passwordBox font14">
        <label class="colorRed ">密码</label>
        <input type="password" class="passWord" v-model="passWord" />
      </div>
      <div class="LoginBtnBox">
        <span class="LoginBtn pointer" @click="loginFun()">登录</span>
      </div>
    </div>
    <PointOut v-show="pointShow" :pointTextComp="pointText" />
    <MaskBox v-show="this.$store.state.isMask" v-on:closeComp="closeLogin"/>
  </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/utils/api'
import PointOut from '@/components/PointOut'
import MaskBox from '@/components/MaskBox'

export default {
  name: 'Login',
  data () {
    return {
      userName: '', // 用户名
      passWord: '', // 密码
      pointShow: false, // 控制提示框的显示 true为显示 false为隐藏
      pointText: '' // 提示框内显示的文字
    }
  },
  methods: {
    quitFun () {
      this.login = true
    },
    loginFun () {
      // 事件绑定 ———— 登录
      this.login = false
      if (this.userName === '') {
        this.pointOutFun('请填写用户名')
      } else if (this.passWord === '') {
        this.pointOutFun('请填写密码')
      }
      this.fetchLogin()
    },
    enterFun (event) {
      // 事件绑定 -- 回车键事件
      if (event.keyCode === 13) {
        this.fetchLogin()
      }
    },
    fetchLogin: async function () {
      // 接口请求 ———— 登录接口
      let params = {
        userName: this.userName,
        password: this.passWord
      }
      const res = await http.post(api.login, params)
      // console.log(res)
      if (res.data.success && res.data.success === 'true') {
        console.log('loginSuccess')
        this.$store.commit('hideLogin')// 隐藏登录框
        // this.$store.commit('hideLoginNavBtn')
        this.$store.state.isLoginNav = false// 切换loginNav的内容
        localStorage.setItem('userName', this.userName)
        localStorage.setItem('token', res.data.token)
        this.userName = ''
        this.passWord = ''
      } else {
        this.pointOutFun(res.data.msg)
      }
    },
    pointOutFun (date) {
      // 事件调用 -- 调用提示层
      this.pointShow = true
      this.pointText = date
      let vm = this
      setTimeout(function () {
        // 定时器
        vm.pointShow = false
      }, 1800)
    },
    closeLogin () {
      // 事件绑定 -- 关闭登录窗口
      this.$store.commit('hideLogin')
    }
  },
  components: {
    PointOut,
    MaskBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.LoginWarp{
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
}
.Login{
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  z-index: 11;
  width: 400px;
  height: auto;
  background: #fff;
  padding: 30px 50px;
  border:1px solid #ccc;
  border-radius: 5px;
  text-align: left;
}
.close {
  height: 30px;
  width: 30px;
  background: url(../images/close_bg.png) no-repeat center;
  background-size: 50%;
  position: absolute;
  right: 10px;top: 10px;
}
.inputBox label{
  display: block;
  margin-top: 15px;
}
.inputBox input{
  display: block;
  width: 100%;
  height: 28px;
  border: 0;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
}
.userNameBox{
  margin-bottom: 20px 0;
}
.userName{
  background: url(../images/loginName_bg.png) no-repeat right center;
}
.passWord{
  background: url(../images/loginLock_bg.png) no-repeat right center;
}
.colorRed{
  color: #e75455;
}
.LoginBtnBox{
  margin-top: 30px;
}
.LoginBtn{
  background: #e75455;
  padding: 6px 25px;
  color: #fff;
  border-radius: 5px;
}
</style>
