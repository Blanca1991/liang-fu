<!-- 引用组件 企业监测 关注企业 添加监控企业 wuxiaobo-->
<template>
  <div class="orderOverWarp">
    <div class="orderOver" v-if="typeAddMon == 'search'">
      <div class="textBox">
        <div class="titleTop font18">
          <span>添加监控企业</span>
          <i class="closeIcon pointer" @click="closeMonCompanyFun"></i>
        </div>
        <div class="contentBox">
          <div class="flex inputBox">
            <div class="input font12">
              <input type="text" name="" value="" v-model="companyName">
            </div>
            <div class="font14 pointer">
              <span class="search" @click="searchCompany">搜索公司</span>
            </div>
          </div>
          <div class="listBox">
            <div class="flex titleItem font12 fontBold">
              <div class="width35">
                企业名称
              </div>
              <div class="width20">
                注册号
              </div>
              <div class="width15">
                法定代表人
              </div>
              <div class="width15">
                成立时间
              </div>
              <div class="width15">
                选择关注
              </div>
            </div>
            <div class="flex item font12 borderB borderL borderR" v-for="item in addMonCompanyList">
              <div class="width35 borderR">
                {{ item.companyName || '——'}}
              </div>
              <div class="width20 borderR">
                {{ item.creditCode || '——'}}
              </div>
              <div class="width15 borderR">
                {{ item.legalPerson || '——'}}
              </div>
              <div class="width15 borderR">
                {{ item.foundingDate || '——' }}
              </div>
              <div class="width15 ">
                <span v-if="item.status == 1" class="blueBtn pointer" @click="addMonFun(item)">加入监控</span>
                <span v-if="item.status == 0 || item.status == 2" class="grayBtn">已监控</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="orderOver" v-if="typeAddMon == 'again'">
      <div class="queryBox">
        <div class="textBoxSec">
          <div class="titleTop font18">
            <span>添加企业关注</span>
            <i class="closeIcon pointer" @click="closeMonCompanyFun"></i>
          </div>
          <div class="contentBox">
            <div class="textL font14">
              确认关注企业信息：
            </div>
            <div class="flex borderT font12 item margin10 color666">
              <div class="borderR borderL bgF9FAFA width50 textR ">
                <div class="pR10 borderB ">
                  企业名称
                </div>
                <div class="pR10 borderB ">
                  成立时间
                </div>
                <div class="pR10 borderB ">
                  法定代表人
                </div>
                <div class="pR10 borderB ">
                  社会统一信用代码/注册号
                </div>
              </div>
              <div class="borderR width50 textL">
                <div class="pL10 borderB ">
                  {{ companyInfo.companyName || '——' }}
                </div>
                <div class="pL10 borderB">
                  {{ companyInfo.foundingDate || '——' }}
                </div>
                <div class="pL10 borderB">
                  {{ companyInfo.legalPerson || '——' }}
                </div>
                <div class="pL10 borderB">
                  {{ companyInfo.creditCode || '——' }}
                </div>
              </div>
            </div>
            <div class="font12 textL">
              <div class="" v-if="isEnter">
                <div class="" v-if="!!!monDate">
                  <span>监控有效期为：</span>
                  <span>{{ startTime }}</span>
                  <span>至</span>
                  <span>{{ endTime }}</span>
                  <div class="tips">
                    <i class="el-icon-info"></i>
                    关注后即可获得该企业最新变更信息，同时从关注日起开始按年计费，中途取消将不退回相关费用
                  </div>
                </div>
                <div class="" v-if="!!monDate">
                  <div class="tips">
                    <i class="el-icon-info"></i>
                    该企业您已加入过监控，<span>{{ monDate }}</span>期间可以正常使用，不再重复计费
                  </div>
                </div>
              </div>
              <div class="" v-if="!isEnter">
                <div class="" v-if="addStatus != '2' ">
                  <div class="" v-if="!!!monDate">
                    <span>监控有效期为：</span>
                    <span>{{ startTime }}</span>
                    <span>至</span>
                    <span>{{ endTime }}</span>
                    <div class="tips">
                      <i class="el-icon-info"></i>
                      关注后即可获得该企业最新变更信息，同时从关注日起开始按年计费，中途取消将不退回相关费用
                    </div>
                  </div>
                  <div class="" v-if="!!monDate">
                    <div class="">
                      <span>监控有效期为： </span>
                      {{ monDate }}
                    </div>
                    <div class="tips">
                      <i class="el-icon-info"></i>
                      关注后即可获得该企业最新变更信息，同时从关注日起开始按年计费，中途取消将不退回相关费用
                    </div>
                  </div>
                </div>
                <div class="" v-if="addStatus == '2' || isAddStatusFlag == true">
                  <div class="tips">
                    <i class="el-icon-info"></i>
                    该企业您已加入过监控，<span>{{ monDate }}</span>期间可以正常使用，不再重复计费
                  </div>
                </div>
              </div>
            </div>
            <div class="btnBox">
              <span class="queryBtn font14 pointer fontBold" @click="queryMonFun">确认添加</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button :plain="true" @click="openSuccess" v-show="false"></el-button>
    <el-button :plain="true" @click="openFault" v-show="false"></el-button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import http from '@/utils/http'
import api from '@/utils/api'
import service from '@/service'

export default {
  name: 'AddMonCompany',
  data () {
    return {
      startTime: service.getNowFormatDate(Date()), // 当前日期
      endTime: service.getAfterDate(Date()),
      companyName: '',
      isAddStatusFlag: false, //monitorPeriod 不为空的时候显示
      isLock: true // 接口防止多次请求开关 true 请求  false 不可请求
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      addMonCompanyList: state => state.MonitorStore.addMonCompanyList,
      companyInfo: state => state.MonitorStore.companyInfo
    })
  },
  watch: {},
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
    },
    openSuccess() {
      this.$message({
        message: '关注成功',
        type: 'success',
        duration: 2000
      })
    },
    openFault(){
      this.$message({
        message: '关注失败',
        type: 'error',
        duration: 2000
      })
    },
    closeMonCompanyFun () {
      this.$store.commit('CLOSEADDMON')
      this.$emit('addStatus', 'null')
    },
    addMonFun (item) {
      this.$store.commit('CHANGECOMPANYINFO', item)
      // this.$emit('addStatus', item.status)
      if (item.monitorPeriod && item.monitorPeriod != '') {
        this.isAddStatusFlag = true
        this.$emit('changeMonDate', item.monitorPeriod)
        this.$emit('changeAddstatus', 2)
      }
      this.$emit('changeTypeAddMon', 'again')
    },
    queryMonFun () {
      if (this.isLock) {
        this.isLock = false
        this.addFetch()
      } else {
        return
      }
    },
    addFetch: async function () {
      let params = {
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('LFZXtoken'),
        type: 'add',
        companyName: this.companyInfo.companyName,
        companyCode: this.companyInfo.creditCode,
        establishmentDate: this.companyInfo.foundingDate,
        legalPerson: this.companyInfo.legalPerson
      }
      const res = await http.post(api.addOrRemoveMonitorCompany + '?Time=' + service.getNowDateTime(), params)
      console.log(res)
      if (res.status == 200) {
        if (res.data.status == 'true') {
          this.$emit('changePageNum', 1)
          this.$store.commit('CLOSEADDMON')
          this.fetchAttentionList()
          this.openSuccess()
          this.$router.push({name: 'CompanyAttention'})
        } else {
          this.openFault()
          // this.$store.dispatch('showPoint', '添加企业失败，请稍后再试！')
        }
      } else {
        this.openFault()
        // this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
      this.isLock = true
    },
    searchCompany () {
      this.$emit('changeMonDate', '')
      if (this.isLock) {
        this.isLock = false
        this.fetchGetCompany()
      } else {
        return
      }
    },
    fetchGetCompany: async function () {
      let params = {
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('LFZXtoken'),
        companyName: this.companyName
      }
      const res = await http.post(api.getCompanyList + '?time=' + Date.now(), params)
      // console.log(res);
      if (res.status == 200) {
        console.log(res.data)
        if (res.data.body && res.data.body.length > 0) {
          this.$store.dispatch('getSearchCompany', res.data)
        } else {
          this.$store.dispatch('showPoint', '暂无数据')
        }
      } else {
        this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
      this.isLock = true
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
      if (res.status == 200) {
        this.isLoading = false
        if (res.data.status == '-0000') {
          // 成功
          this.$store.dispatch('getAttentionList', res.data)
        } else {
          this.$store.dispatch('showPoint', res.data.msg)
        }
      } else {
        this.isAttentionEmpty = true
        this.isLoading = false
        this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    }
  },
  props: [ 'typeAddMon', 'monDate', 'addStatus', 'isEnter' ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orderOverWarp{width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;
  min-width: 1200px;min-height: 910px;}
.orderOver{width: calc(100vw + 20px);height: 100%;top: 0;padding-top: 150px;
  position: absolute;z-index: 23;
  background: rgba(000, 000, 000, 0.3); min-width: 1200px;box-sizing: border-box;}
.textBox{background: #fff;width: 1000px;max-height: 600px; padding-bottom: 30px;
  margin: 0 auto;border-radius: 3px;}
.titleTop{line-height: 80px;color: #333;position: relative;}
.closeIcon{width: 16px;height: 16px;background: url(../images/QMX/icon_close.png);
  display:inline-block;background-size: 100%;position: absolute; top: 20px; right: 20px;}
.contentBox{padding:0px 20px;}
.inputBox{height: 100%;align-items: center;}
.input{flex: 1}
input{width: 100%; text-indent: 12px;height: 34px;}
.search{background: #48A0D5;color: #fff;line-height: 34px;display: inline-block;
  height: 34px;padding: 0 15px;font-weight: bold;}
.width20{width: 20%;}
.width35{width: 35%}
.width15{width: 15%}
.titleItem{background: #48A0D5;color: #fff;line-height: 36px;}
.listBox{margin-top: 20px;min-height: 250px;}
.borderR{border-right: 1px solid #eee}
.borderB{border-bottom: 1px solid #eee}
.borderT{border-top: 1px solid #eee}
.item{line-height: 34px;}
.borderL{border-left: 1px solid #eee}
.blueBtn{background: #48A0D5; padding:6px 15px; color: #fff;border-radius: 4px;}
.grayBtn{background: #BBBBBB; padding:6px 21px; color: #fff;border-radius: 4px;}
.textBoxSec{background: #fff;width: 600px;max-height: 600px; padding-bottom: 30px;
  margin: 0 auto;border-radius: 3px;}
.bgF9FAFA{background: #F9FAFA}
.color666{color: #666}
.width50{width: 50%;}
.pR10{padding-right: 10px;}
.pL10{padding-left: 10px;}
.margin10{margin: 10px 0;}
.tips{opacity: 0.5;line-height: 24px;}
.queryBtn{background: #48A0D5;color: #fff;padding: 10px 25px;border-radius: 3px;}
.btnBox{margin-top: 20px;}
</style>
