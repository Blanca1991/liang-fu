<!-- product引用组件 总体评分 wuxiaobo-->
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
          <div class="pR20 borderR width18 textR">
            <span>身份证号</span>
          </div>
          <div class="pL20">
            <span>{{ baseInfo.idNumber }}</span>
          </div>
        </div>
        <div class="flex detailList borderB">
          <div class="pL20 borderR width18 ">
            <span>年龄</span>
          </div>
          <div class="pL20 width18">
            <span>{{ baseInfo.age }}</span>
          </div>
          <div class="pR20 borderR width18 textR">
            <span>身份证所在地</span>
          </div>
          <div class="pL20">
            <span>{{ baseInfo.idNumberOwnership }}</span>
          </div>
        </div>
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width18">
            <span>性别</span>
          </div>
          <div class="pL20 width18">
            <span>{{ baseInfo.sex }}</span>
          </div>
          <div class="pR20 borderR width18 textR">
            <span>身份证符合编码规则</span>
          </div>
          <div class="pL20">
            <span class="" :class="{ textRebBg: !isIdNumberCheck ,textGreenBg: isIdNumberCheck}">
            {{ baseInfo.idNumberCheck }}
            </span>
          </div>
        </div>
        <div class="flex detailList borderB">
          <div class="pL20 borderR width18">
            <span>姓名与身份证匹配</span>
          </div>
          <div class="pL20" >
            <span class="" :class="{ textRebBg: !isNameMatchIdNumber,textGreenBg: isNameMatchIdNumber}">
            {{ baseInfo.nameMatchIdNumber }}
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
      isNameMatchIdNumber: false,
      isIdNumberCheck: true
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
      console.log(this.telecomInfo)
    },
    nameCode () {
      // 姓名掩码
      console.log(this.baseInfo.name)
    },
    styeChange () {
      if (this.baseInfo.nameMatchIdNumber === '否') {
        this.isNameMatchIdNumber = true
      } else if (this.baseInfo.idNumberCheck === '否') {
        this.isIdNumberCheck = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
