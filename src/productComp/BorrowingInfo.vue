<!-- product引用组件 多头借贷信息 联系人圈子 疑似APP注册  wuxiaobo-->
<template>
  <div class="borrowingInfoWarp ">
    <div class="borrowingInfo flex">
      <div class="infoTitle font24">
        多头借贷信息
      </div>
      <div class="infoBox textL font16 ">
        <div class="flex titleFont">
          <div class="width25 borderR ">
            <div class="pL20 borderB titleBg">
              <span>多头借贷笔数</span>
            </div>
            <div class="pL20 borderB">
              <span>{{ borrowingInfo.borrowingNumber || '——' }}</span>
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
              <span>存放金额(元)</span>
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
        <div class="titleHeader flex borderB titleBg titleFont">
          <div class="width14 pL20 borderR">
            <span>借款类型</span>
          </div>
          <div class="width14 pL20 borderR">
            <span>借款状态</span>
          </div>
          <div class="width14 pL20 borderR">
            <span>借款金额(元)</span>
          </div>
          <div class="width14 pL20 borderR">
            <span>借款日期</span>
          </div>
          <div class="width14 pL20 borderR">
            <span>借款期数</span>
          </div>
          <div class="width14 pL20 borderR">
            <span>还款状态</span>
          </div>
          <div class="width14 pL20">
            <span>逾期金额(元)</span>
          </div>
        </div>
        <div class="titleHeader flex borderB titleFont" v-for="item in borrowingInfo.record">
          <div class="width14 pL20 borderR">
            <span>{{ item.type || '——' }}</span>
          </div>
          <div class="width14 pL20 borderR">
            <span>{{ item.borrowingStatus || '——' }}</span>
          </div>
          <div class="width14 pL20 borderR">
            <span>{{ item.amount || '——' }}</span>
          </div>
          <div class="width14 pL20 borderR">
            <span>{{ item.date || '——' }}</span>
          </div>
          <div class="width14 pL20 borderR">
            <span>{{ item.numberOfPeriods || '——' }}</span>
          </div>
          <div class="width14 pL20 borderR">
            <span :class="{textRebBg: item.overdueAmount > 0}">{{ item.repaymentStatus  || '——'}}</span>
          </div>
          <div class="width14 pL20">
            <span :class="{textRebBg: item.overdueAmount > 0}">{{ item.overdueAmount || '——' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="baseInfo contactsInfo flex">
      <div class="infoTitle font24">
        <div class="">
          联系人圈子
        </div>
        <div class="">
          信息
        </div>
      </div>
      <div class="infoBox  textL">
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width25">
            <span>直接联系人数</span>
          </div>
          <div class="pL20 ">
            <span>{{ contactsInfo.directContacts }}</span>
          </div>
        </div>
        <div class="flex detailList  borderB">
          <div class="pL20 borderR width25">
            <span>直接联系人黑名单数</span>
          </div>
          <div class="pL20 ">
            <span class="textRebBg">{{ contactsInfo.directContactsBlacklist }}</span>
          </div>
        </div>
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width25">
            <span>间接联系人黑名单数</span>
          </div>
          <div class="pL20 ">
            <span class="textRebBg">{{ contactsInfo.indirectContactsBlacklist }}</span>
          </div>
        </div>
        <div class="flex detailList  borderB">
          <div class="pL20 borderR width25">
            <span>联系人圈子评分</span>
          </div>
          <div class="pL20 ">
            <span class="textRebBg">{{ contactsInfo.score }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="baseInfo appInfo flex">
      <div class="infoTitle font24">
        <div class="">
          疑似APP注册
        </div>
        <div class="">
          信息
        </div>
      </div>
      <div class="infoBox textL">
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width25">
            <span>理财APP注册数</span>
          </div>
          <div class="pL20 ">
            <span>{{ appInfo.financialAppCount  || '——'  }}</span>
          </div>
        </div>
        <div class="flex detailList  borderB">
          <div class="pL20 borderR width25">
            <span>贷款APP注册数</span>
          </div>
          <div class="pL20 ">
            <span class="">{{ appInfo.borrowingAppCount || '——' }}</span>
          </div>
        </div>
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width25">
            <span>理财/贷款APP注册数</span>
          </div>
          <div class="pL20 ">
            <span class="">{{ appInfo.financialOrBorrowingAppCount }}</span>
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
    return {}
  },
  computed: {
    ...mapState({
      // 获取数据
      borrowingInfo: state => state.baseInfoStore.borrowingInfo,
      contactsInfo: state => state.baseInfoStore.contactsInfo,
      appInfo: state => state.baseInfoStore.appInfo
    })
  },
  watch: {},
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('borrowingInfo init')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
