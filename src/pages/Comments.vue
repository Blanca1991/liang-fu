<!-- 意见和建议 wuxiaobo-->
<template>
  <div  class="ServiceWarp">
    <ComHeader :isActiveComp="isActives" />
    <div class="">
      <span>意见和建议</span>
    </div>
    <login v-show="isLogin"/>
    <PointOut  v-show="pointShow" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'
import PointOut from '@/components/PointOut'

export default {
  name: 'Comments',
  data () {
    return {
      isActives: 'Comments',
      pointShowT: false
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      isLogin: state => state.isLogin,
      pointShow: state => state.pointShow
    })
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('Comments init !')
    }
  },
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
