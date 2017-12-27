<!-- 用户信息 wuxiaobo-->
<template>
  <div  class="ServiceWarp">
    <ComHeader :isActiveComp="isActives"/>
    <div class="">
      用户中心
    </div>
    <login v-show="this.$store.state.isLogin"/>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'

export default {
  name: 'UserInfo',
  data () {
    return {
      isActives: 'UserInfo'
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('UserInfo init')
    }
  },
  components: {
    ComHeader,
    Login
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
