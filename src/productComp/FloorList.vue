<!-- product引用组件 基本身份信息 + 运营商信息 wuxiaobo-->
<template>
  <div class="floorListWarp " v-bind:style="{top: floorListTop}">
    <div class="floorList">
      <div class="floorItem" v-for="(item, index) in list" @click="gotItem(index)">
        <div class="imgTitleBox">
          <div class="imgDiv">
            <img :src="item.bgUrl" alt="" />
          </div>
        </div>
        <div class="">
          <span class="title">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import allSomeIcon from '../images/floorList/allSomeIcon_bg.png'
import baseInfoIcon from '../images/floorList/baseInfoIcon_bg.png'
import tellShopIcon from '../images/floorList/tellShopIcon_bg.png'
import publicIcon from '../images/floorList/publicIcon_bg.png'
import overMonyIcon from '../images/floorList/overMonyIcon_bg.png'
import phoneBookIcon from '../images/floorList/phoneBookIcon_bg.png'
import borrowMoneyIcon from '../images/floorList/borrowMoneyIcon_bg.png'
import appIcon from '../images/floorList/appIcon_bg.png'
import historyIcon from '../images/floorList/historyIcon_bg.png'
import backTopIcon from '../images/floorList/backTopIcon_bg.png'
import {mapState} from 'vuex'

export default {
  name: 'FloorList',
  data () {
    return {
      list: [
        {
          title: '总体评估情况',
          bgUrl: allSomeIcon
        },
        {
          title: '基本身份信息',
          bgUrl: baseInfoIcon
        },
        {
          title: '运营商信息',
          bgUrl: tellShopIcon
        },
        {
          title: '公检法信息',
          bgUrl: publicIcon
        },
        {
          title: '网贷逾期信息',
          bgUrl: overMonyIcon
        },
        {
          title: '多头借贷信息',
          bgUrl: borrowMoneyIcon
        },
        {
          title: '联系人圈子',
          bgUrl: phoneBookIcon
        },
        {
          title: '疑似APP注册',
          bgUrl: appIcon
        },
        {
          title: '历史查询信息',
          bgUrl: historyIcon
        },
        {
          title: '点击回到顶部',
          bgUrl: backTopIcon
        }
      ]
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      floorListTop: state => state.floorListTop
    })
  },
  watch: {},
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('baseInfo init')
      console.log(this.floorListTop)
    },
    getAllModelTop () {
      this.$store.state.summaryInfoTop = document.getElementById('summaryInfo').offsetTop
      this.$store.state.baseInfoTop = document.getElementById('baseInfo').offsetTop
      this.$store.state.telecomInfoTop = document.getElementById('telecomInfo').offsetTop
      this.$store.state.publicSecurityInfoTop = document.getElementById('publicSecurityInfo').offsetTop
      this.$store.state.overdueInfoTop = document.getElementById('overdueInfo').offsetTop
      this.$store.state.borrowingInfoTop = document.getElementById('borrowingInfo').offsetTop
      this.$store.state.contactsInfoTop = document.getElementById('contactsInfo').offsetTop
      this.$store.state.appInfoTop = document.getElementById('appInfo').offsetTop
      this.$store.state.historyInfoTop = document.getElementById('historyInfo').offsetTop
    },
    gotItem (index) {
      console.log(index)
      if (index === 2) {
        let data = 644
        this.$store.dispatch('changeAppScrollTop', data)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
