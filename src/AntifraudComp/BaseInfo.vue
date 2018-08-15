<!-- product引用组件 基本身份信息 + 运营商信息 wuxiaobo-->
<template>
  <div class="baseInfoWarp ">
    <div class="baseInfo flex divJump " id="baseInfo" >
      <div class="infoTitle font24">
        基本身份信息
      </div>
      <div class="infoBox textL">
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width18">
            <span>姓名</span>
          </div>
          <div class="pL20 width18">
            <span>{{ baseInfo.name }}</span>
          </div>
          <div class="pR20 borderR width20 textR">
            <span>身份证号</span>
          </div>
          <div class="pL20">
            <!-- <span>{{ baseInfo.idNumber.substr(0, 2)+ '***********'+ baseInfo.idNumber.substr(baseInfo.idNumber.length- 2, 2) }}</span> -->
            <span v-if="baseInfo.idNumber.length == 18">{{ baseInfo.idNumber.replace(/(\d{2})\d{14}(\d{2})/, '$1**************$2') }}</span>
            <span v-if="baseInfo.idNumber.length == 15">{{ baseInfo.idNumber.replace(/(\d{2})\d{11}(\d{2})/, '$1***********$2') }}</span>
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
            <span v-if="baseInfo.idNumberOwnership === '' || baseInfo.idNumberOwnership === null" class="textRebBg">查询无结果</span>
            <span class="fontGreenColor" v-if="baseInfo.idNumberOwnership !== '' || baseInfo.idNumberOwnership !== null">
              {{ baseInfo.idNumberOwnership }}
            </span>
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
            <span :class="{ textRebBg: isIdNumberCheck ,textGreenBg: !isIdNumberCheck}" v-if="baseInfo.idNumberCheck && baseInfo.idNumberCheck != ''">
            {{ baseInfo.idNumberCheck}}
            </span>
            <span class="textRebBg" v-if="!baseInfo.idNumberCheck">
              查询无结果
            </span>
          </div>
        </div>
        <div class="flex detailList borderB">
          <div class="pL20 borderR width18">
            <span>姓名与身份证匹配</span>
          </div>
          <div class="pL20" >
            <span :class="{ textRebBg: isNameMatchIdNumber,textGreenBg: !isNameMatchIdNumber}" v-if="baseInfo.nameMatchIdNumber && baseInfo.nameMatchIdNumber != ''">
            {{ baseInfo.nameMatchIdNumber }}
            </span>
            <span class="textRebBg"  v-if="!baseInfo.nameMatchIdNumber">
              查询无结果
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="baseInfo telecomInfo flex divJump " id="telecomInfo">
      <div class="infoTitle font24">
        运营商信息
      </div>
      <div class="infoBox textL">
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width18">
            <span>手机号</span>
          </div>
          <div class="pL20 width38">
            <span>{{ telecomInfo.mobileNo.replace(/(\d{3})\d{6}(\d{2})/, "$1******$2") }}</span>
          </div>
          <div class="pR20 borderR width20 textR">
            <span>运营商类别</span>
          </div>
          <div class="pL20">
            <span v-if="telecomInfo.type">{{ telecomInfo.type }}</span>
            <span v-if="!telecomInfo.type" class="textRebBg">查询无结果</span>
          </div>
        </div>
        <div class="flex detailList borderB">
          <div class="pL20 borderR width18 ">
            <span>号码归属地</span>
          </div>
          <div class="pL20 width38">
            <span v-if="telecomInfo.mobileOwnership === '' || telecomInfo.mobileOwnership === null" class="textRebBg" >查询无结果</span>
            <span class="fontGreenColor" v-if="telecomInfo.mobileOwnership ">
              {{ telecomInfo.mobileOwnership }}
            </span>
          </div>
          <div class="pR20 borderR width20 textR">
            <span>入网时长</span>
          </div>
          <div class="pL20">
            <span v-if="telecomInfo.inTime">{{ telecomInfo.inTime }}</span>
            <span class="textRebBg" v-if="!telecomInfo.inTime">查询无结果</span>
          </div>
        </div>
        <div class="flex detailList titleBg borderB">
          <div class="pL20 borderR width18">
            <span>在网状态</span>
          </div>
          <div class="pL20 width38">
            <span v-if="telecomInfo.onLineStatus && telecomInfo.onLineStatus=='正常在用'">{{ telecomInfo.onLineStatus}}</span>
            <span class="textRebBg" v-if="telecomInfo.onLineStatus && telecomInfo.onLineStatus=='停网'">{{ telecomInfo.onLineStatus}}</span>
            <span class="textRebBg" v-if="!telecomInfo.onLineStatus">查询无结果</span>
          </div>
          <div class="pR20 borderR width20 textR">
            <span>姓名与手机号匹配情况</span>
          </div>
          <div class="pL20">
            <span :class="{ textRebBg: isNameMatchMobile ,textGreenBg: !isNameMatchMobile}" v-if="telecomInfo.nameMatchMobile && telecomInfo.nameMatchMobile != '' ">
            {{ telecomInfo.nameMatchMobile}}
            </span>
            <span v-if="!telecomInfo.nameMatchMobile" class="textRebBg" >
              查询无结果
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
      // console.log('baseInfo init')
      this.styeChange()
    },
    styeChange () {
      // 姓名第二个字*
      let nameArry = this.baseInfo.name.split('')
      nameArry.forEach(function(e,i){
      	if(nameArry.length>2){
      		if(i>0&&i<(nameArry.length-1)){
	      	  nameArry[i] = '*'
	      	}
      	}else{
      		if(i>0){
	      	  nameArry[i] = '*'
	      	}
      	}

      });
      this.baseInfo.name = nameArry.join('').replace(/,/g, '')
      // 修改背景色
      if (this.baseInfo.idNumberCheck) {
        if (this.baseInfo.idNumberCheck.indexOf('否') > -1) {
          this.isIdNumberCheck = true
        } else if (this.baseInfo.idNumberCheck.indexOf('是') > -1) {
          this.isIdNumberCheck = false
        }
      }
      if (this.baseInfo.nameMatchIdNumber) {
        if (this.baseInfo.nameMatchIdNumber.indexOf('否') > -1) {
          this.isNameMatchIdNumber = true
        } else if (this.baseInfo.nameMatchIdNumber.indexOf('是') > -1) {
          this.isNameMatchIdNumber = false
        } else {
          this.isNameMatchIdNumber = true
        }
      }
      if (this.telecomInfo.nameMatchMobile) {
        if (this.telecomInfo.nameMatchMobile.indexOf('否') > -1) {
          this.isNameMatchMobile = true
        } else if (this.telecomInfo.nameMatchMobile.indexOf('是') > -1) {
          this.isNameMatchMobile = false
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
