<!-- 首页 wuxiaobo-->
<template>
  <div  class="HomeWarp">
    <ComHeader :isActiveComp="isActives"/>
    <div class="scoll">
      home
    </div>
    <login />
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'

export default {
  name: 'Home',
  data () {
    return {
      isActives: 'Home'
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
