<!-- product引用组件 总体评分 wuxiaobo-->
<template>
  <div class="summaryInfoWarp ">
    <div class="summaryInfo flex">
      <div class="infoTitle font24">
        总体评估情况
      </div>
      <div class="infoBox ">
        <div class="scoreBox flex">
          <div class="font22 scoreBoxL textL borderR">
            智能评分
          </div>
          <div class="scoreWord flex">
            <div class="flex scoreWord pL20">
              <span class="font22">智多分 :</span>
              <span class="font44 pL10">{{score}}</span>
            </div>
            <div class="scoreImgBox pL20" v-if="scoreShow">
              <div class="scoreDot flex">
                <span class="inBlock" v-bind:style="{marginLeft: this.scoreStyle}"></span>
              </div>
              <div class="scoreBar flex">
                <span class="inBlock"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="infoListBox">
          <div class="infoList">
            <div class="ruleTitle borderT flex">
              <div class="ruleTitleL textL borderR pL20">
                <strong>触发禁止性规则</strong>
              </div>
              <div class="ruleTitleR textL pL20 flex pointer" @click="toggleList('prohibit')">
                <span>{{prohibit.num}} 条</span>
                <i class="selectDown " v-bind:class="{'selectUp': prohibitIsShow}"></i>
              </div>
            </div>
            <div class="flex detailList borderT" v-if="prohibitIsShow" v-for="item in prohibit.details">
              <div class="textL pL20 detailListL borderR">
                <span>{{item.ruleName}}</span>
              </div>
              <div class="textL pL20 ">
                <span :class="{textRebBg: prohibit.num !== '0'}">{{item.desc}}</span>
              </div>
            </div>
          </div>
          <div class="infoList">
            <div class="ruleTitle borderT flex">
              <div class="ruleTitleL textL borderR pL20">
                <strong>触发限制性规则</strong>
              </div>
              <div class="ruleTitleR textL pL20 flex pointer" @click="toggleList('restriction')">
                <span>{{restriction.num}} 条</span>
                <i class="selectDown " v-bind:class="{'selectUp': restrictionIsShow}"></i>
              </div>
            </div>
            <div class="flex detailList borderT" v-if="restrictionIsShow" v-for="item in restriction.details">
              <div class="textL pL20 detailListL borderR">
                <span>{{item.ruleName}}</span>
              </div>
              <div class="textL pL20 ">
                <span :class="{textYellowBg: restriction.num !=='0'}">{{item.desc}}</span>
              </div>
            </div>
          </div><div class="infoList">
            <div class="ruleTitle borderT flex">
              <div class="ruleTitleL textL borderR pL20">
                <strong>触发提示性规则</strong>
              </div>
              <div class="ruleTitleR textL pL20 flex pointer" @click="toggleList('prompt')">
                <span>{{prompt.num}} 条</span>
                <i class="selectDown " v-bind:class="{'selectUp': promptIsShow}"></i>
              </div>
            </div>
            <div class="flex detailList borderT" v-if="promptIsShow" v-for="item in prompt.details">
              <div class="textL pL20 detailListL borderR">
                <span>{{item.ruleName}}</span>
              </div>
              <div class="textL pL20 ">
                <span :class="{textYellowBg: prompt.num !=='0'}">{{item.desc}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'SummaryInfo',
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
