<!-- 头部导航栏 -->
<template>
  <div class="comHeaderWarp minWidthBox" >
    <div class="comHeader minWidthBox" >
      <LogoBg :bgHide="bgHides"/>
      <div class="headerTitle pointer" v-for="(item, index) in items" :key="item.id" @click="gotoInfo(item, index)"
      :class="{ 'navActive': isActive==item.pagesName }" >
        <span>{{ item.message }}</span>
        <div class="productList" v-if="item.pagesName === 'Product'">
          <!-- <div class="productItem pointer font14" @click="itemGo = 1">
            企明星
          </div> -->
          <div class="productItem pointer font14" @click="itemGo = 2">
            星护甲
          </div>
        </div>
      </div>
      <!-- 接收子组件传递的值 dateChild为子组件的值 showMsg是一个监听事件 -->
      <!-- <LoginNav v-on:dateChild="showMsg"/> -->
      <LoginNav />
    </div>
  </div>
</template>

<script>
import LogoBg from '../components/LogoBg'
import LoginNav from '../components/LoginNav'

export default {
  name: 'ComHeader',
  data () {
    return {
      items: [
        {
          message: '首页',
          pagesName: 'Home'
        },
        {
          message: '量富服务',
          pagesName: 'Service'
        },
        {
          message: '公司介绍',
          pagesName: 'Company'
        },
        {
          message: '新闻资讯',
          pagesName: 'News'
        },
        {
          message: '意见建议',
          pagesName: 'Comments'
        },
        {
          message: '招贤纳士',
          pagesName: 'Jobs'
        },
        {
          message: '合作联系',
          pagesName: 'Cooperate'
        },
        {
          message: '产品试用',
          pagesName: 'Product'
        },
        {
          message: '个人中心',
          pagesName: 'UserInfo'
        }
      ],
      isActive: this.isActiveComp,
      bgHides: false,
      itemGo: 0 // 跳转企明星还是星护甲flag
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
    },
    gotoInfo (item, index) {
      if (item.pagesName === 'Product') {
        // 新开一个窗口展示页面
        if (localStorage.getItem('LFZXtoken') === null || localStorage.getItem('LFZXtoken') === '') {
          this.$store.state.isLoginBox = true
          this.$store.dispatch('showPoint', '请先登录')
        } else {
          if (this.itemGo === 2) {
            this.itemGo = 0
            window.open(window.location.href.split('#')[0] + '#/' + item.pagesName)
          } else if (this.itemGo === 1) {
            this.itemGo = 0
            window.open(window.location.href.split('#')[0] + '#/' + 'ProductQMX')
          }
        }
      } else if (item.pagesName === 'UserInfo') {
        if (!localStorage.getItem('LFZXtoken')) {
          this.$store.commit('SHOWLOGIN')
        } else {
          this.$router.push({ name: item.pagesName })
        }
      } else {
        this.$router.push({ name: item.pagesName })
      }
    }
    // showMsg (date) {
    //   console.log(date)
    // }
  },
  components: {
    LogoBg,
    LoginNav
  },
  props: [ 'isActiveComp' ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comHeader{ display: flex; justify-content: space-around;align-items: center;background: #2a2d2c;
  color: #fff;height: 80px;}
.headerTitle{position: relative;height: 80px; line-height: 80px}
.comHeader span{margin: 0 5px;}
.comHeader .headerTitle:hover {color: rgb(193, 83, 80);}
.comHeader .headerTitle:hover .productList{display: block; color: #fff;}
.navActive{color: rgb(193, 83, 80);}
.productList{position: absolute; background: rgb(193, 83, 80); padding:0px 15px;display: none;
  top: 60px ;transition: all 1s;z-index: 22;}
.productItem{margin: 5px 0;width: 50px;height: 20px;line-height: 20px;}
</style>
