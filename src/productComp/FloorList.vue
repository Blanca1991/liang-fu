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
          title: '联系人圈子',
          bgUrl: phoneBookIcon,
          type: '07'
        },
        {
          title: '疑似APP注册',
          bgUrl: appIcon,
          type: '08'
        },
        {
          title: '历史查询信息',
          bgUrl: historyIcon,
          type: '09'
        },
        {
          title: '点击回到顶部',
          bgUrl: backTopIcon,
          type: '10'
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
      // console.log('baseInfo init')
      this.getAllModelTop()
      this.changeFloorIconBg()
    },
    getAllModelTop () {
      for (let i = 0; i < this.modelListTop.length; i++) {
        this.modelListTop[i].topNum = document.getElementById(this.modelListTop[i].modelName).offsetTop
      }
    },
    gotItem (index) {
      // 事件 ———— 获取每一个楼提层的 位置对应的模块的位置
      if (index !== 9) {
        let data
        if (this.$store.state.isWarning === true) {
          data = this.modelListTop[index].topNum + 155
        } else {
          data = this.modelListTop[index].topNum + 95
        }
        this.$store.dispatch('changeAppScrollTop', data)
      } else {
        // console.log(this.$store.state.appDom.scrollTop)
        let step = this.$store.state.appDom.scrollTop / 20
        let vm = this;
        (function stepMove () {
          if (vm.$store.state.appDom.scrollTop > 0) {
            vm.$store.state.appDom.scrollTop = vm.$store.state.appDom.scrollTop - step
            setTimeout(stepMove, 8)
          } else {
            vm.$store.state.appDom.scrollTop = 0
          }
        })()
        // this.$store.state.appDom.scrollTop = 0
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
      if (appScrollTop < this.modelListTop[1].topNum) {
        this.imgType = '01'
      } else if (appScrollTop >= this.modelListTop[1].topNum && appScrollTop < this.modelListTop[2].topNum) {
        this.imgType = '02'
      } else if (appScrollTop >= this.modelListTop[2].topNum && appScrollTop < this.modelListTop[3].topNum) {
        this.imgType = '03'
      } else if (appScrollTop >= this.modelListTop[3].topNum && appScrollTop < this.modelListTop[4].topNum) {
        this.imgType = '04'
      } else if (appScrollTop >= this.modelListTop[4].topNum && appScrollTop < this.modelListTop[5].topNum) {
        this.imgType = '05'
      } else if (appScrollTop >= this.modelListTop[5].topNum && appScrollTop < this.modelListTop[6].topNum) {
        this.imgType = '06'
      } else if (appScrollTop >= this.modelListTop[6].topNum && appScrollTop < this.modelListTop[7].topNum) {
        this.imgType = '07'
      } else if (appScrollTop >= this.modelListTop[7].topNum && appScrollTop < this.modelListTop[8].topNum) {
        this.imgType = '08'
      } else if (appScrollTop >= this.modelListTop[8].topNum) {
        this.imgType = '09'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
