<!-- 登录小窗 -->
<template>
  <div class="LoginNavWarp">
    <div class="LoginNav font14">
      <span class="pointer inBlock loginSpan" v-show="isLoginNav" @click="loginFun" >请登录</span>
      <span v-show="!isLoginNav">欢迎您</span>
      <span v-show="!isLoginNav">{{ userName }}</span>
      <span class="clickSpan" v-show="!isLoginNav" @click="quitFun" >退出</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LoginNav',
  data () {
    return {
      userName: ''
    }
  },
  computed: mapState([
    'isLoginNav'
  ]),
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 初始化
      this.getUserName()
      console.log(this.$store.state)
    },
    getUserName () {
      let userName = localStorage.getItem('userName')
      if (userName && userName !== '') {
        this.userName = userName
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
      this.$store.commit('showLogin')// 显示登录窗口
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
</style>
