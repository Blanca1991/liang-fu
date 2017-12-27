<!-- 合作联系 wuxiaobo-->
<template>
  <div  class="ServiceWarp">
    <ComHeader :isActiveComp="isActives"/>
    <div class="">
      合作联系
    </div>
    <login v-show="this.$store.state.isLogin"/>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'

export default {
  name: 'Cooperate',
  data () {
    return {
      isActives: 'Cooperate'
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('Cooperate init')
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
