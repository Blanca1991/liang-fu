<!-- 产品适用 wuxiaobo-->
<template>
  <div class="ProductWarp minWidthBox minHight"  >
    <HeaderNav />
    <div class="orderTop">
      <div class="flex alignCenter">
        <div class="oederTit"></div>
        <div class="font14">订单查询</div>
      </div>
      <div class="flex font12 lineLength34px inputBox" >
        <div class="">
          <span class="textBlank">
            编<span class="Blank"></span>号
          </span>
          <input type="text" name="" v-model="searchCode">
        </div>
        <div class="">
          <span >被调企业</span>
          <input type="text" name="" v-model="searchCompany">
        </div>
        <div class="">
          <span class="queryBtn pointer" @click="getOrder">查询</span>
        </div>
        <div class="">
          <span class="resetBtn pointer" @click="resetFun">重置</span>
        </div>
      </div>
    </div>
    <div class="orderCenter" v-if="orderList">
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
            <div class="titleItem width14">
              提交日期
            </div>
            <div class="titleItem width8">
              状态
            </div>
            <div class="titleItem width8">
              操作
            </div>
          </div>
          <div class="orderList font12" >
            <div class="orderListItem flex borderB" v-for="item in orderList">
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
              <div class="titleItem width14">
                {{ item.commitTime || '——'}}
              </div>
              <div class="titleItem width8">
                <!-- {{ item.status || '——'}} -->
                <span v-if="item.status == '0'">审核中</span>
                <span v-if="item.status == '1' || item.status == '3'">成功</span>
                <span v-if="item.status == '2'">失败</span>
              </div>
              <div class="titleItem downLoad width8 pointer" @click="downLoadPdf(item.orderCode)">
                <span v-if="item.status == '1' || item.status == '3'">下载</span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pageBox">
        <el-pagination
          background
          :page-size="pageSizeNum"
          layout="total, prev, pager, next"
          :total="totalResult"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <OrderEmpty v-if="!orderList"/>
    <div class="colorWhite TextBottom">
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
import HeaderNav from '@/QmxComp/HeaderNav'
import OrderEmpty from '@/QmxComp/OrderEmpty'

export default {
  name: 'Product',
  data () {
    return {
      isOrderEmpty: false, // true 为空订单 false为订单列表
      isLoading: false,
      searchCompany: '', // 被查询的企业名称
      searchCode: '', // 被查询的企业编号
      pageNumber: '1', // 当前分页数字
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
      pageSizeNum: state => state.QMXStore.pageSizeNum
    })
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      console.log('QMXorder')
      this.getOrder()
    },
    handleCurrentChange (val) {
      // 获取页签数值
      console.log(val)
      this.pageNumber = val
      this.fetchOrderList()
    },
    getOrder () {
      this.fetchOrderList()
    },
    fetchOrderList: async function () {
      // 接口请求 ———— 获取企明星的订单list
      let params = {
        body: {
          pageNum: this.pageNumber,
          orderCode: this.searchCode,
          companyName: this.searchCompany,
          isMsgOrderFlag: ''
        },
        header: {
          reqFlag: '0',
          source: '',
          userName: localStorage.getItem('userName'),
          reqDateTime: service.getNowFormatDate(Date()),
          reqTransID: '0990000sss091111'
        }
      }
      console.log(params)
      const res = await http.post(api.getOrderList + '?time=' + service.getNowDateTime(), params)
      console.log(res)
      if (res.status == 200) {
        // this.isLoading = false
        if (res.data.body.success != 'false') {
          // 成功
          this.$store.dispatch('changeOrderList', res.data.body)
        } else {
          this.$store.dispatch('showPoint', res.data.body.errorMsg)
        }
      } else {
        this.isLoading = false
        this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    },
    downLoadPdf (data) {
      // 下载Pdf downQmxPdf
      this.orderCode = data
      this.fetchPdf()
    },
    fetchPdf: async function () {
      // 接口请求 ———— 获取企明星的订单list
      const res = await http.get(api.downQmxPdf+'&&orderCode='+this.orderCode+'&&userName='+localStorage.getItem('userName'))
      console.log(res)

    },
    resetFun () {
      // 重置输入框
      this.searchCompany = '' // 被查询的企业编号
      this.searchCode = ''
    }
  },
  components: {
    // myCanvas,
    Login,
    PointOut,
    Loading,
    HeaderNav,
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
.orderTop input{width: 280px;height: 28px;margin: 0 20px; text-indent: 12px;}
.textBlank{}
.inputBox{margin-top: 20px; }
.Blank{padding:0 10px;}
.lineLength34px{height: 34px; line-height: 34px;}
.queryBtn{background: #3b77e3;color: #fff;padding:10px 14px 10px 20px;
  border-radius: 5px;letter-spacing: 6px;border: #3b77e3 solid 1px; margin-right: 20px;}
.resetBtn{color: #3b77e3;background: #fff;padding:10px 14px 10px 20px;
  border-radius: 5px;letter-spacing: 6px;border: #3b77e3 solid 1px; }
.orderListBox{margin:20px auto;border:#eee solid 1px; border-radius: 5px 5px 0 0 ;border-bottom: none;}
.orderListTitle{background: #3b77e3;border-radius: 5px 5px 0 0 ;}
.titleItem{ padding:10px 0;}
.width14{width: 14%} .width8{width: 8%} .width25{width: 25%} .width20{width: 20%} .width30{width: 30%;}
.width35{width: 35%}
.orderList{ }
.orderListItem:hover{ background: #dae7ff !important;}
.orderListBoxWarp{height: 470px;}
.downLoad{ color: #3b77e3 }
.borderB{border-bottom: #eee solid 1px;}
.orderList > div:nth-child(2n+1){
  background: #F7F7F8
}
.orderCenter{ width: 1000px; margin: 0 auto;}
.pageBox { text-align: right;}
.minHight{position: relative;min-height: 950px;height: 100%;}
</style>
