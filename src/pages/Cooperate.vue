<!-- 合作联系 wuxiaobo-->
<template>
  <div  class="ServiceWarp">
    <ComHeader :isActiveComp="isActives"/>
    <div class="">
      合作联系
    </div>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader'

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
    ComHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
