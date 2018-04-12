<!-- productQMX引用组件 订单提交成功 wuxiaobo-->
<template>
  <div class="">
    <div class="">
      {{currentPage}} / {{pageCount}}
    </div>
    <div class="">
      <pdf src="../../staticV2/qimingxing.pdf"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
      ></pdf>
    </div>
  </div>
</template>

<script>
// import emptyIcon from '@/images/QMX/emptyIcon.png'
import pdf from 'vue-pdf'

export default {
  name: 'QmxPdf',
  data () {
    return {
      currentPage: 0,
      pageCount: 0,
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
  },
  components: {
　　  pdf
　}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
