<!-- 用户信息 wuxiaobo-->
<template>
  <div  class="UserInfoWarp minWidthBox">
    <ComHeader :isActiveComp="isActives"/>
    <div class="UserInfo">
      <div class="infoList">

      </div>
      <div class="contentDiv">
        <div class="">

        </div>
      </div>
    </div>
    <login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ComHeader from '@/components/ComHeader'
import PointOut from '@/components/PointOut'
import Login from '@/components/Login'

export default {
  name: 'UserInfo',
  data () {
    return {
      isActives: 'UserInfo'
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
      console.log('UserInfo init')
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
.UserInfoWarp{}
.UserInfo{}
.infoList{}
.contentDiv{}
</style>
