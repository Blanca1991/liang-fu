<!-- product引用组件 多头借贷信息 联系人圈子 疑似APP注册  wuxiaobo-->
<template>
  <div class="borrowingInfoWarp ">
    <div class="borrowingInfo flex divJump " id="borrowingInfo">
      <div class="infoTitle font24">
        多头借贷信息
      </div>
      <div class="infoBox textL font16 "  v-if="!! borrowingInfo && JSON.stringify(this.borrowingInfo) != '{}'">
        <div class="flex titleFont">
          <div class="width25 borderR ">
            <div class="pL20 borderB titleBg">
              <span>多头借贷笔数</span>
            </div>
            <div class="pL20 borderB">
              <span v-if="borrowingInfo.borrowingNumber == null || borrowingInfo.borrowingNumber == undefined">——</span>
              <span v-if="borrowingInfo.borrowingNumber">{{ borrowingInfo.borrowingNumber || '——' }}</span>
            </div>
          </div>
          <div class="width25 borderR ">
            <div class="pL20 borderB titleBg">
              <span>申请金额(元)</span>
            </div>
            <div class="pL20 borderB">
              <span>{{ borrowingInfo.applyAmount || '——' }}</span>
            </div>
          </div>
          <div class="width25 borderR ">
            <div class="pL20 borderB titleBg">
              <span>放款金额(元)</span>
            </div>
            <div class="pL20 borderB">
              <span>{{ borrowingInfo.passedAmount || '——' }}</span>
            </div>
          </div>
          <div class="width25 borderR ">
            <div class="pL20 borderB titleBg">
              <span>逾期金额(元)</span>
            </div>
            <div class="pL20 borderB">
              <span class="textRebBg">{{ borrowingInfo.overdueAmount || '——' }}</span>
            </div>
          </div>
        </div>
        <div class="titleHeader flex borderB titleBg titleFont" v-if="borrowingInfo.record && borrowingInfo.record.length > 0 && borrowingInfo.record !== null && borrowingInfo.record != undefined">
          <div class="width14 pL20 borderR">
            <span>借款类型</span>
          </div>
          <div class="width15 pL20 borderR">
            <span>借款状态</span>
          </div>
          <div class="width18 pL20 borderR">
            <span>借款金额(元)</span>
          </div>
          <div class="width14 pL20 borderR">
            <span>借款日期</span>
          </div>
          <div class="width12 pL20 borderR">
            <span>借款期数</span>
          </div>
          <div class="width14 pL20 borderR">
            <span>还款状态</span>
          </div>
          <div class="width14 pL20">
            <span>逾期金额(元)</span>
          </div>
        </div>
        <div class="titleHeader flex borderB titleFont font14" v-for="item in borrowingInfo.record">
          <div class="width14 pL20 borderR ">
            <span>{{ item.type || '——' }}</span>
          </div>
          <div class="width15 pL20 borderR">
            <span>{{ item.borrowingStatus || '——' }}</span>
          </div>
          <div class="width18 pL20 borderR">
            <span>{{ item.amount || '——' }}</span>
          </div>
          <div class="width14 pL20 borderR">
            <span>{{ item.date || '——' }}</span>
          </div>
          <div class="width12 pL20 borderR">
            <span>{{ item.numberOfPeriods || '——' }}</span>
          </div>
          <div class="width14 pL20 borderR">
            <span :class="{textRebBg: item.overdueAmount > 0}">{{ item.repaymentStatus || '——'}}</span>
          </div>
          <div class="width14 pL20">
            <span :class="{textRebBg: item.overdueAmount > 0}">{{ item.overdueAmount || '——' }}</span>
          </div>
        </div>
      </div>
      <div class="infoBox textL font16" v-if="borrowingInfo === null || borrowingInfo == undefined || JSON.stringify(this.borrowingInfo) == '{}'">
        <div class="textL font16 ">
          <div class="flex titleFont">
            <div class="width25 borderR ">
              <div class="pL20 borderB titleBg">
                <span>多头借贷笔数</span>
              </div>
              <div class="pL20 borderB">
                <span>——</span>
              </div>
            </div>
            <div class="width25 borderR ">
              <div class="pL20 borderB titleBg">
                <span>申请金额(元)</span>
              </div>
              <div class="pL20 borderB">
                <span>——</span>
              </div>
            </div>
            <div class="width25 borderR ">
              <div class="pL20 borderB titleBg">
                <span>放款金额(元)</span>
              </div>
              <div class="pL20 borderB">
                <span>——</span>
              </div>
            </div>
            <div class="width25 borderR ">
              <div class="pL20 borderB titleBg">
                <span>逾期金额(元)</span>
              </div>
              <div class="pL20 borderB">
                <span class="">——</span>
              </div>
            </div>
          </div>
          <div class="titleHeader flex borderB titleBg titleFont">
            <div class="width14 pL20 borderR">
              <span>借款类型</span>
            </div>
            <div class="width15 pL20 borderR">
              <span>借款状态</span>
            </div>
            <div class="width14 pL20 borderR">
              <span>借款金额(元)</span>
            </div>
            <div class="width14 pL20 borderR">
              <span>借款日期</span>
            </div>
            <div class="width12 pL20 borderR">
              <span>借款期数</span>
            </div>
            <div class="width14 pL20 borderR">
              <span>还款状态</span>
            </div>
            <div class="width14 pL20">
              <span>逾期金额(元)</span>
            </div>
          </div>
          <div class="titleHeader flex borderB titleFont" >
            <div class="width14 pL20 borderR">
              <span>——</span>
            </div>
            <div class="width15 pL20 borderR">
              <span>——</span>
            </div>
            <div class="width14 pL20 borderR">
              <span>——</span>
            </div>
            <div class="width14 pL20 borderR">
              <span>——</span>
            </div>
            <div class="width12 pL20 borderR">
              <span>——</span>
            </div>
            <div class="width14 pL20 borderR">
              <span>——</span>
            </div>
            <div class="width14 pL20">
              <span >——</span>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="riskListInfo overdueInfo flex divJump " id="riskListInfo">
      <div class="infoTitle font24">
        风险名单信息
      </div>
      <div class="infoBox textL">
        <div class="flex detailList titleBg titleFont font16 borderB" >
          <div class="pL20 borderR width25">
            <span>风险名单类型</span>
          </div>
          <div class="pL20 borderR width20">
            <span>是否命中</span>
          </div>
          <div class="pL20">
            <span>名单细项</span>
          </div>
        </div>
        <div class="flex detailList borderB" v-if="!!riskListInfo && riskListInfo.length > 0" v-for="item in riskListInfo">
          <div class="pL20 borderR width25">
            <span>{{ item.riskListType }}</span>
          </div>
          <div class="pL20 borderR width20">
            <span v-if="!item.hit">——</span>
            <span class="textRebBg" v-if="item.hit && item.hit == '是'">是</span>
            <span class="textGreenBg" v-if="item.hit && item.hit == '否'">否</span>
          </div>
          <div class="pL20">
            <span>{{ item.listDetail || '——'}}</span>
          </div>
        </div>
        <div class="flex detailList borderB" v-if="!riskListInfo || riskListInfo.length == 0" v-for="item in noRiskListInfo">
          <div class="pL20 borderR width25">
            <span>{{ item.riskListType }}</span>
          </div>
          <div class="pL20 borderR width20">
            <span>——</span>
          </div>
          <div class="pL20">
            <span>——</span>
          </div>
        </div>
      </div>
    </div>
    <div class="baseInfo contactsInfo flex divJump" id="contactsInfo">
      <div class="infoTitle font24">
        <div class="">
          联系人圈子
        </div>
        <div class="">
          信息
        </div>
      </div>
      <div class="infoBox  textL">
        <div class="" v-if="!!contactsInfo && contactsInfo != '' && JSON.stringify(contactsInfo) != '{}'">
          <div class="flex detailList titleBg borderB">
            <div class="pL20 borderR width25 font16">
              <span>直接联系人数</span>
            </div>
            <div class="pL20 ">
              <span>{{ contactsInfo.directContacts || '——'}}</span>
            </div>
          </div>
          <div class="flex detailList  borderB">
            <div class="pL20 borderR width25 font16">
              <span>直接联系人黑名单数</span>
            </div>
            <div class="pL20 ">
              <span class="textRebBg">{{ contactsInfo.directContactsBlacklist || '——'}}</span>
            </div>
          </div>
          <div class="flex detailList titleBg borderB">
            <div class="pL20 borderR width25 font16">
              <span>间接联系人黑名单数</span>
            </div>
            <div class="pL20 ">
              <span class="textRebBg">{{ contactsInfo.indirectContactsBlacklist || '——' }}</span>
            </div>
          </div>
          <div class="flex detailList  borderB">
            <div class="pL20 borderR width25 font16">
              <span>联系人圈子评分</span>
            </div>
            <div class="pL20 ">
              <span class="textRebBg">{{ contactsInfo.score || '——' }}</span>
            </div>
          </div>
        </div>
        <div class="" v-if="contactsInfo === null || contactsInfo == undefined || contactsInfo == '' || JSON.stringify(contactsInfo) == '{}'">
          <div class="flex detailList titleBg borderB">
            <div class="pL20 borderR width25 font16">
              <span>直接联系人数</span>
            </div>
            <div class="pL20 ">
              <span>——</span>
            </div>
          </div>
          <div class="flex detailList  borderB">
            <div class="pL20 borderR width25 font16">
              <span>直接联系人黑名单数</span>
            </div>
            <div class="pL20 ">
              <span class="textRebBg">——</span>
            </div>
          </div>
          <div class="flex detailList titleBg borderB">
            <div class="pL20 borderR width25 font16">
              <span>间接联系人黑名单数</span>
            </div>
            <div class="pL20 ">
              <span class="textRebBg">——</span>
            </div>
          </div>
          <div class="flex detailList  borderB">
            <div class="pL20 borderR width25 font16">
              <span>联系人圈子评分</span>
            </div>
            <div class="pL20 ">
              <span class="textRebBg">——</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="baseInfo appInfo flex divJump" id="appInfo">
      <div class="infoTitle font24">
        <div class="">
          疑似APP注册
        </div>
        <div class="">
          信息
        </div>
      </div>
      <div class="infoBox textL">
        <div class="" v-if="!!appInfo && appInfo !== '' && JSON.stringify(appInfo) != '{}'">
          <div class="flex detailList titleBg borderB">
            <div class="pL20 borderR width25 font16">
              <span>理财APP注册数</span>
            </div>
            <div class="pL20 ">
              <span>{{ appInfo.financialAppCount || '——'  }}</span>
            </div>
          </div>
          <div class="flex detailList  borderB">
            <div class="pL20 borderR width25 font16">
              <span>贷款APP注册数</span>
            </div>
            <div class="pL20 ">
              <span class="">{{ appInfo.borrowingAppCount || '——' }}</span>
            </div>
          </div>
          <div class="flex detailList titleBg borderB">
            <div class="pL20 borderR width25 font16">
              <span>理财/贷款APP注册数</span>
            </div>
            <div class="pL20 ">
              <span class="">{{ appInfo.financialOrBorrowingAppCount || '——' }}</span>
            </div>
          </div>
        </div>
        <div class="" v-if="appInfo === null || appInfo == undefined || appInfo === '' || JSON.stringify(appInfo) == '{}'">
          <div class="flex detailList titleBg borderB">
            <div class="pL20 borderR width25 font16">
              <span>理财APP注册数</span>
            </div>
            <div class="pL20 ">
              <span>——</span>
            </div>
          </div>
          <div class="flex detailList  borderB">
            <div class="pL20 borderR width25 font16">
              <span>贷款APP注册数</span>
            </div>
            <div class="pL20 ">
              <span class="">——</span>
            </div>
          </div>
          <div class="flex detailList titleBg borderB">
            <div class="pL20 borderR width25 font16">
              <span>理财/贷款APP注册数</span>
            </div>
            <div class="pL20 ">
              <span class="">——</span>
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
  name: 'BorrowingInfo',
  data () {
    return {
      allHide: false, // false  true-- borrowingInfo == null 或者 undefined
      noRiskListInfo: [ // riskListInfo 为null时渲染
        {
          riskListType: '虚假申请名单',
        },
        {
          riskListType: '逾期不良名单'
        },
        {
          riskListType: '司法高危名单'
        },
        {
          riskListType: '其他风险名单'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      borrowingInfo: state => state.baseInfoStore.borrowingInfo,
      riskListInfo: state => state.baseInfoStore.riskListInfo,
      contactsInfo: state => state.baseInfoStore.contactsInfo,
      appInfo: state => state.baseInfoStore.appInfo
    })
  },
  watch: {
    borrowingInfo (borrowingInfo) {
      this.faultCheck()
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      // console.log('borrowingInfo init')
      this.faultCheck()
    },
    faultCheck () {
      if (JSON.stringify(this.borrowingInfo) === undefined || this.borrowingInfo === null || JSON.stringify(this.borrowingInfo) == '{}') {
        this.allHide = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
