<!-- 首页 wuxiaobo-->
<template>
  <div  class="HomeWarp">
    <ComHeader :isActiveComp="isActives"/>
    <div class="scoll">
      home
    </div>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader'

export default {
  name: 'Home',
  data () {
    return {
      isActives: 'Home'
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
