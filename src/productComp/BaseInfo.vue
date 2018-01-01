<!-- product引用组件 总体评分 wuxiaobo-->
<template>
  <div class="baseInfoWarp ">
    <div class="baseInfo flex">
      <div class="infoTitle font24">
        基本身份信息
      </div>
      <div class="infoBox textL">
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width18">
            <span>姓名</span>
          </div>
          <div class="pL20 width18">
            <span>李*笑</span>
          </div>
          <div class="pR20 borderR width18 textR">
            <span>身份证号</span>
          </div>
          <div class="pL20">
            <span>64***********14</span>
          </div>
        </div>
        <div class="flex detailList borderB">
          <div class="pL20 borderR width18 ">
            <span>年龄</span>
          </div>
          <div class="pL20 width18">
            <span>30</span>
          </div>
          <div class="pR20 borderR width18 textR">
            <span>身份证所在地</span>
          </div>
          <div class="pL20">
            <span>宁夏回族自治区银南地区青铜峡市</span>
          </div>
        </div>
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width18">
            <span>性别</span>
          </div>
          <div class="pL20 width18">
            <span>男</span>
          </div>
          <div class="pR20 borderR width18 textR">
            <span>身份证符合编码规则</span>
          </div>
          <div class="pL20">
            <span>是</span>
          </div>
        </div>
        <div class="flex detailList borderB">
          <div class="pL20 borderR width18">
            <span>姓名与身份证匹配</span>
          </div>
          <div class="pL20">
            <span>是</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'BaseInfo',
  data () {
    return {
      scoreStyle: '', // 智多分 分数的坐标
      scoreShow: true, // 分数条的显示与否
      prohibitIsShow: false, // 控制禁止规则显示与否
      restrictionIsShow: false, // 控制限制规则显示与否
      promptIsShow: false // 控制提示规则显示与否
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      score: state => state.summaryInfoStore.score,
      prohibit: state => state.summaryInfoStore.prohibit,
      restriction: state => state.summaryInfoStore.restriction,
      prompt: state => state.summaryInfoStore.prompt
    })
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('summaryInfo init')
      this.emptyDetailsFun(this.prohibit)
      this.emptyDetailsFun(this.restriction)
      this.emptyDetailsFun(this.prompt)
      this.scoreStyleFun()
    },
    toggleList (data) {
      switch (data) {
        case 'prohibit':
          this.prohibitIsShow = !this.prohibitIsShow
          break
        case 'restriction':
          this.restrictionIsShow = !this.restrictionIsShow
          break
        case 'prompt':
          this.promptIsShow = !this.promptIsShow
          break
        default:
      }
    },
    emptyDetailsFun (data) {
      if (data.details.length === 0) {
        data.details.push({ruleName: '——', desc: '——'})
      }
    },
    scoreStyleFun () {
      if (this.score === null || this.score === '') {
        this.$store.state.summaryInfoStore.score = '暂无数据'
        console.log(this)
        this.scoreShow = false
      } else {
        let score = parseInt(this.score)
        let scoreStyle = (score - 350) * 0.6
        this.scoreStyle = scoreStyle + 'px'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
