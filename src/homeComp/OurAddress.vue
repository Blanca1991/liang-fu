<!-- home引用组件 联系我们 wuxiaobo-->
<template>
  <div class="oueServicesWarp ourAddressWarp homeItem" id="OurAddress">
    <div class="ourAddress ourNews">
      <div class="font28 servicesTitle">
        <div class="">
          <span>Contact Us</span>
        </div>
        <div class="flex circleDivBox">
          <div class="circleDiv"></div>
          <div class="ruleDiv"></div>
          <div class="circleDiv"></div>
        </div>
      </div>
      <div class="ourAddressBox flex" >
        <div class="fromBox textL">
          <div class="flex">
            <div class="width45">
              <div class="font22">姓名</div>
              <div class="">
                <input type="text" name="" class="font16" value="" v-model="ContactName">
              </div>
            </div>
            <div class="width45 paddingLeft10">
              <div class="font22">联系方式</div>
              <div class="">
                <input type="text" name="" class="font16" value="" v-model="ContactPhone" maxlength="11" >
              </div>
            </div>
          </div>
          <div class="marginTop10">
            <div class="font22">邮箱</div>
            <div class="">
              <input type="text" name="" class="font16" value="" v-model="ContactEmail">
            </div>
          </div>
          <div class="marginTop10">
            <div class="font22">内容部分</div>
            <div class="">
              <textarea name="name" rows="8" class="contentInput font16" cols="80" v-model="ContactContent"></textarea>
            </div>
          </div>
          <div class="marginTop10 submitBox ">
            <span class="submitBtn font18 pointer" @click="submitContact">提交</span>
          </div>
        </div>
        <div class="imgBox ">
          <div class="imgMask"></div>
          <div class="imgLine"></div>
          <div class="imgBoxIn">
            <img :src="imgUrl" alt="">
            <div>
              <p class="font16">上海市徐汇区宜山路1289号复星科技园B栋9楼</p>
              <p class="font16">邮箱：lfzx.cs@fosun.com 电话：021-34611615</p>
            </div>
          </div>
        </div>
      </div>
      <div class="liangfuBox">
        量富征信管理有限公司版权所有©沪ICP备18002309号-1
      </div>
    </div>
  </div>
</template>

<script>
import map from '../images/home/map.jpg'
import http from '@/utils/http'
import api from '@/utils/api'
import service from '@/service'

export default {
  name: 'homeBigBg',
  data () {
    return {
      imgUrl: map,
      ContactName: '',
      ContactPhone: '',
      ContactEmail: '',
      ContactContent: ''
    }
  },
  computed: {},
  watch: {},
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      // console.log('OurAddress init')
    },
    submitContact () {
      let myRegMobile = /^(((13[0 -9]{1})|(15[0 -9]{1})|(17[0 -9]{1})|(18[0 -9]{1}))+\d{8})$/
      let myRegEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      // let myRegEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      // console.log('submitContact')
      if (this.ContactName === '') {
        this.pointOutFun('请填写姓名')
      } else if (this.ContactPhone === '') {
        this.pointOutFun('请填写联系电话')
      } else if (myRegMobile.test(this.ContactPhone) === false) {
        this.pointOutFun('请填写正确的联系电话')
      } else if (this.ContactEmail === '') {
        this.pointOutFun('请填写联系Email')
      } else if (myRegEmail.test(this.ContactEmail) === false) {
        this.pointOutFun('请填写正确的联系Email')
      } else if (this.ContactContent === '') {
        this.pointOutFun('请提交内容部分')
      } else {
        this.fetchSubmit()
      }
    },
    fetchSubmit: async function () {
      this.isLoading = true
      // 接口请求 ———— 搜索接口
      let params = {
        category: '合作联系',
        code: 0,
        name: this.ContactName,
        telephone: this.ContactPhone,
        content: this.ContactContent,
        mail: this.ContactEmail,
        createdDt: service.getNowFormatDate(Date())
      }
      const res = await http.postFromdata(api.addAdvice, params)
      // console.log(res)
      console.log(res.data)
      if (res.data.type && res.data.type === 'success') {
        this.pointOutFun('提交成功！')
        this.isLoading = false
        this.ContactName = ''
        this.ContactPhone = ''
        this.ContactEmail = ''
        this.ContactContent = ''
      } else if (res.data.type === 'false') {
        this.pointOutFun(res.data.message)
        this.isLoading = false
      } else {
        this.pointOutFun('系统异常，请稍后再试')
        this.isLoading = false
      }
    },
    pointOutFun (data) {
      // 事件调用 -- 调用提示层
      this.$store.state.isLoginBox = true
      this.$store.dispatch('showPoint', data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/homeComp'
</style>
