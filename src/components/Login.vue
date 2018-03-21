<!-- 登录输入信息框 -->
<template>
  <div class="LoginWarp minWidthBox">
    <div class="Login" >
      <span class="close inBlock pointer" @click="$store.commit('HIDELOGIN')"></span>
      <div class="font18 colorRed ">
        <span>登录</span>
      </div>
      <div class="inputBox userNameBox font14">
        <label class="colorRed ">用户名</label>
        <input type="text" class="userName" v-model="userName" />
      </div>
      <div class="inputBox passwordBox font14">
        <label class="colorRed ">密码</label>
        <input type="password" class="passWord" v-model="passWord" @keyup="enterFun($event)"/>
      </div>
      <div class="LoginBtnBox">
        <span class="LoginBtn pointer" @click="loginFun()">登录</span>
      </div>
    </div>
    <PointOut v-show="pointShow" />
    <MaskBox v-show="this.$store.state.isMask" v-on:closeComp="$store.commit('HIDELOGIN')"/>
  </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/utils/api'
import {mapState} from 'vuex'
import PointOut from '@/components/PointOut'
import MaskBox from '@/components/MaskBox'

export default {
  name: 'Login',
  data () {
    return {
      userName: '', // 用户名
      passWord: '' // 密码
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow
    })
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
      } else {
        this.fetchLogin()
      }
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
      console.log(res)
      if (res.status === 200) {
        if (res.data.success && res.data.success === 'true') {
          // console.log('loginSuccess')
          this.$store.commit('HIDELOGIN')// 隐藏登录框
          this.$store.state.isLoginNav = false// 切换loginNav的内容
          this.$store.commit('GETUSERNAME', this.userName)// 给store中的username赋值
          localStorage.setItem('userName', this.userName)
          localStorage.setItem('LFZXtoken', res.data.token)
          localStorage.setItem('LFZXLOGINTIME',Date())
          this.userName = ''
          this.passWord = ''
        } else {
          this.pointOutFun(res.data.msg)
          this.$store.state.isLoginNav = true// 切换loginNav的内容
        }
      } else {
        this.pointOutFun('网络异常,请稍后重试')
      }
    },
    pointOutFun (data) {
      // 事件调用 -- 调用提示层
      this.$store.state.pointShowBtn = false // 隐藏掉point的btn
      this.$store.dispatch('showPoint', data)
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
@import '../css/login'
</style>
