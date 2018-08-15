<!-- 引用组件 企业监测 关注企业 添加监控企业 wuxiaobo-->
<template>
  <div class="orderOverWarp">
    <div class="orderOver" >
      <div class="queryBox">
        <div class="textBoxSec">
          <div class="titleTop font18">
            <span>取消关注企业</span>
            <i class="closeIcon pointer" @click="closeMonCompanyFun"></i>
          </div>
          <div class="contentBox">
            <div class="textL font14">
              确认取消关注企业信息：
            </div>
            <div class="flex borderT font12 item margin10 color666">
              <div class="borderR borderL bgF9FAFA width50 textR">
                <div class="pR10 borderB ">
                  确认取消企业关注
                </div>
                <div class="pR10 borderB ">
                  取消时间
                </div>
              </div>
              <div class="borderR width50 textL">
                <div class="pL10 borderB ">
                  {{ companyInfo.companyName }}
                </div>
                <div class="pL10 borderB">
                  {{ this.delDate }}
                </div>
              </div>
            </div>
            <div class="font12 textL">
              <div class="tips">
                <i class="el-icon-info"></i>
                该企业监控有效期为：{{ companyInfo.monitorPeriod }}，中途取消将不退回相关费用。
              </div>
            </div>
            <div class="btnBox">
              <span class="queryBtn font14 pointer fontBold" @click="cancelFetchFun">确认取消</span>
            </div>
          </div>
        </div>
      </div>
      <el-button :plain="true" @click="openSuccess" v-show="false"></el-button>
      <el-button :plain="true" @click="openFault" v-show="false"></el-button>
    </div>
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
      companyName: null,
      delDate: service.getNowFormatDate(Date()).substr(0,10), // 当前日期
      isLock: true // 接口防止多次请求开关 true 请求  false 不可请求
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      addMonCompanyList: state => state.QMXStore.addMonCompanyList
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
        message: '取消成功',
        type: 'success',
        duration: 2000
      })
    },
    openFault(){
      this.$message({
        message: '取消失败',
        type: 'error',
        duration: 2000
      })
    },
    closeMonCompanyFun () {
      this.$store.commit('CLOSEDELMON')
    },
    cancelFetchFun () {
      if (this.isLock) {
        this.isLock = false
        this.cancelFetch()
      } else {
        return
      }
    },
    cancelFetch: async function () {
      let params = {
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('LFZXtoken'),
        type: 'remove',
        companyName: this.companyInfo.companyName,
        companyCode: '',
        establishmentDate: '',
        legalPerson: ''
      }
      const res = await http.post(api.addOrRemoveMonitorCompany + '?Time=' + service.getNowDateTime(), params)
      console.log(res)
      if (res.status == 200) {
        if (res.data.status == 'true') {
          this.openSuccess()
          console.log(' 接口请求成功')
          this.$emit('changePageNum', 1)
          this.fetchAttentionList()
          this.closeMonCompanyFun()
        } else {
          this.openFault()
          console.log(' 接口请求失败');
        }
        this.isLock = true
      } else {
        this.isLock = true
        this.openFault()
        console.log(' 接口请求失败');
      }
    },
    fetchAttentionList: async function () {
      // 接口请求 ———— 获取企业监测 关注企业的list
      this.isLoading = true
      let params = {
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('LFZXtoken'),
        pageNum: '1',
        companyName: '',
        pageSize: 10
      }
      const res = await http.post(api.getAttentionList + '?Time=' + service.getNowDateTime(), params)
      if (res.status == 200) {
        this.isLoading = false
        if (res.data.status == '-0000') {
          // 成功
          this.$store.dispatch('getAttentionList', res.data)
          this.isAttentionEmpty = false
        } else {
          this.isAttentionEmpty = true
          // this.$store.dispatch('showPoint', res.data.msg)
        }
      } else {
        this.isAttentionEmpty = true
        this.isLoading = false
        this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    }
  },
  props: ['companyInfo']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orderOverWarp{width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;
  min-width: 1200px;min-height: 800px;}
.orderOver{width: calc(100vw + 20px);height: 100%;top: 0;padding-top: 150px;
  background: rgba(000, 000, 000, 0.3); min-width: 1200px;box-sizing: border-box;}
.textBox{background: #fff;width: 1000px;max-height: 600px; padding-bottom: 30px;
  margin: 0 auto;border-radius: 3px;}
.titleTop{line-height: 60px;color: #333;position: relative;}
.closeIcon{width: 16px;height: 16px;background: url(../images/QMX/icon_close.png);
  display:inline-block;background-size: 100%;position: absolute; top: 20px; right: 20px;}
.contentBox{padding:0px 20px;}
.borderR{border-right: 1px solid #eee}
.borderB{border-bottom: 1px solid #eee}
.borderT{border-top: 1px solid #eee}
.item{line-height: 34px;}
.borderL{border-left: 1px solid #eee}
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
