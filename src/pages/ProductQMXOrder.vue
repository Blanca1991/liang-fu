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
          <span >查询</span>
        </div>
        <div class="">
          <span >重置</span>
        </div>
      </div>
    </div>
    <!-- <div class="colorWhite TextBottom">
      量富征信管理有限公司版权所有©沪ICP备18002309号-1
    </div> -->
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
      isLogin: state => state.isLogin
    })
  },
  mounted () {
    // 钩子函数
  },
  methods: {},
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
.ProductWarp{background: #fafafa;width: 100%;}
.colorWhite{color: #fff;}
.orderTop{width: 1000px;background: #fff;margin: 20px auto;padding:20px 30px;
  box-sizing: border-box;border-radius: 5px;border: 1px solid #eee;box-shadow: 0px 2px 2px #ccc}
.oederTit{display: inline-block;width: 4px;height: 17px;margin-right: 5px;background: #3b77e3}
.TextBottom{background: #2d3237;height: 58;line-height: 58px;}
.orderTop input{width: 240px;height: 28px;margin: 0 20px;}
.textBlank{}
.inputBox{margin-top: 20px; }
.Blank{padding:0 10px;}
.lineLength34px{height: 34px; line-height: 34px;}
</style>
