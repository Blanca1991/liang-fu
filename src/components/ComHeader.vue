<!-- 头部导航栏 -->
<template>
  <div class="comHeaderWarp" >
    <div class="comHeader" >
      <LogoBg :bgHide="bgHides"/>
      <span v-for="(item, index) in items" :key="item.id" @click="gotoInfo(item, index)"
      :class="{ 'navActive': isActive==item.pagesName }" >
        {{ item.message }}
      </span>
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
      bgHides: false
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
        if (!localStorage.getItem('token')) {
          this.$store.dispatch('showPoint', '请先登录')
        } else {
          window.open(window.location.origin + '#/' + item.pagesName)
        }
      } else if (item.pagesName === 'UserInfo') {
        this.$store.commit('SHOWLOGIN')
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
.comHeader{
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #2a2d2c;
  color: #fff;
  height: 80px;
  min-width: 1200px;
}
.comHeader span{
  margin: 0 5px;
  cursor:pointer
}
.comHeader span:hover{
  color: rgb(193, 83, 80);
}
.navActive{
  color: rgb(193, 83, 80);
}
</style>
