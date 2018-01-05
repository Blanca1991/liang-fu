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
                <span v-if="item.isLocal === 'true'">是</span>
                <span :class="{textRebBg: item.isLocal === 'false'}" v-if="item.isLocal === 'false'">否</span>
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
                <span v-if="item.personName.length === 2">{{ item.personName.substr(0,1) + '*' }}</span>
                <span v-if="item.personName.length === 3">{{ item.personName.substr(0,1) + '*' + item.personName.substr(-1) }}</span>
                <span v-if="item.personName.length === 4">{{ item.personName.substr(0,1) + '*' + item.personName.substr(-2) }}</span>
              </div>
            </div>
          </div>
          <div class="flex titleFont" v-if="userIdNumberForName">
            <div class="pL20 width50 borderR borderB">
              <span>——</span>
              </div>
            <div class="pL20 width50 borderB">
              <span>——</span>
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
                <span>{{ item.mobile.replace(item.mobile.substring(3,9), '*******') }}</span>
              </div>
            </div>
          </div>
          <div class="flex titleFont" v-if="userIdNumberForMobile">
            <div class="pL20 width50 borderR borderB">
              <span>——</span>
              </div>
            <div class="pL20 width50 borderB">
              <span>——</span>
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
                <span v-if="item.personName.length === 2">{{ item.personName.substr(0,1) + '*' }}</span>
                <span v-if="item.personName.length === 3">{{ item.personName.substr(0,1) + '*' + item.personName.substr(-1) }}</span>
                <span v-if="item.personName.length === 4">{{ item.personName.substr(0,1) + '*' + item.personName.substr(-2) }}</span>
              </div>
            </div>
          </div>
          <div class="flex titleFont" v-if="userMobileForName">
            <div class="pL20 width50 borderR borderB">
              <span>——</span>
              </div>
            <div class="pL20 width50 borderB">
              <span>——</span>
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
                <span>{{ item.idNumber.substr(0, 2)+ '***********'+ item.idNumber.substr(item.idNumber.length- 2, 2) }}</span>
              </div>
            </div>
          </div>
          <div class="flex titleFont" v-if="userMobileForIdNumber">
            <div class="pL20 width50 borderR borderB">
              <span>——</span>
              </div>
            <div class="pL20 width50 borderB">
              <span>——</span>
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
  name: 'HistoryInfo',
  data () {
    return {
      userIdNumberForName: false,
      userIdNumberForMobile: false,
      userMobileForName: false,
      userMobileForIdNumber: false
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      historyInfo: state => state.baseInfoStore.historyInfo
    })
  },
  watch: {
    historyInfo (historyInfo) {
      this.emptyListChange()
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('historyInfo init')
      this.emptyListChange()
    },
    emptyListChange () {
      for (let key in this.historyInfo.suspiciousQueryInfo) {
        if (this.historyInfo.suspiciousQueryInfo[key] === null) {
          this[key] = true
        } else if (this.historyInfo.suspiciousQueryInfo[key] === '') {
          this[key] = true
        } else {
          this.historyInfo.suspiciousQueryInfo[key] = this.historyInfo.suspiciousQueryInfo[key].reverse()
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
