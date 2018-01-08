<!-- product引用组件 公检法 逾期信息 wuxiaobo-->
<template>
  <div class="publicSecurityInfoWarp ">
    <div class="publicSecurityInfo flex divJump" id="publicSecurityInfo">
      <div class="infoTitle font24">
        公检法信息
      </div>
      <div class="infoBox textL font16">
        <div class="pL20 titleBg borderB  titleFont">
          <strong>司法负面信息</strong>
        </div>
        <div class="titleHeader flex borderB titleFont">
          <div class="width25 pL20 borderR">
            <span>日期</span>
          </div>
          <div class="width25 pL20 borderR">
            <span>类型</span>
          </div>
          <div class="width25 pL20 borderR">
            <span>标题</span>
          </div>
          <div class="width25 pL20">
            <span>匹配度</span>
          </div>
        </div>
        <div class="negativeInfo">
          <div class="titleHeader flex borderB " v-for="item in publicSecurityInfo.negativeInfo">
            <div class="width25 pL20 borderR flex flexAlignItems ">
              <div>
                <span class="">{{ item.date }}</span>
              </div>
            </div>
            <div class="width25 pL20 borderR flex flexAlignItems ">
              <div class="">
                <span>{{ item.type }}</span>
              </div>
            </div>
            <div class="width25 pL20 borderR titleList">
              <div>
                <span>{{ item.title }}</span>
              </div>
            </div>
            <div class="width25 pL20 flex flexAlignItems ">
              <div class="">
                <span>{{ item.matchDegree }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="pL20 borderB titleBg titleFont">
          <strong>不良行为分</strong>
        </div>
        <div class=" borderB titleFont flex ">
          <div class="width25 borderR pL20 ">
            <span>评分</span>
          </div>
          <div class="pL20">
            <span class="" :class="{textRebBg: isScoreScoreRed, textYellowBg: isScoreScoreYellow, textGreenBg: isScoreScoreGreen}">
              {{ publicSecurityInfo.negativeScore.score || '——'}}
            </span>
          </div>
        </div>
        <div class="borderB titleFont titleBg flex">
          <div class="width25 borderR pL20">
            <span>等级</span>
          </div>
          <div class="pL20">
            <span class="" :class="{textRebBg: isScoreLevelRed, textYellowBg: isScoreLevelYellow, textGreenBg: isScoreLevelGreen}">
              {{ publicSecurityInfo.negativeScore.level || '——'}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="baseInfo overdueInfo flex divJump" id="overdueInfo">
      <div class="infoTitle font24">
        网贷逾期信息
      </div>
      <div class="infoBox textL">
        <div class="pL20 borderB titleBg titleFont">
          <strong>逾期信息</strong>
        </div>
        <div class="flex detailList  borderB">
          <div class="pL20 borderR width25">
            <span>是否逾期90天以上</span>
          </div>
          <div class="pL20 ">
            <span class="" :class="{textRebBg: isOverdue90Red, textGreenBg: !isOverdue90Red}">
              {{ overdueInfo.isOverdue90 }}
            </span>
          </div>
        </div>
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width25 ">
            <span>是否逾期180天以上</span>
          </div>
          <div class="pL20 ">
            <span class="" :class="{textRebBg: isOverdue180Red, textGreenBg: !isOverdue180Red}">
              {{ overdueInfo.isOverdue180 }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'PublicSecurityInfo',
  data () {
    return {
      isScoreScoreRed: false, // 控制不良行为评分--评分的背景色 red
      isScoreScoreYellow: false, // 控制不良行为评分--评分的背景色 yellow
      isScoreScoreGreen: false, // 控制不良行为评分--评分的背景色 green
      isScoreLevelRed: false, // 控制不良行为评分--等级的背景色 red
      isScoreLevelYellow: false, // 控制不良行为评分--等级的背景色 yellow
      isScoreLevelGreen: false, // 控制不良行为评分--等级的背景色  green
      isOverdue90Red: false, // 控制逾期信息--评分的背景色
      isOverdue180Red: false // 控制逾期信息--等级的背景色
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      publicSecurityInfo: state => state.baseInfoStore.publicSecurityInfo,
      overdueInfo: state => state.baseInfoStore.overdueInfo
    })
  },
  watch: {
    publicSecurityInfo (publicSecurityInfo) {
      this.styeChange()
    },
    overdueInfo (overdueInfo) {
      this.styeBgChange()
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      // console.log('publicSecurityInfo init')
      this.styeChange()
      this.styeBgChange()
      this.getPublicSecurityInfoTop()
      this.getOverdueInfoTop()
    },
    styeChange () {
      // 不良行为评分 背景颜色 控制
      if (this.publicSecurityInfo.negativeScore.score === '' || this.publicSecurityInfo.negativeScore.score === null) {
        // this.publicSecurityInfo.negativeScore.score = '——'
        this.isScoreScoreRed = false
        this.isScoreScoreYellow = false
        this.isScoreScoreGreen = false
      } else if (this.publicSecurityInfo.negativeScore.score >= 80) {
        this.isScoreScoreRed = true
        this.isScoreScoreYellow = false
        this.isScoreScoreGreen = false
      } else if (this.publicSecurityInfo.negativeScore.score < 80 && this.publicSecurityInfo.negativeScore.score >= 60) {
        this.isScoreScoreRed = false
        this.isScoreScoreYellow = true
        this.isScoreScoreGreen = false
      } else if (this.publicSecurityInfo.negativeScore.score < 60) {
        this.isScoreScoreRed = false
        this.isScoreScoreYellow = false
        this.isScoreScoreGreen = true
      } else {
        // this.publicSecurityInfo.negativeScore.score = '——'
        this.isScoreScoreRed = false
        this.isScoreScoreYellow = false
        this.isScoreScoreGreen = false
      }
      //   //
      if (this.publicSecurityInfo.negativeScore.level === null || this.publicSecurityInfo.negativeScore.level === '') {
        // this.publicSecurityInfo.negativeScore.level = '——'
        this.isScoreLevelRed = false
        this.isScoreLevelYellow = false
        this.isScoreLevelGreen = false
      } else if (this.publicSecurityInfo.negativeScore.level.indexOf('高') > -1) {
        this.isScoreLevelRed = true
        this.isScoreLevelYellow = false
        this.isScoreLevelGreen = false
      } else if (this.publicSecurityInfo.negativeScore.level.indexOf('中') > -1) {
        this.isScoreLevelRed = false
        this.isScoreLevelYellow = true
        this.isScoreLevelGreen = false
      } else if (this.publicSecurityInfo.negativeScore.level.indexOf('低') > -1) {
        this.isScoreLevelRed = false
        this.isScoreLevelYellow = false
        this.isScoreLevelGreen = true
      } else {
        // this.publicSecurityInfo.negativeScore.level = '——'
        this.isScoreLevelRed = false
        this.isScoreLevelYellow = false
        this.isScoreLevelGreen = false
      }
    },
    styeBgChange () {
      // 逾期信息 背景颜色 控制
      if (this.overdueInfo.isOverdue90.indexOf('是') > -1) {
        this.isOverdue90Red = true
      } else if (this.overdueInfo.isOverdue90.indexOf('否') > -1) {
        this.isOverdue90Red = false
      }
      //    //
      if (this.overdueInfo.isOverdue180.indexOf('是') > -1) {
        this.isOverdue180Red = true
      } else if (this.overdueInfo.isOverdue180.indexOf('否') > -1) {
        this.isOverdue180Red = false
      }
    },
    getPublicSecurityInfoTop () {
      console.log('publicSecurityInfo', document.getElementById('publicSecurityInfo').offsetTop)
    },
    getOverdueInfoTop () {
      console.log('overdueInfo', document.getElementById('overdueInfo').offsetTop)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
