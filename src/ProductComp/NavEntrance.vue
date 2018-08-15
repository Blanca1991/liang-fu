<!-- 引用组件 征信报告 监测预警 头部左侧引用入口 wuxiaobo-->
<template>
  <div class="flex">
    <div class="flex">
      <div class="logo">
        <img class="img2" :src="qimingxing" alt="qimingxing_logo" >
        <span class="logoLeft"></span>
        <span class="pointer title font18" v-for="(item, index) in items" @click="goTo(index)" :class="{ 'titleActive': isActive==index }">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import qimingxing from '@/images/qimingxing_logoQ.png'
import {mapState} from 'vuex'

export default {
  name: 'NavEntrance',
  data () {
    return {
      items: [
        '企业征信报告',
        '企业监测预警'
      ],
      isActive: 0, // 控制入口被选中的颜色
      isUserName: localStorage.getItem('userName'),
      qimingxing: qimingxing
    }
  },
  watch: {
    userName () {

    }
  },
  computed: {
    ...mapState({
      // 获取数据
      userName: state => state.userName
    })
  },
  mounted () {
    // 钩子函数
    this.init()
    // console.log(this.qmxOrderCode);
  },
  methods: {
    init () {
      // 初始化
      // console.log('init')
      if (window.location.hash == '#/CompanyMonitor.html' ||
       window.location.hash == '#/CompanyAttention.html' ||
       window.location.hash == '#/CompanyHelp.html' ||
       window.location.hash == '#/CompanyMsgList.html') {
        this.isActive = 1
      } else if (window.location.hash == '#/ProductQMX.html' || window.location.hash == '#/ProductQMXOrder.html') {
        this.isActive = 0
      } else {
        this.isActive = null
      }
    },
    goTo (index) {
      this.isActive = index
      if (index == 0) {
        // 征信报告
        this.$router.push({ name: 'ProductQMX' })
      } else if (index == 1) {
        // 监测预警
        this.$router.push({ name: 'CompanyMonitor' })
      }
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.positionR{position: relative;}
.logo .img2{ width: 110px;}
.title{ padding: 0 20px;color: #666;border-right: 1px solid #eee;}
.titleActive{color: #4AA0D5}
.logo{display: flex;align-items:center;margin-left: 20px; height: 58px;}
.logoLeft{display: inline-block;height: 56px;width: 2px;
  margin-left:20px;border-left: 1px solid #eee;}
</style>
