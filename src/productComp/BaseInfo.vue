<!-- product引用组件 基本身份信息 + 运营商信息 wuxiaobo-->
<template>
  <div class="baseInfoWarp ">
    <div class="baseInfo flex">
      <div class="infoTitle font24">
        基本身份信息
      </div>
      <div class="infoBox textL">
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width18">
            <span>姓名</span>
          </div>
          <div class="pL20 width18">
            <span>{{ baseInfo.name.replace(baseInfo.name.substring(1,2), '*') }}</span>
          </div>
          <div class="pR20 borderR width20 textR">
            <span>身份证号</span>
          </div>
          <div class="pL20">
            <span>{{ baseInfo.idNumber.substr(0, 2)+ '***********'+ baseInfo.idNumber.substr(baseInfo.idNumber.length- 2, 2) }}</span>
          </div>
        </div>
        <div class="flex detailList borderB">
          <div class="pL20 borderR width18 ">
            <span>年龄</span>
          </div>
          <div class="pL20 width18">
            <span>{{ baseInfo.age }}</span>
          </div>
          <div class="pR20 borderR width20 textR">
            <span>身份证所在地</span>
          </div>
          <div class="pL20">
            <span class="fontGreenColor">{{ baseInfo.idNumberOwnership }}</span>
          </div>
        </div>
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width18">
            <span>性别</span>
          </div>
          <div class="pL20 width18">
            <span>{{ baseInfo.sex }}</span>
          </div>
          <div class="pR20 borderR width20 textR">
            <span>身份证符合编码规则</span>
          </div>
          <div class="pL20">
            <span :class="{ textRebBg: isIdNumberCheck ,textGreenBg: !isIdNumberCheck}">
            {{ baseInfo.idNumberCheck }}
            </span>
          </div>
        </div>
        <div class="flex detailList borderB">
          <div class="pL20 borderR width18">
            <span>姓名与身份证匹配</span>
          </div>
          <div class="pL20" >
            <span :class="{ textRebBg: isNameMatchIdNumber,textGreenBg: !isNameMatchIdNumber}">
            {{ baseInfo.nameMatchIdNumber }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="baseInfo telecomInfo flex">
      <div class="infoTitle font24">
        运营商信息
      </div>
      <div class="infoBox textL">
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width18">
            <span>手机号</span>
          </div>
          <div class="pL20 width18">
            <span>{{ telecomInfo.mobileNo.replace(telecomInfo.mobileNo.substring(3,9), '*******') }}</span>
          </div>
          <div class="pR20 borderR width20 textR">
            <span>运营商类别</span>
          </div>
          <div class="pL20">
            <span>{{ telecomInfo.type }}</span>
          </div>
        </div>
        <div class="flex detailList borderB">
          <div class="pL20 borderR width18 ">
            <span>号码归属地</span>
          </div>
          <div class="pL20 width18">
            <span class="fontGreenColor">{{ telecomInfo.mobileOwnership }}</span>
          </div>
          <div class="pR20 borderR width20 textR">
            <span>入网时长</span>
          </div>
          <div class="pL20">
            <span>{{ telecomInfo.inTime }}</span>
          </div>
        </div>
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width18">
            <span>在网状态</span>
          </div>
          <div class="pL20 width18">
            <span>{{ telecomInfo.onLineStatus }}</span>
          </div>
          <div class="pR20 borderR width20 textR">
            <span>姓名与手机号匹配情况</span>
          </div>
          <div class="pL20">
            <span :class="{ textRebBg: isNameMatchMobile ,textGreenBg: !isNameMatchMobile}">
            {{ telecomInfo.nameMatchMobile }}
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
  name: 'BaseInfo',
  data () {
    return {
      isIdNumberCheck: true, // 控制 身份证符合编码规则 背景色
      isNameMatchIdNumber: true, // 控制 姓名与身份证匹配 背景色
      isNameMatchMobile: true // 控制 姓名与手机号匹配情况 背景色
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      baseInfo: state => state.baseInfoStore.baseInfo,
      telecomInfo: state => state.baseInfoStore.telecomInfo
    })
  },
  watch: {
    baseInfo (newbaseInfo) {
      this.styeChange()
    },
    telecomInfo (telecomInfo) {
      this.styeChange()
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('baseInfo init')
      this.styeChange()
    },
    styeChange () {
      if (this.baseInfo.idNumberCheck.indexOf('否') > -1) {
        this.isIdNumberCheck = true
      } else if (this.baseInfo.idNumberCheck.indexOf('是') > -1) {
        this.isIdNumberCheck = false
      }
      if (this.baseInfo.nameMatchIdNumber.indexOf('否') > -1) {
        this.isNameMatchIdNumber = true
      } else if (this.baseInfo.nameMatchIdNumber.indexOf('是') > -1) {
        this.isNameMatchIdNumber = false
      }
      if (this.baseInfo.idNumberCheck.indexOf('否') > -1) {
        this.isNameMatchMobile = true
      } else if (this.telecomInfo.nameMatchMobile.indexOf('是') > -1) {
        this.isNameMatchMobile = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
