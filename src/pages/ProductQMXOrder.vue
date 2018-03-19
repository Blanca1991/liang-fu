<!-- 产品适用 wuxiaobo-->
<template>
  <div class="ProductWarp minWidthBox" >
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
          <input type="text" name="" value="">
        </div>
        <div class="">
          <span >被调企业</span>
          <input type="text" name="" value="">
        </div>
        <div class="">
          <span class="queryBtn">查询</span>
        </div>
        <div class="">
          <span class="resetBtn" @click="resetFun">重置</span>
        </div>
      </div>
    </div>
    <div class="orderCenter">
      <div class="orderListBoxWarp">
        <div class="orderListBox">
          <div class="orderListTitle colorWhite flex font12">
            <div class="titleItem width14">
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
          <div class="orderList font12">
            <div class="orderListItem flex borderB" v-for="item in orderList">
              <div class="titleItem width14">
                {{ item.orderNo }}
              </div>
              <div class="titleItem width30">
                {{ item.company }}
              </div>
              <div class="titleItem width20">
                {{ item.num }}
              </div>
              <div class="titleItem width8">
                {{ item.name }}
              </div>
              <div class="titleItem width14">
                {{ item.orderDate}}
              </div>
              <div class="titleItem width8">
                {{ item.orderState}}
              </div>
              <div class="titleItem downLoad width8">
                下载
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pageBox">
        <el-pagination
          background
          :page-size="10"
          layout="prev, pager, next"
          :total="100"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <div class="colorWhite TextBottom">
      量富征信管理有限公司版权所有©沪ICP备18002309号-1
    </div>
    <Login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
    <Loading v-show="isLoading"/>
  </div>
</template>

<script>
// import myCanvas from 'vue-atom-canvas'
// import http from '@/utils/http'
// import api from '@/utils/api'
// import service from '@/service'
import {mapState} from 'vuex'
import PointOut from '@/components/PointOut'
import Loading from '@/components/Loading'
import Login from '@/components/Login'
import HeaderNav from '@/QmxComp/HeaderNav'

export default {
  name: 'Product',
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      isLogin: state => state.isLogin,
      orderList: state => state.QMXStore.orderList
    })
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      console.log('QMXorder')
    },
    handleCurrentChange (val) {
      // 获取页签数值
      console.log(val)
    },
    resetFun () {
      // 重置输入框
    }
  },
  components: {
    // myCanvas,
    Login,
    PointOut,
    Loading,
    HeaderNav
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
.TextBottom{background: #2d3237;height: 58;line-height: 58px; margin-top: 80px;}
.orderTop input{width: 240px;height: 28px;margin: 0 20px; text-indent: 12px;}
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
</style>
