<!-- productQMX引用组件 订单提交成功 wuxiaobo-->
<template>
  <div class="orderOver">
    <div class="submitPointWarp minWidthBox">
      <div class="submitPoint">
        <div class="textTip colorWhite font14">
          提示
        </div>
        <div class="textCenter font14">
          <div class="">
            您提交的征信报告正在生成中，
          </div>
          <div class="">
            请耐心等待，查看进度请至“我的订单”中查看
          </div>
        </div>
        <div class="bgLine"></div>
        <div class="colorWhite flex btnBox font14">
          <div class="blueBg pointer" @click="hideQmxSubTips">
            关闭
          </div>
          <div class="blueBg pointer" @click="goToQmxOrder">
            去查看
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'OrderOver',
  data () {
    return {}
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
    hideQmxSubTips () {
      this.$store.commit('HIDEQMXSUBTIPS')
    },
    goToQmxOrder () {
      this.$store.commit('HIDEQMXSUBTIPS')
      window.open(window.location.href.split('#')[0] + '#/' + 'ProductQMXOrder.html')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orderOver{position: absolute;width: calc(100vw + 20px);height: 100vh;top: 0;background: rgba(000, 000, 000, 0.3);
  }
.submitPointWarp{height: 100vh;position: relative;}
.submitPoint{width: 400px; height: 250px;background: #fff; position: absolute; top: 50%;left: 50%;
  transform: translateX(-50%) translateY(-50%);border-radius: 5px;}
.textTip{background: #3b77e3;height: 40px;width: 100%;line-height: 40px;text-align: left;padding-left: 20px;
  box-sizing: border-box;border-radius: 5px 5px 0 0 ;}
.colorWhite{color: #fff;}
.textCenter{text-align: center; margin-top: 60px;}
.bgLine{background: #f1f1f1;width: 90%;margin:50px auto 12px;height: 1px;}
.blueBg{background: #3b77e3; border-radius: 5px; padding: 5px 15px;}
.btnBox{justify-content: space-between;width: 40%;margin: 0 auto;}
</style>
