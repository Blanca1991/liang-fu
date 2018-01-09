<!-- product引用组件 总体评分 wuxiaobo-->
<template>
  <div class="summaryInfoWarp ">
    <div class="summaryInfo flex divJump" id="summaryInfo">
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
              <div class="ruleTitleR textL pL20 flex pointer" @click="toggleList('prohibitoryInfo')">
                <span>{{prohibitoryInfo.num}} 条</span>
                <i class="selectDown " v-bind:class="{'selectUp': prohibitoryInfoIsShow}"></i>
              </div>
            </div>
            <div class="flex detailList borderT" v-if="prohibitoryInfoIsShow" v-for="item in prohibitoryInfo.detail">
              <div class="textL pL20 detailListL borderR">
                <span>{{item.ruleName}}</span>
              </div>
              <div class="textL pL20 ">
                <span :class="{textRebBg: prohibitoryInfo.num !== '0'}">{{item.desc}}</span>
              </div>
            </div>
          </div>
          <div class="infoList">
            <div class="ruleTitle borderT flex">
              <div class="ruleTitleL textL borderR pL20">
                <strong>触发限制性规则</strong>
              </div>
              <div class="ruleTitleR textL pL20 flex pointer" @click="toggleList('restrictedInfo')">
                <span>{{restrictedInfo.num}} 条</span>
                <i class="selectDown " v-bind:class="{'selectUp': restrictedInfoIsShow}"></i>
              </div>
            </div>
            <div class="flex detailList borderT" v-if="restrictedInfoIsShow" v-for="item in restrictedInfo.detail">
              <div class="textL pL20 detailListL borderR">
                <span>{{item.ruleName}}</span>
              </div>
              <div class="textL pL20 ">
                <span :class="{textYellowBg: restrictedInfo.num !=='0'}">{{item.desc}}</span>
              </div>
            </div>
          </div><div class="infoList">
            <div class="ruleTitle borderT flex">
              <div class="ruleTitleL textL borderR pL20">
                <strong>触发提示性规则</strong>
              </div>
              <div class="ruleTitleR textL pL20 flex pointer" @click="toggleList('riskWarningInfo')">
                <span>{{riskWarningInfo.num}} 条</span>
                <i class="selectDown " v-bind:class="{'selectUp': riskWarningInfoIsShow}"></i>
              </div>
            </div>
            <div class="flex detailList borderT" v-if="riskWarningInfoIsShow" v-for="item in riskWarningInfo.detail">
              <div class="textL pL20 detailListL borderR">
                <span>{{item.ruleName}}</span>
              </div>
              <div class="textL pL20 ">
                <span :class="{textYellowBg: riskWarningInfo.num !=='0'}">{{item.desc}}</span>
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
      prohibitoryInfoIsShow: false, // 控制禁止规则显示与否
      restrictedInfoIsShow: false, // 控制限制规则显示与否
      riskWarningInfoIsShow: false // 控制提示规则显示与否
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      score: state => state.summaryInfoStore.score,
      prohibitoryInfo: state => state.summaryInfoStore.prohibitoryInfo,
      restrictedInfo: state => state.summaryInfoStore.restrictedInfo,
      riskWarningInfo: state => state.summaryInfoStore.riskWarningInfo,
      modelListTop: state => state.modelListTop
    })
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  watch: {
    restrictedInfo (newrestrictedInfo) {
      this.emptyDetailFun(newrestrictedInfo)
      this.listReverse()
      this.getAllModelTop()
    },
    score (newrestrictedInfo) {
      this.scoreStyleFun()
      this.getAllModelTop()
    },
    prohibitoryInfo (newprohibitoryInfo) {
      this.emptyDetailFun(newprohibitoryInfo)
      this.getAllModelTop()
    },
    riskWarningInfo (newriskWarningInfo) {
      this.emptyDetailFun(newriskWarningInfo)
      this.getAllModelTop()
    }
  },
  methods: {
    init () {
      // 初始化
      // console.log('summaryInfo init')
      this.scoreStyleFun()
      this.listReverse()
      this.getAllModelTop()
      // console.log(document.getElementById('baseInfo').offsetTop)
    },
    listReverse () {
      // 数组反向 循环
      this.prohibitoryInfo.detail = this.prohibitoryInfo.detail.reverse()
      this.restrictedInfo.detail = this.restrictedInfo.detail.reverse()
      this.riskWarningInfo.detail = this.riskWarningInfo.detail.reverse()
    },
    getAllModelTop () {
      for (let i = 0; i < this.modelListTop.length; i++) {
        this.modelListTop[i].topNum = document.getElementById(this.modelListTop[i].modelName).offsetTop
      }
    },
    toggleList (data) {
      // 点击切换显示和隐藏
      let vm = this
      setTimeout(function () {
        // 修改因 折叠受到影响的 接下来的模块的top
        vm.getAllModelTop()
        // console.log(document.getElementById('baseInfo').offsetTop)
      }, 100)
      switch (data) {
        case 'prohibitoryInfo':
          this.prohibitoryInfoIsShow = !this.prohibitoryInfoIsShow
          break
        case 'restrictedInfo':
          this.restrictedInfoIsShow = !this.restrictedInfoIsShow
          break
        case 'riskWarningInfo':
          this.riskWarningInfoIsShow = !this.riskWarningInfoIsShow
          break
        default:
      }
    },
    emptyDetailFun (data) {
      if (data.detail.length === 0) {
        data.detail.push({ruleName: '——', desc: '——'})
      }
    },
    scoreStyleFun () {
      if (this.score === null || this.score === '') {
        this.$store.state.summaryInfoStore.score = '暂无数据'
        // console.log(this)
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
