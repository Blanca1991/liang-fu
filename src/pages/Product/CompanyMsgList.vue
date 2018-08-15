<!-- 产品适用 企业监测预警 wuxiaobo-->
<template>
  <div class="ProductWarp minWidthBox minHight"  >
    <HeaderNavMon />
    <div class="centerContent">
      <div class="textL font16">
        我的消息
      </div>
      <div class="orderListBoxWarp">
        <div class="orderListBox">
          <div class="orderListTitle colorWhite flex font14 fontBold">
            <div class="titleItem width10">
              序号
            </div>
            <div class="titleItem width15">
              发送日期
            </div>
            <div class="titleItem width15">
              消息标题
            </div>
            <div class="titleItem width50">
              消息内容
            </div>
            <div class="titleItem width10">
              阅读状态
            </div>
          </div>
          <div class="orderList font12" v-if="!isMonitorError">
            <div class="orderListItem flex borderB " v-for="(item, index) in monMsgList" >
              <div class="titleItem borderR width10">
                {{ index+1 }}
              </div>
              <div class="titleItem width15 borderR">
                {{ item.sendTime }}
              </div>
              <div class="titleItem width15 borderR pointer" >
                监控过期提醒
              </div>
              <div class="titleItem borderR width50 textDecoration pointer" @click="isReadFun(item)">
                {{ item.mailContent || '——' }}
              </div>
              <div class="titleItem width10">
                <span v-if="item.status == 0">未读</span>
                <span v-if="item.status == 1">已读</span>
              </div>
            </div>
          </div>
          <div class="pageBox">
            <el-pagination
              background
              :current-page="pageNum"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="totalResultMsg"
              @current-change="handleCurrentChange">
            </el-pagination>
          </div>
          <MonitorError v-if="isMonitorError"/>
        </div>
      </div>
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
import HeaderNavMon from '@/ProductComp/HeaderNavMon'
import MonitorError from '@/ProductComp/MonitorError'

export default {
  name: 'Product',
  data () {
    return {
      isLoading: false,
      pageNum: 1,
      isMonitorError: false
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      isLogin: state => state.isLogin,
      userName: state => state.userName,
      monMsgList: state => state.MonitorStore.monMsgList,
      totalResultMsg:  state => state.MonitorStore.totalResultMsg
    })
  },
  watch: {

  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      if (localStorage.getItem('userName')) {
        this.fetchMessageList()
      }
    },
    handleCurrentChange (val) {
      // 获取页签数值
      this.pageNum = val
      this.fetchMessageList()
    },
    fetchMessageList: async function () {
      let params = {
        pageNum: this.pageNum,
        pageSize: '10',
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('LFZXtoken')
      }
      const res = await http.post(api.getOverdueInfoList + '?time=' + Date.now(), params)
      console.log(res);
      if (res.status == 200) {
        if (res.data.status == 'true') {
          // 成功
          this.$store.dispatch('getMessageList',res.data)
        } else {
          console.log('暂时没有消息');
          // this.$store.dispatch('showPoint', res.data.body.errorMsg)
        }
      } else {
        console.log('网络异常请稍后再试');
        // this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    },
    isReadFun (item) {
      if (item.status == '0') {
        let id = item.id
        this.fetchMessageRead(id)
      }
      this.$store.commit('ROUTERCOMPANYNAME', item.companyName)
      this.$router.push({ name: 'CompanyAttention'})
    },
    fetchMessageRead: async function (id) {
      // 接口请求 ———— 已度未读企业监测的消息list
      let params = {
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('LFZXtoken'),
        id: id
      }
      console.log(params)
      const res = await http.post(api.updateOverdueInfo + '?time=' + service.getNowDateTime(), params)
      console.log(res)
      if (res.status == 200) {
        if (res.data.status == true) {
          this.fetchMessageList()
          this.$store.dispatch('getMessageList',res.data)
        } else {
          console.log('未读修改为已读失败');
        }
      } else {
        this.isMonitorError = true
        this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    },
  },
  components: {
    // myCanvas,
    Login,
    PointOut,
    Loading,
    HeaderNavMon,
    MonitorError
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ProductWarp{background: #fff;width: 100%;height: 100%;}
.colorWhite{color: #fff}
.centerContent{width: 1000px;margin: 10px auto;}
.orderListBox{margin:15px auto;border:#eee solid 1px; border-radius: 5px 5px 0 0 ;
  border-bottom: none;}
.orderListTitle{background: #4AA0D5;border-radius: 5px 5px 0 0 ;}
.titleItem{ padding:10px 0;}
.orderListBoxWarp{height: 530px;background: #fbfbfc;position: relative;}
.width50{width: 50%} .width10{width: 10%}  .width15{width: 15%}
.orderListItem:hover{background: #EFF3FA}
.textDecoration{text-decoration: underline;}
.pageBox { text-align: right; background: #EFF3FA;padding: 5px 0;    position: absolute;
    width: 100%; bottom: 0; left: 0;}
</style>
