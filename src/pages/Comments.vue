<!-- 意见和建议 wuxiaobo-->
<template>
  <div  class="ServiceWarp">
    <ComHeader :isActiveComp="isActives"/>
    <div class="">
      <span>意见和建议</span>
    </div>
    <login v-show="this.$store.state.isLogin"/>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'

export default {
  name: 'Comments',
  data () {
    return {
      isActives: 'Comments'
    }
  },
  mounted () {
    // 钩子函数
    this.init()
    this.fetchData()
  },
  methods: {
    init () {
      // 初始化
      console.log('Comments init !')
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
