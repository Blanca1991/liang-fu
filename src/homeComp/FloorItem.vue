<!-- product引用组件 基本身份信息 + 运营商信息 wuxiaobo-->
<template>
  <div class="homeListWarp "  >
    <div class="homeList">
      <div class="floorItem"  @click="gotItem(item, index)"  v-for="(item, index) in dotItemList">
        <div class="dotItem pointer" :class="{isDotItem: item.isDot === isDotType}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'FloorList',
  data () {
    return {
      isDotType: 0, // 状态绑定  是否被选择状态
      dotItemList: [
        {
          dotName: 'BigBg',
          isDot: 0
        },
        {
          dotName: 'OurServices',
          isDot: 1
        },
        {
          dotName: 'AboutUs',
          isDot: 2
        },
        {
          dotName: 'OurNews',
          isDot: 3
        },
        {
          dotName: 'OurAddress',
          isDot: 4
        }
      ]
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      homeItemListTop: state => state.homeItemListTop,
      floorListTop: state => state.floorListTop
    })
  },
  watch: {
    floorListTop () {
      this.changeHomeItemBg()
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
    },
    getAllModelTop () {
      // 获取homeItemListTop内的每个元素的 top值
      for (let i = 0; i < this.homeItemListTop.length; i++) {
        this.homeItemListTop[i].topNum = document.getElementById(this.homeItemListTop[i].modelName).offsetTop
      }
    },
    gotItem (item, index) {
      // 事件绑定 ———— 点击跳转
      // console.log(index)
      this.isDotType = index
      let data = this.homeItemListTop[index].topNum
      this.$store.dispatch('changeAppScrollTop', data)
    },
    changeHomeItemBg () {
      // 事件 ———— 楼梯跟随滚动的Icon 背景色
      // console.log(this.$store.state.appScrollTop)
      let appScrollTop = this.$store.state.appScrollTop
      if (appScrollTop < this.homeItemListTop[1].topNum) {
        this.isDotType = 0
      } else if (appScrollTop >= this.homeItemListTop[1].topNum && appScrollTop < this.homeItemListTop[2].topNum) {
        this.isDotType = 1
      } else if (appScrollTop >= this.homeItemListTop[2].topNum && appScrollTop < this.homeItemListTop[3].topNum) {
        this.isDotType = 2
      } else if (appScrollTop >= this.homeItemListTop[3].topNum && appScrollTop < this.homeItemListTop[4].topNum) {
        this.isDotType = 3
      } else if (appScrollTop >= this.homeItemListTop[4].topNum) {
        this.isDotType = 4
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homeListWarp { position: fixed; right: 0; top: 300px;}
.homeList{ }
.dotItem{ height: 10px;width: 10px;border: 1px solid #fff;margin: 10px;transform: rotate(45deg);}
.isDotItem{ background: #fff;}
</style>
