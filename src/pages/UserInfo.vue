<!-- 用户信息 wuxiaobo-->
<template>
  <div  class="ServiceWarp">
    <ComHeader :isActiveComp="isActives"/>
    <div class="">
      用户中心
    </div>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader'

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
    ComHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
