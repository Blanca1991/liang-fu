<!-- 量富服务 wuxiaobo-->
<template>
  <div  class="ServiceWarp">
    <ComHeader :isActiveComp="isActives"/>
    <div class="">
      Service
    </div>
    <login v-show="this.$store.state.isLogin"/>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'

export default {
  name: 'Service',
  data () {
    return {
      isActives: 'Service'
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('init')
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
