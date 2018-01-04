<!-- product引用组件 历史查询信息 wuxiaobo-->
<template>
  <div class="historyInfoWarp ">
    <div class="historyInfo flex">
      <div class="infoTitle font24">
        历史查询信息
      </div>
      <div class="infoBox textL font16">
        <div class="pL20  borderB  titleFont">
          <strong>查询记录</strong>
        </div>
        <div class="titleHeader flex borderB titleBg titleFont">
          <div class="width33 pL20 borderR">
            <span>查询日期</span>
          </div>
          <div class="width33 pL20 borderR">
            <span>机构类型</span>
          </div>
          <div class="width33 pL20 borderR">
            <span>是否本机构</span>
          </div>
        </div>
        <div class="">
          <div class="titleHeader flex borderB titleFont" v-for="item in historyInfo.queryInfo">
            <div class="width33 pL20 borderR flex flexAlignItems ">
              <div>
                <span class="">{{ item.date }}</span>
              </div>
            </div>
            <div class="width33 pL20 borderR flex flexAlignItems ">
              <div class="">
                <span>{{ item.type }}</span>
              </div>
            </div>
            <div class="width33 pL20 borderR titleList">
              <div>
                <span :class="{textRebBg: !item.isLocal}">{{ item.isLocal }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="pL20 borderB titleFont">
          <strong>可疑查询记录</strong>
        </div>
        <div class="">
          <div class="pL20 borderB titleBg titleFont">
            <span>使用过此身份证的其他姓名</span>
          </div>
          <div class=" borderB titleFont">
            <div class="flex">
              <div class="pL20 width50 borderR">
                <span>查询日期</span>
              </div>
              <div class="pL20 width50">
                <span>姓名</span>
              </div>
            </div>
          </div>
          <div class=" borderB titleFont" v-for="item in historyInfo.suspiciousQueryInfo.userIdNumberForName">
            <div class="flex">
              <div class="pL20 width50 borderR">
                <span>{{ item.date }}</span>
              </div>
              <div class="pL20 width50">
                <span>{{ item.personName }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="pL20 borderB titleBg titleFont">
            <span>使用过此身份证的其他手机号</span>
          </div>
          <div class=" borderB titleFont">
            <div class="flex">
              <div class="pL20 width50 borderR">
                <span>查询日期</span>
              </div>
              <div class="pL20 width50">
                <span>手机号</span>
              </div>
            </div>
          </div>
          <div class=" borderB titleFont" v-for="item in historyInfo.suspiciousQueryInfo.userIdNumberForMobile">
            <div class="flex">
              <div class="pL20 width50 borderR">
                <span>{{ item.date }}</span>
              </div>
              <div class="pL20 width50">
                <span>{{ item.mobile }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="pL20 borderB titleBg titleFont">
            <span>使用过此手机号的其他姓名</span>
          </div>
          <div class=" borderB titleFont">
            <div class="flex">
              <div class="pL20 width50 borderR">
                <span>查询日期</span>
              </div>
              <div class="pL20 width50">
                <span>姓名</span>
              </div>
            </div>
          </div>
          <div class=" borderB titleFont" v-for="item in historyInfo.suspiciousQueryInfo.userMobileForName">
            <div class="flex">
              <div class="pL20 width50 borderR">
                <span>{{ item.date }}</span>
              </div>
              <div class="pL20 width50">
                <span>{{ item.personName }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="pL20 borderB titleBg titleFont">
            <span>使用过此手机号的其他身份证</span>
          </div>
          <div class=" borderB titleFont">
            <div class="flex">
              <div class="pL20 width50 borderR">
                <span>查询日期</span>
              </div>
              <div class="pL20 width50">
                <span>身份证号</span>
              </div>
            </div>
          </div>
          <div class=" borderB titleFont" v-for="item in historyInfo.suspiciousQueryInfo.userMobileForIdNumber">
            <div class="flex">
              <div class="pL20 width50 borderR">
                <span>{{ item.date }}</span>
              </div>
              <div class="pL20 width50">
                <span>{{ item.idNumber }}</span>
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
  name: 'BaseInfo',
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
      overdueInfo: state => state.baseInfoStore.overdueInfo,
      historyInfo: state => state.baseInfoStore.historyInfo
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
      console.log('publicSecurityInfo init')
      this.styeChange()
      this.styeBgChange()
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
      console.log('this.isOverdue180Red', this.overdueInfo.isOverdue180.indexOf('是'), this.overdueInfo.isOverdue180.indexOf('否'), this.isOverdue180Red)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
