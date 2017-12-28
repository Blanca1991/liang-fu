<!-- 首页 wuxiaobo-->
<template>
  <div  class="HomeWarp">
    <ComHeader :isActiveComp="isActives" />
    <div class="scoll">
      home
    </div>
    <login v-show="isLogin"/>
    <PointOut v-show="pointShow" :pointTextComp="pointText" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'
import PointOut from '@/components/PointOut'

export default {
  name: 'Home',
  data () {
    return {
      isActives: 'Home' // ComHeader内对应的tag高亮
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      pointText: state => state.pointText,
      isLogin: state => state.isLogin
    })
  },
  mounted () {
    // 钩子函数
  },
  methods: {},
  components: {
    ComHeader,
    Login,
    PointOut
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
