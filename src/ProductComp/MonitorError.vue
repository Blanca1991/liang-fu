<!-- 引用组件 企业监测预警 列表为空 wuxiaobo-->
<template>
  <div class="orderEmpty">
    <div class=" ">
      <div class="">
        <img :src="errorBg" alt="">
        <div class="textCenter font14 errorText">
          系统异常，请稍候再试......
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import errorBg from '@/images/QMX/error_bg.png'

export default {
  name: 'MonitorError',
  data () {
    return {
      errorBg: errorBg
    }
  },
  computed: {

  },
  watch: {},
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orderEmpty{ height: 470px; width: 1000px; margin: 0 auto; padding-top: 100px; box-sizing: border-box;}
.errorText{line-height: 56px; color: #666;}
</style>
