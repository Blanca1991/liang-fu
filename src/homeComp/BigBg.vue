<!-- product引用组件 基本身份信息 + 运营商信息 wuxiaobo-->
<template>
  <div class="homeBigBgWarp">
    <div class="bigBg">
      <div class="textBox">
        <div class="font30">
          <strong>信仰是力量，信用是财富！</strong>
        </div>
        <div class="font28">Faith is power, credit is wealth! </div>
      </div>
      <div class="circleBox">
        <div class="circle">
          <em class="leftEm"></em>
          <em class="rightEm"></em>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'homeBigBg',
  data () {
    return {}
  },
  computed: {},
  watch: {},
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('homeBigBg init')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/homeComp'
</style>
