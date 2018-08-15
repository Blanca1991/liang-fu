<!-- 引用组件 预警监测使用  选择时间区间组件 wuxiaobo-->
<template>
  <div class="block">
    <!-- <el-date-picker
      v-model="searchTime"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker> -->
    <Col >
      <DatePicker type="daterange"
      placement="bottom"
      placeholder="开始日期 - 结束日期"
      :split-panels='true'
      :start-date="startData"
      :options="options"
      @on-change="getDate($event)"
      style="width: 220px"
      ></DatePicker>
    </Col>
  </div>
</template>

<script>
import service from '@/service'

export default {
  name: 'MonDate',
  data () {
    return {
      startData: new Date(Date.parse(new Date())-2678400000),
      searchTime: [], // 被查询的日期
      options: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
    }
  },
  computed: {

  },
  watch: {},
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {

    },
    getDate ($event) {
      // 子组件给父组件传值 将获取到的日期区间给父组件使用
      this.$emit('getDateArray', $event)
    }
  },
  components: { }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner{width: 250px; height: 38px}
.el-date-editor .el-range-input, .el-date-editor .el-range-separator{}
.el-input__inner{height: 32px;}
.el-select .el-input.is-focus .el-input__inner{color: #444;}
.el-input--suffix .el-input__inner{color: #444;}
.el-select-dropdown__item span{color: #555;font-weight: 400;}
.el-select-dropdown__item.selected span{ color: #409EFF; }
.cursorInitial button{cursor: initial ;user-select: text;white-space: normal;
   color: #333;background: #fafafa;border: none;font-size: 12px;}
.el-popover__reference {height: 0px; color: #333}
.el-pagination.is-background .el-pager li{background: #fff !important;}
.el-pagination.is-background .el-pager li:not(.disabled).active{background-color: #409EFF !important}
.el-button:focus, .el-button:hover { color: #409EFF !important;background: #fafafa !important;border: none !important;}
/* hove 显示公司信息 */
.el-button{background: transparent ; border: none ;}
.el-button { font-size: 12px ; background: #fafafa;border: none}
.el-pagination.is-background .btn-prev{background: #fff !important}
.el-pagination.is-background .btn-next{background: #fff !important}
.el-input__inner{font-size: 12px;height: 32px !important;line-height: 32px !important;}
/* 添加企业监测接口 成功失败 alert */
.el-message{top: 40% !important;min-width: 130px !important;}
/* iView CSS */
.ivu-input { }
.ivu-input:hover { border-color: #c0c4cc;}
.ivu-date-picker-cells-focused em{box-shadow: none;}
.ivu-date-picker-focused input{box-shadow: none}
.ivu-input:focus {box-shadow: none}
.ivu-select-dropdown{font-size: 12px !important;}

</style>
