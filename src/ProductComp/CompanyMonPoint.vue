<!-- 引用组件 监测预警引用 事件详情弹出wuxiaobo-->
<template>
  <div class="monPointBox" >
    <div class="monPointMsg" :style="{width: widthPoint + 'px'}" :class="{'border': widthPoint > 0}">
      <div class="monPointMsgIn">
        <div class="title font18 fontBold">
          <span>事件详情</span>
          <em class="closeIcon pointer" @click="closePoint">
            <Icon type="close-round" ></Icon>
          </em>
        </div>
        <div class="companyMsg">
          <div class="textL companyMsgTop">
            <div class="">
              <span>企业名称：</span>
              <span>{{ itemInfo.company }}</span>
            </div>
            <div class="">
              <span>变更事项：</span>
              <span>{{ itemInfo.changeItem }}</span>
            </div>
            <div class="">
              <span>风险级别：</span>
              <span>{{ itemInfo.riskLevel }}</span>
            </div>
            <div class="">
              <span>推送日期：</span>
              <span>{{ itemInfo.pushTime }}</span>
            </div>
          </div>
          <div class=" companyMsgBottom" v-if="itemInfo.changeDetail">
            <div class="flex borderB" v-for="(val, key, index) in JSON.parse(itemInfo.changeDetail)">
              <div class="textR borderR pR10 width20">
                {{ key }}
              </div>
              <div class="textL pL10 flex1" v-html="JSON.parse(itemInfo.changeDetail)[key].replace(/；/g, '；<br/>')">
                <!-- {{ val }} -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="mask" @click="closePoint" v-if="widthPoint > 0" ></div> -->
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'CompanyMonPoint',
  data () {
    return {
      dataObj: {
        '变更类型1': '变更法人1',
        '变更类型2': '变更法人2',
        '变更类型3': '变更法人3',
        '变更类型4': '变更法人4',
        '变更类型5': '变更法人5',
        '变更类型6': '变更法人6',
        '变更类型7': '变更法人7'
      },
      htmlDate: ''
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow
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
    closePoint () {
      // 关闭弹出框
      this.$emit('closeComp')
    }
  },
  components: {

　},
  props: [ 'widthPoint', 'itemInfo' ]
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.monPointBox{position: absolute;right: 0px;top: 0px;}
.monPointMsg{background: #fff;width: 0;overflow: hidden;z-index: 2;position: absolute;
  transition:width 1s;right: 0;}
.monPointMsgIn{width: 480px;padding-top: 40px;max-height: 490px;overflow: auto;}
.mask{height: 100vh; width: 100vw; position: absolute; top: -320px;min-height: 900px;
  background: #000; opacity: 0.03; z-index: 1;min-width: 1200px;}
.title{background: #48A0D5;color: #fff;text-align: left;line-height: 42px;
  padding-left: 20px;position: absolute;width: 480px;top: 0;}
.companyMsg{padding: 0 10px;}
.companyMsgTop{background: #FBFBFC;border:1px solid #eee;padding:20px 0 20px 30px;line-height: 32px;
font-size: 14px;margin-bottom: 10px;}
.borderB{border-bottom: 1px solid #eee;}
.borderR{border-right: 1px solid #eee;}
.pR10{padding-right: 10px;}
.pL10{padding-left: 10px;}
.width20{width: 20%;}
.flex1{flex: 1}
.closeIcon{float: right;padding: 0 20px;}
.border{border: 1px solid #eee;}
.companyMsgBottom{background: #FBFBFC;border:1px solid #eee;line-height: 32px;
  font-size: 14px;margin-bottom: 10px;border-bottom: none;}
</style>
