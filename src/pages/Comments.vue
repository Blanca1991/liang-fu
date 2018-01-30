<!-- 意见和建议 wuxiaobo-->
<template>
  <div  class="ServiceWarp minWidthBox">
    <ComHeader :isActiveComp="isActives" />
    <div class="infoWarp">
      <div class="font28 textL">
        意见建议
      </div>
      <div class="font16 textL">
        如果您有任何投诉及建议，请留下您的联系方式，
      </div>
      <div class="font16 textL">
        或拨打我们的客服热线：021-34611615。
      </div>
      <div class="inputBox textL">
        <div class="">
          <div class="flex">
            <div class="width45">
              <div class="textLineHight">
                姓名
              </div>
              <div class="">
                <input type="text" name="" value="" v-model="ContactName">
              </div>
            </div>
            <div class="width45 marginLeft10">
              <div class="textLineHight">
                联系方式
              </div>
              <div class="">
                <input type="text" name="" value="" maxlength="11" v-model="ContactPhone">
              </div>
            </div>
          </div>
          <div class="">
            <div class="textLineHight">
              邮箱
            </div>
            <div class="">
              <input type="text" name="" value="" v-model="ContactEmail">
            </div>
          </div>
          <div class="">
            <div class="textLineHight">
              内容部分
            </div>
            <div class="">
              <textarea class="contentInput" name="name" rows="8" cols="80" v-model="ContactContent"></textarea>
            </div>
          </div>
          <div class="submitBox">
            <span class="submitBtn pointer" @click="submitComments">
              提交
            </span>
          </div>
        </div>
      </div>
    </div>
    <login v-show="isLogin"/>
    <PointOut  v-show="pointShow" />
    <Loading v-show="isLoading"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import http from '@/utils/http'
import api from '@/utils/api'
import service from '@/service'
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'
import PointOut from '@/components/PointOut'
import Loading from '@/components/Loading'

export default {
  name: 'Comments',
  data () {
    return {
      isActives: 'Comments',
      pointShowT: false,
      ContactName: '',
      ContactPhone: '',
      ContactEmail: '',
      ContactContent: '',
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      isLogin: state => state.isLogin,
      pointShow: state => state.pointShow
    })
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('Comments init !')
    },
    submitComments () {
      let myRegMobile = /^(((13[0 -9]{1})|(15[0 -9]{1})|(17[0 -9]{1})|(18[0 -9]{1}))+\d{8})$/
      let myRegEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      // let myRegEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      console.log('submitContact')
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
      let times = new Date().getTime()
      this.isLoading = true
      // 接口请求 ———— 搜索接口
      let params = {
        category: '意见建议',
        code: 0,
        name: this.ContactName,
        telephone: this.ContactPhone,
        content: this.ContactContent,
        mail: this.ContactEmail,
        createdDt: service.getNowFormatDate(Date())
      }
      const res = await http.postFromdata(api.addAdvice + times, params)
      console.log(res)
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
      this.$store.dispatch('showPoint', data)
    }
  },
  components: {
    ComHeader,
    Login,
    PointOut,
    Loading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ServiceWarp{background: #EEEEEE;height: 100%; }
.infoWarp{width: 600px; margin: 10px auto;}
.textLineHight{ line-height: 35px;}
.width45{width: 45%;}
.marginLeft10{margin-left: 10%;}
.infoWarp input{width: 100%;height: 32px;border-radius: 5px;border: #ccc 1px solid ;
  text-indent: 16px;line-height: 18px;color: #b15aa9; font-size: 14px;}
.infoWarp .contentInput{border-radius: 5px;border: none ;text-indent: 16px;border: #ccc 1px solid ;font-size: 14px;
    line-height: 18px;outline: none;padding: 5px;box-sizing: border-box;width: 100%;color: #b15aa9;
}
.submitBox{margin-top: 20px;}
.submitBox .submitBtn{padding: 10px 30px;color: #b15aa9; background: #fff;
  border-radius: 5px;border: #ccc 1px solid ;}
</style>
