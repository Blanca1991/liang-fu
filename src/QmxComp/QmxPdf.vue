<!-- productQMX引用组件 订单提交成功 wuxiaobo-->
<template>
  <div class="">
    <div class="">
      {{page}}/{{numPages}}
    </div>
    <div class="pdfBox " >
      <div class="btnBox flex preBtnBox">
        <span class="preBtn pointer" @click="prePage"></span>
      </div>
      <!-- <pdf
        src="../../staticV2/pdf/qimingxing.pdf"
        @num-pages="numPages = $event"
        :rotate="rotate"
        :page="page"
      ></pdf> -->
      <div class="btnBox flex nextBtnBox">
        <span class="nextBtn pointer " @click="nextPage"></span>
      </div>
    </div>
    <PointOut v-show="pointShow" />
  </div>
</template>

<script>

import PointOut from '@/components/PointOut'
import {mapState} from 'vuex'
// import pdf from 'vue-pdf'

export default {
  name: 'QmxPdf',
  data () {
    return {
      rotate: 0,
      page: 1,
      numPages: 0
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow
    })
  },
  watch: {},
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {},
    prePage () {
      if (this.page > 2) {
        this.page --
      } else {
        this.$store.dispatch('showPoint', '当前是第一页')
      }
    },
    nextPage () {
      console.log(this.page)
      if (this.page < 27) {
        this.page ++
      } else {
        this.$store.dispatch('showPoint', '当前是最后一页')
      }
    }
  },
  components: {
    // pdf,
    PointOut
　}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pdfBox{width: 80% ;margin:0 auto;border: 1px solid #eee;margin-top: 20px;
  position: relative;padding-right: 8px}
.btnBox{width:100%;justify-content: space-around;margin:0 auto}
.preBtn{display: inline-block;width: 60px;height: 60px;background-size: 80%;top: 40px;
  background:  url(../images/QMX/next.png) no-repeat center; transform: rotate(90deg);}
.nextBtn{display: inline-block;width: 60px;height: 60px;background-size: 80%;bottom: 40px;
  background:  url(../images/QMX/next.png) no-repeat center; transform: rotate(-90deg);}
.preBtnBox{position: absolute;top: 1vw;z-index: 3;}
.nextBtnBox{position: absolute;bottom: 3vw;z-index: 3}
</style>
