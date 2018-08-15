<!-- 产品适用 企业监测预警 关注企业 wuxiaobo-->
<template>
  <div class="ProductWarp minWidthBox minHight"  >
    <HeaderNavMon />
    <div class=" bannerBg" >
      <img :src="bannerBg" alt="" class="imgBanner">
      <div class="textCenter">
        <span class="bannerBgText font28">监控企业列表</span>
        <span class="bannerBgR colorWhite font32">Monitoring list</span>
      </div>
    </div>
    <MonitorDateComp v-show="false"/>
    <div class="" >
      <div class="orderCenter mB30">
        <div class="textL marginTop20 flex between">
          <div class="font18">
            关注企业 <span>({{ totalResultAtt || '0' }})</span>
          </div>
          <div class="queryBtn pointer font14 fontBold" @click="addMonCompanyFun">
            <span>新增关注</span>
          </div>
        </div>
        <div class="orderListBoxWarp">
          <div class="orderListBox">
            <div class="orderListTitle colorWhite flex font14 fontBold">
              <div class="titleItem width35">
                企业名称
              </div>
              <div class="titleItem width25">
                监控有有效期
              </div>
              <div class="titleItem width12">
                变更总数
              </div>
              <div class="titleItem width20">
                最后变更日期
              </div>
              <div class="titleItem width12">
                当前状态
              </div>
              <div class="titleItem width20">
                操作
              </div>
            </div>
            <div class="orderList font12" v-if="!isMonitorError">
              <div class="orderListItem flex borderB "  v-for="item in attentionList" v-if="!isAttentionEmpty && attentionList.length >= 1">
                <div class="width35 borderR cursorInitial" >
                  <div class="companyHoverBox" v-if="item.companyName">
                    <el-popover
                      placement="bottom-start"
                      trigger="hover">
                      <div class="hoverBox font14" v-if="item.companyInfoDTO">
                        <div class="flex hoverItem borderB">
                          <div class="hoverItemWidth borderR " >
                            企业名称
                          </div>
                          <div class="">
                            {{item.companyInfoDTO.companyName || '——'}}
                          </div>
                        </div>
                        <div class="flex hoverItem borderB">
                          <div class="hoverItemWidth borderR">
                            社会统一信用代码/注册号
                          </div>
                          <div class="">
                            {{item.companyInfoDTO.creditCode || '——'}}
                          </div>
                        </div>
                        <div class="flex hoverItem borderB">
                          <div class="hoverItemWidth borderR">
                            法人
                          </div>
                          <div class="">
                            {{item.companyInfoDTO.legalPerson || '——'}}
                          </div>
                        </div>
                        <div class="flex hoverItem ">
                          <div class="hoverItemWidth borderR">
                            成立时间
                          </div>
                          <div class="">
                            {{item.companyInfoDTO.foundingDate || '——'}}
                          </div>
                        </div>
                      </div>
                      <div class="hoverBox font14" v-if="!item.companyInfoDTO">
                        <div class="flex hoverItem borderB">
                          <div class="hoverItemWidth borderR " >
                            企业名称
                          </div>
                          <div class="">——</div>
                        </div>
                        <div class="flex hoverItem borderB">
                          <div class="hoverItemWidth borderR">
                            法人
                          </div>
                          <div class="">——</div>
                        </div>
                        <div class="flex hoverItem borderB">
                          <div class="hoverItemWidth borderR">
                            社会统一信用代码>注册号
                          </div>
                          <div class="">——</div>
                        </div>
                        <div class="flex hoverItem ">
                          <div class="hoverItemWidth borderR">
                            成立时间
                          </div>
                          <div class="">——</div>
                        </div>
                      </div>
                      <el-button slot="reference">{{ item.companyName }}</el-button>
                    </el-popover>
                  </div>
                  <div class="" v-if="!item.companyName">
                    ——
                  </div>
                </div>
                <div class="titleItem width25 borderR">
                  {{ item.monitorPeriod || '——'  }}
                </div>
                <div class="titleItem width12 borderR">
                  <span class="pointer underline block pointer underline"  @click="goToMonitor(item.companyName)"
                  v-if="item.updateNum && item.updateNum !='0'">{{ item.updateNum }}</span>
                  <span v-if="!item.updateNum || item.updateNum == '0'">0</span>
                </div>
                <div class="titleItem width20 borderR" >
                  {{ item.laterUpdateDate || '——' }}
                </div>
                <div class="titleItem width12 borderR">
                  <span v-if="item.statusDsc == 0">监控中</span>
                  <span v-if="item.statusDsc == 1">已过期</span>
                  <span v-if="item.statusDsc == 2">已取消监控</span>
                </div>
                <div class="titleItem width20 decoration">
                  <span v-if="item.statusDsc == 1 || item.statusDsc == 2" class="pointer fontBold" @click="againMonCompanyFun(item)">重新监控</span>
                  <span v-if="item.statusDsc == 0" class="pointer fontBold cancelBtn" @click="delMonCompanyFun(item)">取消监控</span>
                </div>
              </div>
            </div>
            <MonitorEmpty v-if="isAttentionEmpty || attentionList.length == 0"/>
            <MonitorError v-if="isMonitorError"/>
          </div>
        </div>
        <div class="pageBox">
          <el-pagination
            background
            :current-page="pageNumber"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="totalResultAtt"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <Login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
    <Loading v-show="isLoading"/>
    <AddMonCompany v-if="isShowAddMon"
    :typeAddMon='typeAddMon' :monDate='monDate'
    :addStatus='addStatus'
    v-on:changeMonDate='changeMonDate($event)'
    v-on:changeAddstatus='changeAddstatus($event)'
    v-on:changeTypeAddMon='changeTypeAddMon($event)'
    v-on:changePageNum='changePageNum($event)'/>
    <DelMonCompany v-if="isShowDelMon" :companyInfo='companyInfo'
    v-on:changePageNum='changePageNum($event)'/>
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
import MonitorDateComp from '@/ProductComp/MonitorDateComp'
import HeaderNavMon from '@/ProductComp/HeaderNavMon'
import bannerBg from '@/images/QMX/banner.png'
import AddMonCompany from '@/ProductComp/AddMonCompany'
import DelMonCompany from '@/ProductComp/DelMonCompany'
import MonitorEmpty from '@/ProductComp/MonitorEmpty'
import MonitorError from '@/ProductComp/MonitorError'

export default {
  name: 'Product',
  data () {
    return {
      isAttentionEmpty: true, // true 为空订单 false为订单列表
      isMonitorError: false, // true 为接口请求报错 显示接口报错空态页面
      isLoading: false,
      pageNumber: 1, // 当前分页数字
      companyName: '', // 公司名
      bannerBg: bannerBg,
      typeAddMon: '', // search：为新增的弹窗，again：再次监测企业的弹窗
      companyInfo: null, // 取消监控 给子组件传递参数用
      monDate: null, // 重新监控企业使用的  监控时间
      addStatus: null // 重新监控的企业提示和 新监控的企业提示不同
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      isLogin: state => state.isLogin,
      totalResultAtt: state => state.MonitorStore.totalResultAtt,
      userName: state => state.userName,
      attentionList: state => state.MonitorStore.attentionList,
      isShowAddMon: state => state.MonitorStore.isShowAddMon,
      isShowDelMon: state => state.MonitorStore.isShowDelMon,
      routerCompanyName: state => state.MonitorStore.routerCompanyName
    })
  },
  watch: {
    userName () {
      if (!!this.userName) {
        this.fetchAttentionList()
      } else {
        this.isAttentionEmpty = true
        this.$store.state.MonitorStore.totalResultAtt = 0
      }
    },
    routerCompanyName () {
      console.log(this.routerCompanyName);
      if (!!this.routerCompanyName) {
        this.companyName = this.routerCompanyName
        this.fetchAttentionList()
      }
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      if (localStorage.getItem('userName')) {
        if (!!this.routerCompanyName) {
          this.companyName = this.routerCompanyName
        }
        this.fetchAttentionList()
      }
    },
    handleCurrentChange (val) {
      // 获取页签数值
      this.pageNumber = val
      this.fetchAttentionList()
    },
    changePageNum (data) {
      this.pageNumber = data
    },
    addMonCompanyFun () {
      // 事件绑定——点击添加监控企业按钮触发
      if (localStorage.getItem('userName')) {
        this.typeAddMon = 'search'
        this.addStatus = null
        this.$store.commit('SHOWADDMON')
      } else {
        this.$store.dispatch('showPoint', '请先登录')
      }
    },
    delMonCompanyFun (data) {
      // 事件绑定——点击取消监控按钮触发
      this.companyInfo = data
      // console.log(data);
      this.$store.commit('SHOWDELMON')
    },
    againMonCompanyFun (item) {
      // 事件绑定——点击新增监控后  弹出框内 确认监控按钮触发
      if (item.statusDsc == 1) {
        // 过期了
        let startTime = service.getNowFormatDate(Date()).substr(0,10)
        let endTime = service.getAfterDate(Date()).substr(0,10)
        this.monDate = startTime + '至' + endTime
      } else if (item.statusDsc == 2) {
        // 取消监控  开始重新监控
        this.monDate = item.monitorPeriod
      }
      this.addStatus = item.statusDsc
      this.$store.dispatch('changeCompanyInfo', item.companyInfoDTO)
      this.typeAddMon = 'again'
      this.$store.commit('SHOWADDMON')
    },
    changeTypeAddMon (data) {
      // 子组件给父组件传递参数
      this.typeAddMon = data
    },
    changeAddstatus (data) {
      this.addStatus = data
      console.log(this.addStatus);
    },
    changeMonDate (data) {
      this.monDate = data
    },
    goToMonitor (data) {
      // 跳转事件绑定 跳转到 预警页面
      this.$router.push({name: 'CompanyMonitor', params:{companyName: data, searchFlag: 1}})
    },
    fetchAttentionList: async function () {
      // 接口请求 ———— 获取企业监测 关注企业的list
      this.isLoading = true
      let params = {
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('LFZXtoken'),
        pageNum: this.pageNumber,
        companyName: this.companyName,
        pageSize: 10
      }
      const res = await http.post(api.getAttentionList + '?Time=' + service.getNowDateTime(), params)
      // console.log(res);
      if (res.status == 200) {
        this.isLoading = false
        if (res.data.status == '-0000' || res.data.status == '-0064') {
          // 成功
          this.$store.dispatch('getAttentionList', res.data)
          this.isAttentionEmpty = false
        } else {
          this.isAttentionEmpty = true
          this.$store.dispatch('showPoint', res.data.msg)
        }
      } else {
        this.isMonitorError =true
        this.isLoading = false
        this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    }
  },
  components: {
    // myCanvas,
    Login,
    PointOut,
    Loading,
    HeaderNavMon,
    MonitorDateComp,
    AddMonCompany,
    DelMonCompany,
    MonitorEmpty,
    MonitorError
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ProductWarp{background: #fff;width: 100%;height: 100%;}
.colorWhite{color: #fff;}
.textBlank{}
.inputBox{margin-top: 20px; }
.Blank{padding:0 10px;}
.queryBtnBox{padding-left: 20px;}
.queryBtn{background: #4AA0D5;color: #fff;padding: 0 10px;
  line-height: 34px;border-radius: 5px;
  border: #5AA0D5 solid 1px;}
.orderListBox{margin:20px auto;border:#eee solid 1px; border-radius: 5px 5px 0 0 ;border-bottom: none;}
.orderListTitle{background: #4AA0D5;border-radius: 5px 5px 0 0 ;}
.titleItem{ padding:10px 0;}
.width25{width: 25%} .width20{width: 20%} .width30{width: 30%;}
.width35{width: 35%} .width12{width: 12%}
.orderList{ }
/* .orderListItem:hover{ background: #dae7ff !important;} */
.orderListBoxWarp{height: 470px;background: #fbfbfc}
.decoration span{ background: #4AA0D5;color: #fff;border-radius: 5px;padding: 8px 15px;}
.decoration .delSpan{color: #4AA0D5; text-decoration: underline;background: #fbfbfc;}
.downLoad{ color: #3b77e3 }
.borderB{border-bottom: #eee solid 1px;}
.borderR{border-right: #eee solid 1px;}
/* .orderList > div:nth-child(2n+1){
  background: #F7F7F8
} */
.hoverItemWidth{width: 210px !important;background: #F9FAFA}
.hoverBox{border:1px solid #eee;}
.hoverItem div{ padding:10px 20px;}
.colorWhite{color: #fff}
.bannerBg{position: relative;margin-top: 2px;}
.bannerBgText{position: absolute;display: inline-block;
  top: 0;line-height: 104px;left: 0px;color: #F4F5F6}
.bannerBgR{opacity: 0.5; position: absolute;display: inline-block;
    top: 0;line-height: 104px;right: 0px;}
.imgBanner{width: 100%;height: 104px;}
.textCenter{width: 1000px;left: 50%;position: absolute;top: 0;transform: translateX(-50%);}
.pr{padding-right: 5px;}
.marginTop20{margin-top:20px }
.between{justify-content: space-between;}
.orderCenter{ width: 1000px; margin: 0 auto;position: relative;}
.pageBox { text-align: right; background: #EFF3FA;padding: 5px 0;}
.minHight{position: relative;min-height: 800px;height: 100%;}
.mB30{margin-bottom: 30px;}
.underline{text-decoration: underline;}
.block{display: inline-block;}
span.cancelBtn{border: #4AA0D5 1px solid;background: #fff; color: #4AA0D5;}
</style>
