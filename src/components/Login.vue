<template>
  <div class="LoginWarp">
    <div class="Login">
      <span class="clickSpan" v-show="login" @click="loginFun" >请登录</span>
      <span v-show="!login">欢迎您</span>
      <span v-show="!login">loginTest</span>
      <span class="clickSpan" v-show="!login" @click="quitFun" >退出</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      login: true
    }
  },
  methods: {
    quitFun () {
      this.login = true
    },
    loginFun () {
      this.login = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Login{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  min-width: 200px;
}
.Login span{
  margin: 0 5px;
  font-weight: bold;
}
.clickSpan{
    cursor:pointer
}
</style>
