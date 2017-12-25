<!-- 登录输入信息框 -->
<template>
  <div class="LoginWarp">
    <div class="Login" >
      <div class="font18 colorRed ">
        登录
      </div>
      <div class="inputBox userNameBox font14">
        <label class="colorRed ">用户名</label>
        <input type="text" class="userName" v-model="userName"/>
      </div>
      <div class="inputBox passwordBox font14">
        <label class="colorRed ">密码</label>
        <input type="password" class="passWord" v-model="passWord" />
      </div>
      <div class="LoginBtnBox">
        <span class="LoginBtn pointer" @click="loginFun()">登录</span>
      </div>
    </div>
    <PointOut v-show="pointShow" :pointTextComp="pointText" :dateFromChild="showDate"/>
    <MaskBox />
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
      login: true,
      userName: '',
      passWord: '',
      pointShow: false,
      pointText: ''
    }
  },
  methods: {
    quitFun () {
      this.login = true
    },
    loginFun () {
      // 事件绑定 ———— 登录
      console.log(this.userName)
      this.login = false
      if (this.userName === '') {
        this.pointShow = true
        this.pointText = '请填写用户名'
        let vm = this
        setTimeout(function () {
          // 定时器
          vm.pointShow = false
        }, 1800)
      } else if (this.passWord === '') {
        this.pointShow = true
        this.pointText = '请填写密码'
      }
      // this.userName
      // this.passWord
    },
    fetchData: async function () {
      let params = {
        userName: 'testlogin',
        password: '1234qwer'
      }
      const res = await http.post(api.login, params)
      if (res.data.success) {
        alert('请求成功')
      }
    },
    showDate (data) {
      console.log(data)
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
.inputBox{

}
.passwordBox{

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
