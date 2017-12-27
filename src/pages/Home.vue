<!-- 首页 wuxiaobo-->
<template>
  <div  class="HomeWarp">
    <ComHeader :isActiveComp="isActives"/>
    <div class="scoll">
      home
    </div>
    <login v-show="this.$store.state.isLogin"/>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'

export default {
  name: 'Home',
  data () {
    return {
      isActives: 'Home', // ComHeader内对应的tag高亮
      isLogin: false // login登录组件是否显示  true显示 false隐藏
    }
  },
  computed: {

  },
  mounted () {
    // 钩子函数
  },
  methods: {
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
