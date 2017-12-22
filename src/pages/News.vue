<!-- 公司新闻 wuxiaobo-->
<template>
  <div  class="ServiceWarp">
    <ComHeader :isActiveComp="isActives"/>
    <div class="">
      新闻
    </div>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader'

export default {
  name: 'News',
  data () {
    return {
      isActives: 'News'
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('News init')
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
