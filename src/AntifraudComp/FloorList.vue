<!-- product引用组件 基本身份信息 + 运营商信息 wuxiaobo-->
<template>
  <div class="floorListWarp " v-bind:style="{top: floorListTop}">
    <div class="floorList">
      <div class="floorItem" v-for="(item, index) in list" @click="gotItem(index)">
        <div class="imgTitleBox" :class="{isImgTitleBox: item.type === imgType}">
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
import riskListIcon from '../images/floorList/riskListIcon_bg.png'
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
          bgUrl: allSomeIcon,
          type: '01'
        },
        {
          title: '基本身份信息',
          bgUrl: baseInfoIcon,
          type: '02'
        },
        {
          title: '运营商信息',
          bgUrl: tellShopIcon,
          type: '03'
        },
        {
          title: '公检法信息',
          bgUrl: publicIcon,
          type: '04'
        },
        {
          title: '网贷逾期信息',
          bgUrl: overMonyIcon,
          type: '05'
        },
        {
          title: '多头借贷信息',
          bgUrl: borrowMoneyIcon,
          type: '06'
        },
        {
          title: '风险名单信息',
          bgUrl: riskListIcon,
          type: '07'
        },
        {
          title: '联系人圈子',
          bgUrl: phoneBookIcon,
          type: '08'
        },
        {
          title: '疑似APP注册',
          bgUrl: appIcon,
          type: '09'
        },
        {
          title: '历史查询信息',
          bgUrl: historyIcon,
          type: '010'
        },
        {
          title: '点击回到顶部',
          bgUrl: backTopIcon,
          type: '11'
        }
      ],
      imgType: ''
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      floorListTop: state => state.floorListTop,
      modelListTop: state => state.modelListTop
    })
  },
  watch: {
    floorListTop () {
      this.changeFloorIconBg()
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      this.getAllModelTop()
      this.changeFloorIconBg()
    },
    getAllModelTop () {
      for (let i = 0; i < this.modelListTop.length; i++) {
        this.modelListTop[i].topNum = document.getElementById(this.modelListTop[i].modelName).offsetTop
      }
    },
    gotItem (index) {
      console.log(index);
      // 事件 ———— 获取每一个楼提层的 位置对应的模块的位置
      if (index !== 10) {
        let id = '#' + this.modelListTop[index].modelName
        document.querySelector(id).scrollIntoView(true);
      } else {
        document.querySelector('#ProductBox').scrollIntoView(true);
      }
    },
    changeFloorIconBg () {
      // 事件 ———— 楼梯跟随滚动的Icon 背景色
      // console.log(this.$store.state.appScrollTop)
      // let appScrollTop = this.$store.state.appScrollTop - 155
      let appScrollTop
      if (this.$store.state.isWarning === true) {
        appScrollTop = this.$store.state.appScrollTop - 155
      } else {
        appScrollTop = this.$store.state.appScrollTop - 100
      }
      for (var i = 0; i < this.modelListTop.length; i++ ) {
        if (appScrollTop >= this.modelListTop[i].topNum && appScrollTop < this.modelListTop[i+1].topNum) {
          this.imgType = '0' + (i + 1)
        }
      }
      if (appScrollTop < this.modelListTop[1].topNum) {
        this.imgType = '01'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
