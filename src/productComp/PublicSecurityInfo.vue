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
        <div class="" >
          <div class=" borderB titleFont flex " v-if="!!badbehaviorInfo && badbehaviorInfo !== ''">
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
                <span class="" v-show="!badbehaviorInfo.type  || badbehaviorInfo.type === '' ">——</span>
              </div>
            </div>
            <div class="flex width50">
              <div class="width20 borderR pL20 titleBg">
                <span>等级</span>
              </div>
              <div class="pL20 flex1">
                <span class="" v-show="badbehaviorInfo.level && badbehaviorInfo.level !== '' "  :class="{textRebBg: badbehaviorInfo.type === '2' || '3' || '4',
                textYellowBg: badbehaviorInfo.type === '1', textGreenBg: badbehaviorInfo.type === '0'}">
                  {{ badbehaviorInfo.level}}
                </span>
                <span v-show="!badbehaviorInfo.level || badbehaviorInfo.level === ''">——</span>
              </div>
            </div>
          </div>
        </div>
        <div class=" borderB titleFont flex " v-if="!badbehaviorInfo || badbehaviorInfo === ''">
          <div class="flex width50">
            <div class="width20 borderR pL20 titleBg">
              <span>类型</span>
            </div>
            <div class="pL20 flex1 borderR">
              <span>——</span>
            </div>
          </div>
          <div class="flex width50">
            <div class="width20 borderR pL20 titleBg">
              <span>等级</span>
            </div>
            <div class="pL20 flex1">
              <span >——</span>
            </div>
          </div>
        </div>
        <div class="pL20 titleBg borderB  titleFont" v-if="allTabHide">
          <strong>司法负面信息</strong>
        </div>
        <div class="titleHeader flex borderB titleFont titleBg pubilceBox" v-if="allTabHide">
          <div class="pL20 width12 borderR pointer" :class="{tabIsActive: tabIndex === index}" v-for="(item, index) in tabTitleList" @click="changeTab(index)" v-if="item.nameDate">
            <span >{{ item.name }}</span>
            <em class="trigon" v-if="index === tabIndex"></em>
          </div>
        </div>
        <div class="titleHeader flex borderB titleFont pubilce titleBg" v-if="allTabHide">
          <div class="width18 pL20 borderR">
            <span>日期</span>
          </div>
          <div class="width20 pL20 borderR">
            <span>法院</span>
          </div>
          <div class="width20 pL20 borderR">
            <span>案号</span>
          </div>
          <div class="pL20 borderR width15">
            <span v-if="tabIndex === 0 || tabIndex === 4">案由</span>
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
          <div class="pL20 " v-if="!!overdueInfo  && overdueInfo !==''">
            <span class="" :class="{textRebBg: isOverdue90Red, textGreenBg: !isOverdue90Red}" v-if="overdueInfo.isOverdue90 && overdueInfo.isOverdue90 !== ''">
              {{ overdueInfo.isOverdue90}}
            </span>
            <span v-if="!overdueInfo.isOverdue90 || overdueInfo.isOverdue90 == ''">——</span>
          </div>
          <div class="pL20 " v-if="!overdueInfo">
            <span class="" >——</span>
          </div>
        </div>
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width25 ">
            <span>是否逾期180天以上</span>
          </div>
          <div class="pL20 " v-if="!!overdueInfo  && overdueInfo !==''">
            <span class="" :class="{textRebBg: isOverdue180Red, textGreenBg: !isOverdue180Red}" v-if="!!overdueInfo.isOverdue180 && overdueInfo.isOverdue180 !==''">
              {{ overdueInfo.isOverdue180 }}
            </span>
            <span class="" v-if="!overdueInfo.isOverdue180 || overdueInfo.isOverdue180 === ''" >——</span>
          </div>
          <div class="pL20 " v-if="!overdueInfo">
            <span class="" >——</span>
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
      allTabHide: true, // 控制 比如一个也没返回 则全部隐藏掉
      isScoreScoreRed: false, // 控制不良行为评分--评分的背景色 red
      isScoreScoreYellow: false, // 控制不良行为评分--评分的背景色 yellow
      isScoreScoreGreen: false, // 控制不良行为评分--评分的背景色 green
      isScoreLevelRed: false, // 控制不良行为评分--等级的背景色 red
      isScoreLevelYellow: false, // 控制不良行为评分--等级的背景色 yellow
      isScoreLevelGreen: false, // 控制不良行为评分--等级的背景色  green
      isOverdue90Red: false, // 控制逾期信息--评分的背景色
      isOverdue180Red: false, // 控制逾期信息--等级的背景色
      tabTitleList: [
        {
          name: '裁判文书',
          nameDate: true
        },
        {
          name: '执行公告',
          nameDate: true
        },
        {
          name: '失信公告',
          nameDate: true
        },
        {
          name: '法院公告',
          nameDate: true
        },
        {
          name: '开庭公告',
          nameDate: true
        },
        {
          name: '案件流程',
          nameDate: true
        },
        {
          name: '曝光台',
          nameDate: true
        },
        {
          name: '网贷黑名单',
          nameDate: true
        }
      ],
      tabIndex: 0,
      listDate: '',
      cpws: { },
      zxgg: { },
      shixin: { },
      fygg: { },
      ktgg: { },
      ajlc: { },
      bgt: { },
      wdhmd: { },
      badbehaviorInfo: {},
      publicStoreHide: false //
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      // 网贷逾期信息
      overdueInfo: state => state.baseInfoStore.overdueInfo,
      publicSecurityInfoNew: state => state.publicStore.publicSecurityInfoNew,
      // badbehaviorInfo: state => state.publicStore.publicSecurityInfoNew.badbehaviorInfo,
      // cpws: state => state.publicStore.publicSecurityInfoNew.negativeList.cpws,
      // zxgg: state => state.publicStore.publicSecurityInfoNew.negativeList.zxgg,
      // shixin: state => state.publicStore.publicSecurityInfoNew.negativeList.shixin,
      // fygg: state => state.publicStore.publicSecurityInfoNew.negativeList.fygg,
      // ktgg: state => state.publicStore.publicSecurityInfoNew.negativeList.ktgg,
      // ajlc: state => state.publicStore.publicSecurityInfoNew.negativeList.ajlc,
      // bgt: state => state.publicStore.publicSecurityInfoNew.negativeList.bgt,
      // wdhmd: state => state.publicStore.publicSecurityInfoNew.negativeList.wdhmd,
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
      // console.log('state', this.$store.state)
      this.blankInfoFun()
      this.listDate = this.cpws
      this.timeGetAllModelTop()
      this.tabHide()
      this.getTabIndex()
    },
    blankInfoFun () {
      if (!this.publicSecurityInfoNew || JSON.stringify(this.publicSecurityInfoNew) == '{}') {
        this.publicStoreHide = true
        this.badbehaviorInfo = {
          type: null, // 0 低风险 1中  234 高风险  0：无； 1：前科；2：涉案；3：犯罪嫌疑人 ；4：吸毒
          level: null
        }
        this.allTabHide = false
      } else {
        this.publicStoreHide = false
        this.badbehaviorInfo = this.publicSecurityInfoNew.badbehaviorInfo
        let negativeList = this.publicSecurityInfoNew.negativeList
        if (!negativeList || JSON.stringify(negativeList) == '{}') {
          this.allTabHide = false
        } else {
          this.allTabHide = true
          this.cpws = negativeList.cpws
          this.zxgg = negativeList.zxgg
          this.shixin = negativeList.shixin
          this.fygg = negativeList.fygg
          this.ktgg = negativeList.ktgg
          this.ajlc = negativeList.ajlc
          this.bgt = negativeList.bgt
          this.wdhmd = negativeList.wdhmd
        }
      }
    },
    getTabIndex () {
      // 确定哪个 tab 被选中
      if (this.cpws && this.cpws !== '') {
        this.tabIndex = 0
      } else if (this.zxgg && this.cpws !== '') {
        this.tabIndex = 1
        this.listDate = this.zxgg
      } else if (this.shixin && this.shixin !== '') {
        this.tabIndex = 2
        this.listDate = this.shixin
      } else if (this.fygg && this.fygg !== '') {
        this.tabIndex = 3
        this.listDate = this.fygg
      } else if (this.ktgg && this.ktgg !== '') {
        this.tabIndex = 4
        this.listDate = this.ktgg
      } else if (this.ajlc && this.ajlc !== '') {
        this.tabIndex = 5
        this.listDate = this.ajlc
      } else if (this.bgt && this.bgt !== '') {
        this.tabIndex = 6
        this.listDate = this.bgt
      } else if (this.wdhmd && this.wdhmd !== '') {
        this.tabIndex = 7
        this.listDate = this.wdhmd
      }
    },
    tabHide () {
      // 返回的数据为空的时候 要隐藏掉他的tab
      let tabTitleList = this.tabTitleList
      if (this.cpws === undefined) {
        tabTitleList[0].nameDate = false
      } else {
        tabTitleList[0].nameDate = true
      }
      if (this.zxgg === undefined) {
        tabTitleList[1].nameDate = false
      } else {
        tabTitleList[1].nameDate = true
      }
      if (this.shixin === undefined) {
        tabTitleList[2].nameDate = false
      } else {
        tabTitleList[2].nameDate = true
      }
      if (this.fygg === undefined) {
        tabTitleList[3].nameDate = false
      } else {
        tabTitleList[3].nameDate = true
      }
      if (this.ktgg === undefined) {
        tabTitleList[4].nameDate = false
      } else {
        tabTitleList[4].nameDate = true
      }
      if (this.ajlc === undefined) {
        tabTitleList[5].nameDate = false
      } else {
        tabTitleList[5].nameDate = true
      }
      if (this.bgt === undefined) {
        tabTitleList[6].nameDate = false
      } else {
        tabTitleList[6].nameDate = true
      }
      if (this.wdhmd === undefined) {
        tabTitleList[7].nameDate = false
      } else {
        tabTitleList[7].nameDate = true
      }
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
