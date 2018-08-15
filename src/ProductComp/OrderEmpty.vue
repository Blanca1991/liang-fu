<!-- 引用组件 征信报告引用 订单提交成功 wuxiaobo-->
<template>
  <div class="orderEmpty">
    <div class=" ">
      <div class="">
        <img :src="emptyIcon" alt="">
      </div>
      <div class="noOrder">
        暂无订单
      </div>
      <div class="font18">
        <span class="goOrder pointer" @click="goToQMX">
          立即下单
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import emptyIcon from '@/images/QMX/emptyIcon.png'

export default {
  name: 'OrderEmpty',
  data () {
    return {
      emptyIcon: emptyIcon
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

    },
    goToQMX () {
      window.location.hash = '#/ProductQMX.html'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orderEmpty{ height: 470px; width: 1000px; margin: 0 auto; padding-top: 100px; box-sizing: border-box;}
.noOrder{color: #D2D2D2;margin-bottom: 40px;}
.goOrder{background: #3b77e3;color: #fff;border-radius: 5px;padding: 15px 25px;display: inline-block;}
</style>
