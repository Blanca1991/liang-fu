<!-- product引用组件 公检法 逾期信息 wuxiaobo-->
<template>
  <div class="publicSecurityInfoWarp ">
    <div class="publicSecurityInfo flex divJump" id="publicSecurityInfo">
      <div class="infoTitle font24">
        公检法信息
      </div>
      <div class="infoBox textL font16">
        <div class="pL20 borderB titleBg titleFont">
          <strong>不良行为分</strong>
        </div>
        <div class=" borderB titleFont flex ">
          <div class="flex width50">
            <div class="width20 borderR pL20 titleBg">
              <span>类型</span>
            </div>
            <div class="pL20 flex1 borderR">
              <span class="textGreenBg" v-show="badbehaviorInfo.type === '0' ">0</span>
              <span class="textYellowBg" v-show="badbehaviorInfo.type === '1' ">1</span>
              <span class="textRebBg" v-show="badbehaviorInfo.type === '2' ">2</span>
              <span class="textRebBg" v-show="badbehaviorInfo.type === '3' ">3</span>
              <span class="textRebBg" v-show="badbehaviorInfo.type === '4' ">4</span>
              <span class="" v-show="badbehaviorInfo.type === '' || null ">——</span>
            </div>
          </div>
          <div class="flex width50">
            <div class="width20 borderR pL20 titleBg">
              <span>等级</span>
            </div>
            <div class="pL20 flex1">
              <span class="" v-show="badbehaviorInfo.level !== '' && badbehaviorInfo.level !== null "  :class="{textRebBg: badbehaviorInfo.type === '2' || '3' || '4',
              textYellowBg: badbehaviorInfo.type === '1', textGreenBg: badbehaviorInfo.type === '0'}">
                {{ badbehaviorInfo.level}}
              </span>
              <span v-show="badbehaviorInfo.level === null || badbehaviorInfo.level === ''">——</span>
            </div>
          </div>
        </div>
        <div class="pL20 titleBg borderB  titleFont">
          <strong>司法负面信息</strong>
        </div>
        <div class="titleHeader flex borderB titleFont titleBg">
          <div class="width12 pL20 borderR pointer" :class="{tabIsActive: tabIndex === index}"
          v-for="(item, index) in tabTitleList" @click="changeTab(index)">
            <span>{{ item }}</span>
            <em class="trigon" v-if="index === tabIndex"></em>
          </div>
        </div>
        <div class="titleHeader flex borderB titleFont pubilce titleBg">
          <div class="width18 pL20 borderR">
            <span>日期</span>
          </div>
          <div class="width20 pL20 borderR">
            <span>法院</span>
          </div>
          <div class="width20 pL20 borderR">
            <span>依据案号</span>
          </div>
          <div class="pL20 borderR width15">
            <span v-if="tabIndex === 0 || tabIndex === 4">依据案由</span>
            <span v-if="tabIndex === 1">执行标的</span>
            <span v-if="tabIndex === 2">履行情况</span>
            <span v-if="tabIndex === 3">公告类型</span>
            <span v-if="tabIndex === 5">案件流程状态</span>
            <span v-if="tabIndex === 6">标的金额</span>
            <span v-if="tabIndex === 7">本金/本息</span>
          </div>
          <div class=" pL20 borderR width1212">
            <span>当事人身份</span>
          </div>
          <div class=" pL20 borderR flex1">
            <span>匹配度</span>
          </div>
          <div class="pL10 pR10" v-show="tabIndex === 0 || tabIndex === 2 ||tabIndex === 7">
            <span>更多</span>
          </div>
        </div>
        <div class="negativeInfo newNegativeInfo" v-for="(item, index) in listDate" >
          <ToogleList :item="item" :tabIndex="tabIndex" />
          <!-- <div class="flex font14 borderB " >
            <div class="width18 pL20 pR10 borderR pTB positionR">
              <span class="textAlignC">{{ item.sortTimeString  || "——"}}</span>
            </div>
            <div class="width20 pL20 pR10 borderR pTB positionR">
              <span class="textAlignC">{{ item.court  || "——"}}</span>
            </div>
            <div class="width20 pL20 pR10 borderR pTB">
              {{ item.caseNo  || "——"}}
            </div>
            <div class="pL20 borderR width15 positionR">
              <span class="textAlignC" v-if="tabIndex === 0 || tabIndex === 4">{{ item.caseCause || "——" }}</span>
              <span class="textAlignC" v-if="tabIndex === 1">{{ item.execMoney || "——" }}</span>
              <span class="textAlignC" v-if="tabIndex === 2">{{ item.lxqk || "——" }}</span>
              <span class="textAlignC" v-if="tabIndex === 3">{{ item.ggType || "——" }}</span>
              <span class="textAlignC" v-if="tabIndex === 5">{{ item.ajlcStatus || "——" }}</span>
              <span class="textAlignC" v-if="tabIndex === 6">{{ item.execMoney || "——" }}</span>
              <span class="textAlignC" v-if="tabIndex === 7">{{ item.bjbx || "——" }}</span>
            </div>
            <div class=" pL20 borderR width1212 positionR">
              <span class="textAlignC">{{ item.partyIdentity || "——"}}</span>
            </div>
            <div class=" pL20 borderR width9 positionR">
              <span class="textAlignC">{{ item.matchRatio || "——" }}</span>
            </div>
            <div class=" flex1 flexAlignItems flex pointer" >
              <i class="selectDown " v-bind:class="{'selectUp': false }"></i>
            </div>
          </div> -->
          <!-- <div class="customizationBox">
            <div class="cpws" v-show="tabIndex ===0">
              <div class="flex newNegativeInfo" >
                <div class="width18 borderR titleBg pL20 borderB titleFont">
                  标题
                </div>
                <div class="flex1 borderB pL20 positionR">
                  <span class="textAlignC">{{ item.title || "——"}}</span>
                </div>
              </div>
              <div class="flex newNegativeInfo">
                <div class="width18 borderR titleBg pL20 borderB titleFont ">
                  <span>结果</span>
                </div>
                <div class="flex1 positionR pL20 positionR borderB" >
                  <span class="textAlignC">{{ item.judgeResult || "——"}}</span>
                </div>
              </div>
            </div>
            <div class="shixin" v-show="tabIndex === 2">
              <div class="flex newNegativeInfo">
                <div class="width18 borderR titleBg pL20 borderB titleFont ">
                  <span>省份</span>
                </div>
                <div class="flex1 positionR pL20 positionR borderB" >
                  <span class="textAlignC">{{ item.province || "——"}}</span>
                </div>
              </div>
              <div class="flex newNegativeInfo">
                <div class="width18 borderR titleBg pL20 borderB titleFont ">
                  <span>案号</span>
                </div>
                <div class="flex1 positionR pL20 positionR borderB" >
                  <span class="textAlignC">{{ item.yjCode || "——"}}</span>
                </div>
              </div>
              <div class="flex newNegativeInfo">
                <div class="width18 borderR titleBg pL20 borderB titleFont ">
                  <span>发布时间</span>
                </div>
                <div class="flex1 positionR pL20 positionR borderB" >
                  <span class="textAlignC">{{ item.postTime || "——"}}</span>
                </div>
              </div>
              <div class="flex newNegativeInfo">
                <div class="width18 borderR titleBg pL20 borderB titleFont ">
                  <span>做出行政依据单位</span>
                </div>
                <div class="flex1 positionR pL20 positionR borderB" >
                  <span class="textAlignC">{{ item.yjdw || "——"}}</span>
                </div>
              </div>
              <div class="flex newNegativeInfo">
                <div class="width18 borderR titleBg pL20 borderB titleFont ">
                  <span>失信被执行人行为具体情形</span>
                </div>
                <div class="flex1 positionR pL20 positionR borderB" >
                  <span class="textAlignC">{{ item.jtqx || "——"}}</span>
                </div>
              </div>
              <div class="flex newNegativeInfo">
                <div class="width18 borderR titleBg pL20 borderB titleFont ">
                  <span>生效法律文书确定的义务</span>
                </div>
                <div class="flex1 positionR pL20 positionR borderB" >
                  <span class="textAlignC">{{ item.yiwu || "——"}}</span>
                </div>
              </div>
            </div>
            <div class="wdhmd"  v-show="tabIndex === 7">
              <div class="flex newNegativeInfo">
                <div class="width18 borderR titleBg pL20 borderB titleFont ">
                  <span>信息更新时间</span>
                </div>
                <div class="flex1 positionR pL20 positionR borderB" >
                  <span class="textAlignC">{{ item.updateTime || "——"}}</span>
                </div>
              </div>
              <div class="flex newNegativeInfo">
                <div class="width18 borderR titleBg pL20 borderB titleFont ">
                  <span>已还金额</span>
                </div>
                <div class="flex1 positionR pL20 positionR borderB" >
                  <span class="textAlignC">{{ item.yhje || "——"}}</span>
                </div>
              </div>
              <div class="flex newNegativeInfo">
                <div class="width18 borderR titleBg pL20 borderB titleFont ">
                  <span>未还/返息</span>
                </div>
                <div class="flex1 positionR pL20 positionR borderB" >
                  <span class="textAlignC">{{ item.whfx || "——"}}</span>
                </div>
              </div>
              <div class="flex newNegativeInfo">
                <div class="width18 borderR titleBg pL20 borderB titleFont ">
                  <span>身份证号</span>
                </div>
                <div class="flex1 positionR pL20 positionR borderB" >
                  <span class="textAlignC">{{ item.idcardNo || "——"}}</span>
                </div>
              </div>
              <div class="flex newNegativeInfo">
                <div class="width18 borderR titleBg pL20 borderB titleFont ">
                  <span>数据来源单位名称</span>
                </div>
                <div class="flex1 positionR pL20 positionR borderB" >
                  <span class="textAlignC">{{ item.datasource || "——"}}</span>
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <!-- 新的结束 -->

        <!-- 旧的 -->
        <!-- <div class="negativeInfo">
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
                <span>{{ item.title || '——' }}</span>
              </div>
            </div>
            <div class="width25 pL20 flex flexAlignItems ">
              <div class="">
                <span>{{ item.matchDegree }}</span>
              </div>
            </div>
          </div>
        </div> -->
        <!-- 旧的 -->
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
import ToogleList from '@/productComp/ToogleList'

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
      isOverdue180Red: false, // 控制逾期信息--等级的背景色
      tabTitleList: [
        '裁判文书',
        '执行公告',
        '失信公告',
        '法院公告',
        '开庭公告',
        '案件流程',
        '曝光台',
        '网贷黑名单'
      ],
      tabIndex: 0,
      listDate: ''
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      overdueInfo: state => state.baseInfoStore.overdueInfo,
      publicSecurityInfoNew: state => state.publicStore.publicSecurityInfoNew,
      badbehaviorInfo: state => state.publicStore.publicSecurityInfoNew.badbehaviorInfo,
      cpws: state => state.publicStore.publicSecurityInfoNew.negativeList.cpws,
      zxgg: state => state.publicStore.publicSecurityInfoNew.negativeList.zxgg,
      shixin: state => state.publicStore.publicSecurityInfoNew.negativeList.shixin,
      fygg: state => state.publicStore.publicSecurityInfoNew.negativeList.fygg,
      ktgg: state => state.publicStore.publicSecurityInfoNew.negativeList.ktgg,
      ajlc: state => state.publicStore.publicSecurityInfoNew.negativeList.ajlc,
      bgt: state => state.publicStore.publicSecurityInfoNew.negativeList.bgt,
      wdhmd: state => state.publicStore.publicSecurityInfoNew.negativeList.wdhmd,
      modelListTop: state => state.modelListTop
    })
  },
  watch: {
    publicSecurityInfoNew (publicSecurityInfoNew) {
      this.init()
    },
    overdueInfo (overdueInfo) {
      this.styeBgChange()
    }
  },
  mounted () {
    // 钩子函数
    this.init()
    // console.log(this.cpws)
  },
  methods: {
    init () {
      // 初始化
      // console.log('publicSecurityInfo init')
      // this.styeChange()
      // this.styeBgChange()
      console.log('state', this.$store.state)
      this.listDate = this.cpws
      this.timeGetAllModelTop()
    },
    timeGetAllModelTop () {
      let vm = this
      setTimeout(function () {
        vm.getAllModelTop()
      }, 600)
    },
    changeTab (index) {
      // console.log(index)
      this.tabIndex = index
      switch (index) {
        case 0:
          this.listDate = this.cpws
          break
        case 1:
          this.listDate = this.zxgg
          break
        case 2:
          this.listDate = this.shixin
          break
        case 3:
          this.listDate = this.fygg
          break
        case 4:
          this.listDate = this.ktgg
          break
        case 5:
          this.listDate = this.ajlc
          break
        case 6:
          this.listDate = this.bgt
          break
        case 7:
          this.listDate = this.wdhmd
          break
        default:
      }
      this.timeGetAllModelTop()
    },
    getAllModelTop () {
      for (let i = 0; i < this.modelListTop.length; i++) {
        this.modelListTop[i].topNum = document.getElementById(this.modelListTop[i].modelName).offsetTop
      }
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
    }
  },
  components: {
    ToogleList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
