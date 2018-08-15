<!-- product引用组件 公检法 逾期信息 wuxiaobo-->
<template>
  <div class="">
    <div class="negativeInfo newNegativeInfo">
      <div class="flex font14 borderB " >
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
        <div class=" pL20 borderR flex1 positionR">
          <!-- <span class="textAlignC">{{ item.matchRatio || "——" }}</span> -->
          <span class="textAlignC">{{ item.matchDegree || "——" }}</span>
        </div>
        <div class="pL2 pR10 flexAlignItems flex pointer" @click="moreShowFun()"  v-show="tabIndex === 0 || tabIndex === 2 ||tabIndex === 7">
          <i class="selectDown " v-bind:class="{'selectUp': isMoreShow }"></i>
          <!-- 更多下拉小三角形 -->
        </div>
      </div>
      <div class="customizationBox" v-show="isMoreShow">
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
              <span class="textBox" v-show="item.judgeResult !== '' && item.judgeResult !== null">{{ item.judgeResult }}</span>
              <span v-show="item.judgeResult === '' || item.judgeResult === null" class="textAlignC">——</span>
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
              <span class="textAlignC">
                {{ new Date().getFullYear(item.postTime) + "年" + (new Date().getMonth(item.postTime) + 1) + "月" + new Date().getDate(item.postTime) + "日"|| "——"}}
              </span>
              <!-- <span class="textAlignC">{{ item.postTime || "——"}}</span> -->
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
            <div class="flex1 positionR pL20 positionR borderB overflowAuto" >
              <div class="paddingTop10">{{ item.yiwu || "——"}}</div>
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
              <span>未还/罚息</span>
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
              <span class="textAlignC"  v-if="item.idcardNo">
                {{ item.idcardNo.substring(0, 2) }}
                <span>***********</span>
                {{ item.idcardNo.substring(item.idcardNo.length - 2, item.idcardNo.length) }}
              </span>
              <!-- <span class="textAlignC"  v-if="item.idcardNo && item.idcardNo.length == 18">
                {{ item.idcardNo.substring(0, 2) }}
                <span>**************</span>
                {{ item.idcardNo.substring(item.idcardNo.length - 2, item.idcardNo.length) }}
              </span>
              <span class="textAlignC"  v-if="item.idcardNo && item.idcardNo.length == 15">
                {{ item.idcardNo.substring(0, 2) }}
                <span>***********</span>
                {{ item.idcardNo.substring(item.idcardNo.length - 2, item.idcardNo.length) }}
              </span> -->
              <span class="textAlignC" v-if="item.idcardNo === null || item.idcardNo === ''">——</span>
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
      </div>
    </div>
    <!-- 新的结束 -->
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'PublicSecurityInfo',
  data () {
    return {
      isMoreShow: false,
      listDate: ''
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      modelListTop: state => state.modelListTop
    })
  },
  watch: {},
  mounted () {
    // 钩子函数
    this.init()
    // console.log(this.cpws)
  },
  methods: {
    init () {
      // initial
    },
    timeGetAllModelTop () {
      let vm = this
      setTimeout(function () {
        vm.getAllModelTop()
      }, 600)
    },
    getAllModelTop () {
      for (let i = 0; i < this.modelListTop.length; i++) {
        this.modelListTop[i].topNum = document.getElementById(this.modelListTop[i].modelName).offsetTop
      }
    },
    moreShowFun () {
      this.isMoreShow = !this.isMoreShow
      this.timeGetAllModelTop()
    }
  },
  props: [
    'item', 'tabIndex'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
