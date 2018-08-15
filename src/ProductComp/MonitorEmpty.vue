<!-- 引用组件 企业监测预警 列表为空 wuxiaobo-->
<template>
  <div class="orderEmpty">
    <div class=" ">
      <div class="">
        <img :src="emptyBg" alt="">
        <div class="textCenter">
          暂无数据...
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import emptyBg from '@/images/QMX/noData_bg.png'

export default {
  name: 'MonitorEmpty',
  data () {
    return {
      emptyBg: emptyBg
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
</style>
