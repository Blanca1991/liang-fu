<!-- 登录输入信息框 -->
<template>
  <div class="TipsBoxWarp minWidthBox">
    <div class="tipsBox textL">
      <div class="iconBtn pointer" @click="closeTips">
        <em></em>
      </div>
      <div class="contentDiv">
        <div class="font22">
          <strong>{{ this.tipsInfoComp.title }}</strong>
        </div>
        <div class="font16" v-for="item in this.tipsInfoComp.detail">
          <div v-html="item"></div>
        </div>
        <div class="imgInUrlStyle">
          <img :src="this.tipsInfoComp.imgInUrl" alt="">
        </div>
      </div>
    </div>
    <div class="" @click="closeTips">
      <MaskBox />
    </div>
  </div>
</template>

<script>
import MaskBox from '@/components/MaskBox'

export default {
  name: 'TipsBox',
  data () {
    return {}
  },
  computed: {},
  methods: {
    closeTips () {
      this.$store.state.isTipsShow = false
    }
  },
  components: {
    MaskBox
  },
  props: [
    'tipsInfoComp'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tipsBox {width: 800px;height: 340px;overflow: hidden; position: absolute; left: 50%;background: #fff;z-index: 10;
   transform: translate(-50%);box-shadow: 0px 0px 5px #888888; padding: 40px;top: 200px;border-radius: 5px;}
.iconBtn{position: absolute;right: 20px;top: 20px;}
.iconBtn em{display: inline-block;width: 20px;height: 20px;
  background: url(../images/company/fancy_close.png) no-repeat;background-size: 100%;}
.imgInUrlStyle{text-align: center;}
.contentDiv{overflow: auto; height: 100%;}
.contentDiv::-webkit-scrollbar {
    display: none;
}
</style>
