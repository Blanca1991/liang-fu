<!-- 产品适用 征信报告列表页 wuxiaobo-->
<template>
  <div class="ProductWarp minWidthBox minHight"  >
    <HeaderNavQmx />
    <div class="orderTop">
      <div class="flex alignCenter">
        <div class="oederTit"></div>
        <div class="font14">订单查询</div>
      </div>
      <div class="flex font12 lineLength34px inputBox" >
        <div class="">
          <span class="textBlank font14">
            编<span class="Blank"></span>号
          </span>
          <input type="text" name="" v-model="searchCode">
        </div>
        <div class="font14">
          <span >被调企业</span>
          <input type="text" name="" v-model="searchCompany">
        </div>
        <div class="font14">
          <span class="queryBtn pointer" @click="getOrder">查询</span>
        </div>
        <div class="font14">
          <span class="resetBtn pointer" @click="resetFun">重置</span>
        </div>
      </div>
    </div>
    <div class="" v-if="!isOrderEmpty">
      <div class="orderCenter" v-if="orderList && orderList.length > 0">
        <div class="orderListBoxWarp">
          <div class="orderListBox">
            <div class="orderListTitle colorWhite flex font12">
              <div class="titleItem width35">
                编号
              </div>
              <div class="titleItem width30">
                被调企业
              </div>
              <div class="titleItem width20">
                统一社会信用代码 / 注册号
              </div>
              <div class="titleItem width8">
                法人
              </div>
              <div class="titleItem width12">
                提交日期
              </div>
              <div class="titleItem width8">
                状态
              </div>
              <div class="titleItem width12">
                操作
              </div>
            </div>
            <div class="orderList font12" >
              <div class="orderListItem flex borderB" v-for="item in orderList" >
                <div class="titleItem width35">
                  {{ item.orderCode || '——'}}
                </div>
                <div class="titleItem width30">
                  {{ item.companyName || '——'}}
                </div>
                <div class="titleItem width20">
                  {{ item.companyCode || '——' }}
                </div>
                <div class="titleItem width8">
                  {{ item.legalPerson || '——' }}
                </div>
                <div class="titleItem width12">
                  {{ item.commitTime || '——'}}
                </div>
                <div class="titleItem width8">
                  <!-- {{ item.status || '——'}} -->
                  <span v-if="item.status == '0'">生成中</span>
                  <span v-if="item.status == '1' || item.status == '3'">完成</span>
                  <span v-if="item.status == '2'">失败</span>
                </div>
                <div class="titleItem downLoad width12 " >
                  <span class="pointer" v-if="item.status == '1' || item.status == '3'" @click="previewPdf(item.orderCode)">预览</span>
                  <span class="pointer" v-if="item.status == '1' || item.status == '3'" @click="downLoadPdf(item.orderCode)">下载</span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pageBox">
          <el-pagination
            background
            :current-page="pageNumber"
            :page-size="pageSizeNum"
            layout="total, prev, pager, next"
            :total="totalResult"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <OrderEmpty v-if="!orderList || orderList.length < 1"/>
    <div class="" v-if="isOrderEmpty">
      <OrderEmpty />
    </div>
    <div class="colorWhite TextBottom font16">
      量富征信管理有限公司版权所有©沪ICP备18002309号-1
    </div>
    <Login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
    <Loading v-show="isLoading"/>
  </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/utils/api'
import service from '@/service'
import {mapState} from 'vuex'
import PointOut from '@/components/PointOut'
import Loading from '@/components/Loading'
import Login from '@/components/Login'
import HeaderNavQmx from '@/ProductComp/HeaderNavQmx'
import OrderEmpty from '@/ProductComp/OrderEmpty'
import { baseUrl } from '@/utils/env.js'

export default {
  name: 'Product',
  data () {
    return {
      isOrderEmpty: false, // true 为空订单 false为订单列表
      isLoading: false,
      searchCompany: '', // 被查询的企业名称
      searchCode: localStorage.getItem('orderCode')||'', // 被查询的企业编号
      pageNumber: 1, // 当前分页数字
      orderCode: ''
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      isLogin: state => state.isLogin,
      orderList: state => state.QMXStore.orderList,
      totalResult: state => state.QMXStore.totalResult,
      pageSizeNum: state => state.QMXStore.pageSizeNum,
      qmxOrderCode: state => state.qmxOrderCode,
      userName: state => state.userName
    })
  },
  watch: {
    userName () {
      if (!!this.userName) {
        this.isOrderEmpty = false
        this.fetchOrderList()
      } else {
        this.isOrderEmpty = true
        this.pageNumber = 1
        this.searchCompany = ''
        this.searchCode = ''
      }
    },
    qmxOrderCode () {
      this.searchCode = this.qmxOrderCode
      this.pageNumber = 1
      this.fetchOrderList()
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // console.log(this.qmxOrderCode)
      // console.log('QMXorder')
      if (!!localStorage.getItem('userName')) {
        // console.log(localStorage.getItem('userName'));
        this.fetchOrderList()
      } else {
        this.$store.dispatch('showPoint', '请重新登录')
      }
    },
    handleCurrentChange (val) {
      // 获取页签数值
      this.pageNumber = val
      this.fetchOrderList()
    },
    getOrder () {
      // 获取订单列表
      if (!!localStorage.getItem('userName')) {
        if (this.searchCompany == '' && this.searchCode == '') {
          this.$store.dispatch('showPoint', '请输入编号或被调企业')
        } else {
          this.pageNumber = 0
          this.fetchOrderList()
        }
      } else {
        this.$store.dispatch('showPoint', '请登录')
      }
    },
    fetchOrderList: async function () {
      // 接口请求 ———— 获取企明星的订单list
      this.isLoading = true
      let params = {
        body: {
          pageNum: this.pageNumber,
          orderCode: this.searchCode,
          companyName: this.searchCompany,
          isMsgOrderFlag: '',
          token: localStorage.getItem('LFZXtoken')
        },
        header: {
          reqFlag: '0',
          source: 'web',
          userName: localStorage.getItem('userName'),
          reqDateTime: service.getNowFormatDate(Date()),
          reqTransID: ''
        }
      }
      // console.log(params)
      const res = await http.post(api.getOrderList + '?OrderTime=' + service.getNowDateTime(), params)
      // console.log(res)
      if (res.status == 200) {
        this.isLoading = false
        if (res.data.body.success != 'false') {
          // 成功
          this.$store.dispatch('changeOrderList', res.data.body)
        } else {
          this.$store.dispatch('showPoint', res.data.body.errorMsg)
        }
        localStorage.removeItem('orderCode')
      } else {
        this.isLoading = false
        this.$store.dispatch('showPoint', '网络异常请稍后再试')
        localStorage.removeItem('orderCode')
      }
    },
    previewPdf (data) {
      // 预览pdf downQmxPdf
      this.orderCode = data
      this.fetchPdf()
    },
    fetchPdf: async function () {
      // 接口请求 ———— 获取企明星的pdf Url
      this.isLoading = true
      const res = await http.get(api.downQmxPdf+this.orderCode+'&'+localStorage.getItem('userName'))
      console.log(res)
      if (res.status == 200) {
        this.isLoading = false
        // this.$router.push({name: 'QmxPdf'})
        // this.$store.commit('CHANGEPDFURL', res.data.result.url)
        if (res.data.result && res.data.result.url) {
          var tempwindow=window.open()
          tempwindow.location=res.data.result.url
          // window.open(res.data.result.url)
        } else {
          this.$store.dispatch('showPoint', '网络异常请稍后再试')
        }
      } else {
        this.isLoading = false
        this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    },
    resetFun () {
      // 重置输入框
      this.searchCompany = '' // 被查询的企业编号
      this.searchCode = ''
      this.pageNumber = 1
      this.fetchOrderList()
    },
    downLoadPdf (data) {
      // console.log('downLoadFun')
      this.orderCode = data
      let url = baseUrl + '/credit-service/pdfbyOrder/file/' + this.orderCode + '&' + localStorage.getItem('userName')
      // console.log(url)
      this.downLoad(url)
    },
    downLoad (strUrl) {
      var form = document.createElement('form') // 定义一个form表单
      form.setAttribute('style', 'display:none') // 在form表单中添加查询参数
      form.setAttribute('target', '_blank')
      form.setAttribute('method', 'get')
      form.setAttribute('action', strUrl)
      var input1 = document.createElement('input')
      input1.setAttribute('type', 'hidden')
      document.body.appendChild(form) // 将表单放置在web中
      form.appendChild(input1) // 将查询参数控件提交到表单上
      form.submit()
    }
  },
  components: {
    // myCanvas,
    Login,
    PointOut,
    Loading,
    HeaderNavQmx,
    OrderEmpty
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ProductWarp{background: #fafafa;width: 100%;height: 100%;}
.colorWhite{color: #fff;}
.orderTop{width: 1000px;background: #fff;margin: 20px auto;padding:20px 30px;
  box-sizing: border-box;border-radius: 5px;border: 1px solid #eee;box-shadow: 0px 2px 2px #ccc}
.oederTit{display: inline-block;width: 4px;height: 17px;margin-right: 5px;background: #3b77e3}
.TextBottom{background: #2d3237;height: 58;line-height: 58px; margin-top: 80px;
  position: absolute;bottom: 0;width: 100%;min-width: 1200px;}
.orderTop input{width: 290px;height: 28px;margin: 0 20px 0 10px; text-indent: 12px;font-size: 12px;}
.textBlank{}
.inputBox{margin-top: 20px; }
.Blank{padding:0 10px;}
.lineLength34px{height: 34px; line-height: 34px;}
.queryBtn{background: #3b77e3;color: #fff;padding:6px 14px 6px 20px;
  border-radius: 5px;letter-spacing: 6px;border: #3b77e3 solid 1px; margin-right: 20px;}
.resetBtn{color: #3b77e3;background: #fff;padding:6px 14px 6px 20px;
  border-radius: 5px;letter-spacing: 6px;border: #3b77e3 solid 1px; }
.orderListBox{margin:20px auto;border:#eee solid 1px; border-radius: 5px 5px 0 0 ;border-bottom: none;}
.orderListTitle{background: #3b77e3;border-radius: 5px 5px 0 0 ;}
.titleItem{ padding:10px 0;}
.width14{width: 14%} .width8{width: 8%} .width25{width: 25%} .width20{width: 20%} .width30{width: 30%;}
.width35{width: 35%} .width12{width: 12%}
.orderList{ }
.orderListItem:hover{ background: #dae7ff !important;}
.orderListBoxWarp{height: 470px;}
.downLoad{ color: #3b77e3 }
.borderB{border-bottom: #eee solid 1px;}
.orderList > div:nth-child(2n+1){
  background: #F7F7F8
}
.pr{padding-right: 5px;}
.orderCenter{ width: 1000px; margin: 0 auto;}
.pageBox { text-align: right;}
.minHight{position: relative;min-height: 800px;height: 100%;}
</style>
