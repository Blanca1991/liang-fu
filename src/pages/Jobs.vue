<!-- 公司招聘 wuxiaobo-->
<template>
  <div  class="ServiceWarp">
    <ComHeader :isActiveComp="isActives"/>
    <div class="">
      公司招聘
    </div>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader'

export default {
  name: 'Jobs',
  data () {
    return {
      isActives: 'Jobs'
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('Jobs init')
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
