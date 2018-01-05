<!-- product引用组件 基本身份信息 + 运营商信息 wuxiaobo-->
<template>
  <div class="floorListWarp " v-bind:style="{top: '160px'}">
    <div class="floorList">
      <div class="floorItem" v-for="item in list">
        <div class="">
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FloorList',
  data () {
    return {
      list: [
        {
          title: '总体评估情况',
          bgUrl: 'allSomeIcon_bg.png'
        },
        {
          title: '基本身份信息',
          bgUrl: 'baseInfoIcon_bg.png'
        },
        {
          title: '运营商信息',
          bgUrl: 'tellShopIcon_bg.png'
        },
        {
          title: '公检法信息',
          bgUrl: 'publicIcon_bg.png'
        },
        {
          title: '网贷逾期信息',
          bgUrl: 'overMonyIcon_bg.png'
        },
        {
          title: '多头借贷信息',
          bgUrl: 'historyIcon_bg.png'
        },
        {
          title: '联系人圈子',
          bgUrl: 'phoneBookIcon_bg.png'
        },
        {
          title: '疑似APP注册',
          bgUrl: 'appIcon_bg.png'
        },
        {
          title: '历史查询信息',
          bgUrl: 'historyIcon_bg.png'
        },
        {
          title: '点击回到顶部',
          bgUrl: 'backTopIcon_bg.png'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('baseInfo init')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/productComp'
</style>
