<!-- 登录小窗 -->
<template>
  <div class="LoginNavWarp">
    <div class="LoginNav font14">
      <span class="pointer inBlock loginSpan" v-show="isLoginNav" @click="loginFun" >请登录</span>
      <span v-show="!isLoginNav">欢迎您</span>
      <span v-show="!isLoginNav">{{ userName }}</span>
      <span class="quitSpan pointer" v-show="!isLoginNav" @click="quitFun" >退出</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LoginNav',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      // 获取数据
      isLoginNav: state => state.isLoginNav,
      userName: state => state.userName
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 初始化
      this.getUserName()
      this.judgeUser()
    },
    judgeUser () {
      // 登录的时间差 计算 清除登录信息
      // console.log('LFZXLOGINTIME')
      // console.log(localStorage.getItem('LFZXLOGINTIME'))
      if (localStorage.getItem('LFZXLOGINTIME')) {
        let date1 = localStorage.getItem('LFZXLOGINTIME')
        let differ = parseInt(new Date() - new Date(date1)) / 1000 / 3600
        // differ 为 上次登录到这次登录的时间差（小时）
        // console.log(differ)
        if (differ >= 1) {
          localStorage.removeItem('LFZXtoken')
          localStorage.removeItem('LFZXLOGINTIME')
          localStorage.removeItem('userName')
        }
      }
    },
    getUserName () {
      let userName = localStorage.getItem('userName')
      if (userName && userName !== '') {
        this.$store.commit('GETUSERNAME', userName)
        this.$store.state.isLoginNav = false
      } else {
        this.$store.state.isLoginNav = true
      }
    },
    quitFun () {
      this.$store.state.isLoginNav = true
      localStorage.clear()
    },
    loginFun () {
      this.$store.commit('SHOWLOGIN')// 显示登录窗口
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.LoginNav{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  min-width: 200px;
}
.loginSpan {
  width: 50%;
  padding: 10px;
}
.loginSpan:hover{
  color: #088db8
}
.LoginNav span{
  margin: 0 5px;
}
.quitSpan:hover{
  color: #088db8
}
</style>
