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
            <div class="scoreImgBox pL20">
              <div class="scoreDot flex">
                <span class="inBlock" style="margin-left:120px"></span>
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
                <span class="textRebBg">{{item.desc}}</span>
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
                <span class="textYellowBg">{{item.desc}}</span>
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
                <span class="textYellowBg">{{item.desc}}</span>
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
      score: 620,
      prohibitIsShow: false, // 控制禁止规则显示与否
      restrictionIsShow: false, // 控制限制规则显示与否
      promptIsShow: false // 控制提示规则显示与否
    }
  },
  computed: {
    ...mapState({
      // 获取数据
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
      this.emptyDetailsFun()
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
    emptyDetailsFun () {
      console.log(this.restriction.details.length)
      if (this.restriction.details.length === 0) {
        this.restriction.details.ruleName = '————'
        this.restriction.details.desc = '————'
        console.log(this.restriction)
      }
      // for (let i = 0; i < data.length; i++) {
      //   console.log(data[i])
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
