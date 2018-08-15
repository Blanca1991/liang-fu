<!-- 产品适用 企业监测预警 wuxiaobo-->
<template>
  <div class="ProductWarp minWidthBox minHight"  >
    <HeaderNavMon />
    <div class=" bannerBg" >
      <img :src="bannerBg" alt="" class="imgBanner">
      <div class="textCenter">
        <span class="bannerBgText font28">监控预警中心</span>
        <span class="bannerBgR colorWhite font32">Monitoring center</span>
      </div>
    </div>
    <div class="orderTop" v-show="hasUserName && !isShowAttnBtn">
      <div class="flex alignCenter">
        <div class="font18">筛选条件</div>
      </div>
      <div class="flex lineLength34px inputBox" >
        <div class="">
          <input type="text" name="" class="searchCompany font12" placeholder="搜索企业" v-model="searchCompany">
        </div>
        <div class="date">
          <MonitorDateComp v-on:getDateArray='getDateArray($event)'/>
        </div>
        <div class="selectBox">
          <el-select v-model="searchMsgStatus"
          clearable placeholder="消息状态">
            <el-option
              v-for="item in optionsMsgStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="selectBox">
          <el-select v-model="searchRiskLevel" clearable placeholder="风险级别">
            <el-option
              v-for="item in optionsRiskLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="selectBox">
          <el-select v-model="searchMonStatus" clearable placeholder="监控状态">
            <el-option
              v-for="item in optionsMonStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="queryBtnBox">
          <span class="queryBtn pointer fontBold font14" @click="searchMonitor">查询</span>
        </div>
      </div>
    </div>

    <div class="marginBottom30" >
      <div class="orderCenter">
        <div class="orderListBoxWarp">
          <div class="orderListBox">
            <div class="orderListTitle colorWhite flex font14 fontBold" v-show="!isShowAttnBtn">
              <div class="titleItem width35">
                企业名称
              </div>
              <div class="titleItem width20">
                风险级别
              </div>
              <div class="titleItem width20">
                变更事项
              </div>
              <div class="titleItem width15">
                变更日期
              </div>
              <div class="titleItem width20">
                变更内容
              </div>
            </div>
            <div class="orderList font12" v-if="!isMonitorError">
              <div class="orderListItem flex borderB" v-show="!isMonitorEmpty && monitorList.length >= 1" v-for="item in monitorList" >
                <div class=" width35 borderR positionR cursorInitial">
                  <em v-if="item.msgStatus == '0'" class="redCircle"></em>
                  <!--  -->
                  <!-- <em class="redircle" v-if="item.msgStatus == '0'"></em> -->
                  <div class="companyHoverBox" v-if="item.company">
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
                      <el-button slot="reference">{{ item.company }}</el-button>
                    </el-popover>
                  </div>
                  <div class="titleItem" v-if="!item.company">
                    ——
                  </div>
                </div>
                <div class="titleItem width20 borderR fontBold">
                  <span class="blueBg" v-if="item.riskLevel == '关注信息'">{{ item.riskLevel}}</span>
                  <span class="redBg" v-if="item.riskLevel == '风险信息'">{{ item.riskLevel}}</span>
                  <span class="orangeBg" v-if="item.riskLevel == '预警信息'">{{ item.riskLevel}}</span>
                  <span v-if="!item.riskLevel">——</span>
                </div>
                <div class="titleItem width20 borderR">
                  <!-- <span v-if="item.changeType == 'add'">【新增】</span>
                  <span v-if="item.changeType == 'remove'">【删除】</span>
                  <span v-if="item.changeType == 'modify'">【修改】</span> -->
                  {{ item.changeItem || '——' }}
                </div>
                <div class="titleItem width15 borderR" >
                  {{ item.altDate || '——' }}
                </div>
                <div class="titleItem width20">
                  <div class="pointer decoration"
                  v-if="item.changeDetail"
                  @click="changeRead(item)">
                    查看变更内容
                  </div>
                  <span v-if="!item.changeDetail" >——</span>
                </div>
                <!-- 查看变更内容的弹出框 -->
                <CompanyMonPoint :widthPoint='widthPoint' v-on:closeComp="closeComp"
                :itemInfo='item' v-if="showId == item.id" />
              </div>
              <MonitorEmpty v-if="isMonitorEmpty || monitorList.length == 0"/>
              <div class="monBtnBox" @click="addMonCompanyFun" v-if="isShowAttnBtn">
                <span class="monBtn font18 pointer">搜索公司 , 加入监控 >></span>
              </div>
              <MonitorError v-if="isMonitorError"/>
            </div>
          </div>
        </div>
        <div class="pageBox">
          <el-pagination
            background
            :current-page="pageNumber"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="totalResultMon"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="mask" @click="closeComp" v-if="widthPoint > 0" ></div>
    <AddMonCompany v-if="isShowAddMon"
    :typeAddMon='typeAddMon' :monDate='monDate'
    :isEnter='isEnter'
    v-on:changeTypeAddMon='changeTypeAddMon($event)'
    v-on:changeMonDate='changeMonDate($event)'
    v-on:changePageNum='changePageNum($event)'/>
    <Login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
    <Loading v-show="isLoading"/>
  </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/utils/api'
import service from '@/service'
import {mapState, mapActions} from 'vuex'
import PointOut from '@/components/PointOut'
import Loading from '@/components/Loading'
import Login from '@/components/Login'
import AddMonCompany from '@/ProductComp/AddMonCompany'
import HeaderNavMon from '@/ProductComp/HeaderNavMon'
import MonitorEmpty from '@/ProductComp/MonitorEmpty'
import MonitorError from '@/ProductComp/MonitorError'
import MonitorDateComp from '@/ProductComp/MonitorDateComp'
import CompanyMonPoint from '@/ProductComp/CompanyMonPoint'
import { baseUrl } from '@/utils/env.js'
import bannerBg from '@/images/QMX/banner.png'

export default {
  name: 'Product',
  data () {
    return {
      isMonitorEmpty: true, // true 为空订单 false为订单列表
      isMonitorError: false, // true 为接口请求报错 显示接口报错空态页面
      isLoading: false,
      isShowAttnBtn: true, // true 显示去关注的btn 第一次进入的初始页
      attentionList: null, // 0 是 attentionList是空的  1：attentionList 是list
      bannerBg: bannerBg, // banner 图（img：src用）
      searchCompany:'', // 被查询的企业名称
      searchTime: [], // 被查询的日期
      searchMsgStatus: '', // 消息状态 已读未读
      searchRiskLevel: '', // 风险级别
      searchMonStatus: '', // 监控状态
      searchFlag: 0, // 0模糊 1精确查询
      pageNumber: 1, // 当前分页数字
      optionsMsgStatus: [
        {
          value: '00',
          label: '全部'
        },
        {
          value: '1',
          label: '已读'
        },
        {
          value: '0',
          label: '未读'
        }
      ],
      optionsRiskLevel: [
        {
          value: '00',
          label: '全部'
        },
        {
          value: '3',
          label: '风险信息'
        },
        {
          value: '2',
          label: '预警信息'
        },
        {
          value: '1',
          label: '关注信息'
        }
      ],
      optionsMonStatus: [
        {
          value: '00',
          label: '全部'
        },
        {
          value: '0',
          label: '监控中'
        },
        {
          value: '1',
          label: '取消监控'
        }
      ],
      widthPoint: 0, // 子组件用到（查看变更详情弹出框）
      showId: null, // item下的 查看更多显示,
      typeAddMon: '', // search：为新增的弹窗，again：再次监测企业的弹窗
      monDate: null, // 重新监控企业使用的  监控时间
      isEnter: true, // 入口是companMonitor 进入的
      hasUserName: localStorage.getItem('userName')? true: false
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      isLogin: state => state.isLogin,
      totalResultMon: state => state.MonitorStore.totalResultMon,
      userName: state => state.userName,
      monitorList: state => state.MonitorStore.monitorList,
      isShowAddMon: state => state.MonitorStore.isShowAddMon,
    })
  },
  watch: {
    userName () {
      this.hasUserName = localStorage.getItem('userName')? true: false
      if (this.userName) {
        this.fetchAttentionList()
      } else {
        this.isMonitorEmpty = true
        this.isMonitorError = false
        this.isShowAttnBtn = false
        this.$store.state.MonitorStore.totalResultMon = 0
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
        if (this.$route.params) {
          this.searchCompany = this.$route.params.companyName
          this.searchFlag = this.$route.params.searchFlag
        }
        this.fetchAttentionList()
      } else {
        this.isShowAttnBtn = false
      }
    },
    handleCurrentChange (val) {
      // 获取页签数值
      this.pageNumber = val
      this.fetchMonitorList()
    },
    addMonCompanyFun () {
      // 事件绑定——点击添加监控企业按钮触发
      if (localStorage.getItem('userName')) {
        this.typeAddMon = 'search'
        this.$store.commit('SHOWADDMON')
      } else {
        this.$store.dispatch('showPoint', '请先登录')
      }
    },
    changePageNum (data) {
      this.pageNumber = data
    },
    changeMonDate (data) {
      this.monDate = data
    },
    showMonPoint () {
      // 显示弹出框 —— 变更内容详情
      var vm = this
      setTimeout(function(){
        vm.widthPoint = 480
      }, 300)
    },
    closeComp () {
      // 关闭弹出框 —— 变更内容详情
      this.widthPoint = 0
    },
    getDateArray (data) {
      // 接受子组件传递过来的日期区间 array
      this.searchTime = data
      console.log(this.searchTime)
    },
    searchMonitor () {
      if (!!localStorage.getItem('userName')) {
        this.pageNumber = 1
        this.fetchMonitorList()
      } else {
        this.$store.dispatch('showPoint', '请先登录')
      }
    },
    changeTypeAddMon (data) {
      // 子组件给父组件传递参数
      this.typeAddMon = data
    },
    changeRead: async function (item) {
      // 接口请求 —— 未读修改已读的接口
      this.showId = item.id
      this.showMonPoint()
      if (item.msgStatus != '0') {
        return
      }
      let params = {
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('LFZXtoken'),
        id: item.id,
        status: '1'
      }
      const res = await http.post(api.updateChangeInfo + '?Time=' + service.getNowDateTime(), params)
      // console.log(res)
      if (res.status == 200) {
        if (res.data.status == '-0000') {
          console.log('修改未读 接口请求成功')
          this.fetchMonitorList()
        } else {
          console.log('修改未读 接口请求失败')
        }
      } else {
        console.log('修改未读 接口请求失败')
      }
    },
    fetchMonitorList: async function () {
      // 接口请求 ———— 获取企业监测 预警监测列表 list
      this.isLoading = true
      let params = {
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('LFZXtoken'),
        pageNum: this.pageNumber,
        pageSize: 10,
        searchFlag: this.searchFlag,
        companyName: this.searchCompany,
        startDate: this.searchTime[0] || '',
        endDate: this.searchTime[1] || '',
        msgStatus: this.searchMsgStatus == '00' ? '' : this.searchMsgStatus,
        riskLevel: this.searchRiskLevel == '00' ? '' : this.searchRiskLevel ,
        monitorStatus: this.searchMonStatus == '00' ? '' : this.searchMonStatus
      }
      const res = await http.post(api.getMonitorInfoList+ '?Time=' + service.getNowDateTime(), params)
      if (res.status == 200) {
        this.isLoading = false
        this.searchFlag = 0
        if (res.data.status == '-0000') {
          // 成功
          this.$store.dispatch('getMonitorList', res.data)
          // this.searchCompany = ''
          // this.searchTime = ''
          // this.searchMsgStatus =  ''
          // this.searchRiskLevel = ''
          // this.searchMonStatus = ''
          if ( res.data.body && res.data.body.length > 0) {
            this.isMonitorEmpty = false
            this.isShowAttnBtn = false
          } else {
            if (this.attentionList == 0) {
              this.isShowAttnBtn = true
            } else {
              this.isShowAttnBtn = false
              this.isMonitorEmpty = true
            }
          }
        } else {
          this.$store.dispatch('showPoint', res.data.msg)
        }
      } else {
        this.isLoading = false
        this.isMonitorError =true
        this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    },
    fetchAttentionList: async function () {
      // 接口请求 ———— 获取企业监测 关注企业的list
      this.isLoading = true
      let params = {
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('LFZXtoken'),
        pageNum: 1,
        companyName: '',
        pageSize: 10
      }
      const res = await http.post(api.getAttentionList + '?Time=' + service.getNowDateTime(), params)
      // console.log(res);
      if (res.status == 200) {
        this.isLoading = false
        if (res.data.status == '-0000' ) {
          // 成功
          if (res.data.body && res.data.body.length > 0) {
            this.attentionList = 1
          } else {
            this.attentionList = 0
          }
          console.log(this.attentionList);
          this.fetchMonitorList()
        } else {
          this.isMonitorEmpty = true
          // this.$store.dispatch('showPoint', res.data.msg)
        }
      } else {
        this.isMonitorEeeor =true
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
    CompanyMonPoint,
    MonitorEmpty,
    AddMonCompany,
    MonitorError
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ProductWarp{background: #fff;width: 100%;height: 100%;}
.colorWhite{color: #fff;}
.orderTop{width: 1000px;background: #EFF3FA;margin: 10px auto;padding:15px 30px;
  box-sizing: border-box;border-radius: 5px;border: 1px solid #eee;}
.orderTop input{text-indent: 12px;border-radius: 4px;margin-right: 20px;
  border: 1px solid #dcdfe6;height: 32px; line-height: 32px;}
input::-webkit-input-placeholder{
color:#C1C4D5 !important;
}
input:focus{border-color: #409EFF;}
.textBlank{}
.inputBox{margin-top: 20px; }
.Blank{padding:0 10px;}
.queryBtnBox{padding-left: 20px;}
.queryBtn{background: #4AA0D5;color: #fff;padding: 0 10px 0px 16px;display: inline-block;
  line-height: 28px; height: 30px;width: 100%;border-radius: 5px;letter-spacing: 6px;
  border: #5AA0D5 solid 1px;text-align: center;}
.orderListBox{margin:15px auto;border:#eee solid 1px; border-radius: 5px 5px 0 0 ;border-bottom: none;}
.orderListTitle{background: #4AA0D5;border-radius: 5px 5px 0 0 ;}
.titleItem{ padding:10px 0;}
.width15{width: 15%} .width8{width: 8%} .width25{width: 25%} .width20{width: 20%} .width30{width: 30%;}
.width35{width: 35%} .width12{width: 12%}
.orderList{ }
/* .orderListItem:hover{ background: #dae7ff !important;} */
.orderListBoxWarp{height: 500px;background: #fbfbfc}
.decoration{text-decoration: underline}
.downLoad{ color: #3b77e3 }
.borderB{border-bottom: #eee solid 1px;}
.borderR{border-right: #eee solid 1px;}
/* .orderList > div:nth-child(2n+1){
  background: #F7F7F8
} */
.positionR{position: relative;}
.redCircle{display: inline-block;width: 8px;height: 8px;background: #C60100;
  border-radius: 50%;position: absolute;left:10px;top:50%;
  transform: translateY(-50%);}
.hoverItemWidth{width: 210px !important;background: #F9FAFA}
.hoverBox{border:1px solid #eee;}
.hoverItem div{ padding:10px 20px;}
.searchCompany{color: #444;width: 220px;}
.searchCompany:hover { border-color: #c0c4cc;}
.colorWhite{color: #fff}
.bannerBg{position: relative;margin-top: 2px;}
.bannerBgText{position: absolute;display: inline-block;
  top: 0;line-height: 104px;left: 0px;color: #F4F5F6}
.bannerBgR{opacity: 0.5; position: absolute;display: inline-block;
  top: 0;line-height: 104px;right: 0px;}
.imgBanner{width: 100%;height: 104px;}
.pr{padding-right: 5px;}
.textCenter{width: 1000px;left: 50%;position: absolute;top: 0;transform: translateX(-50%);}
.orderCenter{ width: 1000px; margin: 0 auto;position: relative;}
.pageBox { text-align: right;padding: 5px 0;background: #EFF3FA}
.minHight{position: relative;min-height: 900px;height: 100%;}
.marginBottom30{ margin-bottom: 30px;}
.selectBox{width: 130px;padding-left: 20px}
.alignCenter{border-bottom: 1px solid #ddd;padding-bottom: 15px}
.blueBg{background: #FFCC66;color: #fff;padding:8px 15px;border-radius: 3px;}
.redBg{background: #E95057;color: #fff;padding:8px 15px;border-radius: 3px;}
.orangeBg{background: #FF805B;color: #fff;padding:8px 15px;border-radius: 3px;}
.monBtnBox{width: 250px; position: absolute; top: 50%; left: 38%;}
.monBtn{background: #4AA0D5; color: #fff; padding: 10px 10px 10px 16px; display: inline-block;
  width: 100%; border-radius: 5px;
    border: #5AA0D5 solid 1px; text-align: center;}
.mask{height: 100vh; width: 100vw; position: absolute; top: 0px;min-height: 900px;
  background: #000; opacity: 0.03; z-index: 1;min-width: 1200px;}
</style>
