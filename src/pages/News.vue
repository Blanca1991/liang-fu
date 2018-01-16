<!-- 公司新闻 wuxiaobo-->
<template>
  <div  class="ServiceWarp">
    <ComHeader :isActiveComp="isActives"/>
    <div class="newslistWarp">
      <div class="font28 textL Newstitle">
        新闻资讯
      </div>
      <div class="newslist textL">
        <div class="newsItem flex pointer" v-for="(item, index) in newsList" @click='showTipsBox(item, index)'>
          <div class="imgBox">
            <img :src="item.image" alt="">
          </div>
          <div class="">
            <div class="font18 ">
              {{ item.name }}
            </div>
            <div class="newsContent font14">
              {{ item.content.replace(/(<[^>]+>)/g,"").replace(/([nbsp;]|[&]|[ldquo]|[rdquo])/g,"") }}
            </div>
            <div class="font14">
              {{ item.createdDt.substring(0, 11) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <TipsBox v-show="this.$store.state.isTipsShow" :tipsInfoComp="tipsInfo" :tipsIndexCom="tipsIndex" :newsListCom="newsListNews"/>
    <Login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import service from '@/service'
import http from '@/utils/http'
import api from '@/utils/api'
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'
import PointOut from '@/components/PointOut'
import TipsBox from '@/components/TipsBox'

export default {
  name: 'News',
  data () {
    return {
      isActives: 'News',
      newsList: [],
      tipsInfo: '',
      tipsIndex: 0,
      newsListNews: ''
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      isLogin: state => state.isLogin,
      pointShow: state => state.pointShow
    })
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('News init')
      this.fetchNews()
    },
    fetchNews: async function () {
      // 接口请求 ———— 搜索接口
      let params = {
        page: 1,
        time: service.getNowFormatDate(Date())
      }
      const res = await http.post(api.getArticleInfoPage, params)
      console.log(res)
      if (res.data.type && res.data.type === 'success') {
        // this.pointOutFun('提交成功！')
        this.newsList = res.data.data.content
        this.newsListNews = JSON.parse(JSON.stringify(this.newsList))
        this.newsListNews.unshift({name: 0})
        this.newsListNews.push({name: 0})
        console.log(this.newsListNews)
        console.log(this.newsList)
      } else if (res.data.type === 'false') {
        this.pointOutFun(res.data.message)
      } else {
        this.pointOutFun('系统异常，请稍后再试')
      }
    },
    pointOutFun (data) {
      // 事件调用 -- 调用提示层
      this.$store.dispatch('showPoint', data)
    },
    showTipsBox (item, index) {
      console.log(index)
      this.$store.state.isTipsShow = true
      this.tipsInfo = item
      this.tipsIndex = index
      console.log(this.newsListNews)
    }
  },
  components: {
    ComHeader,
    Login,
    PointOut,
    TipsBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newslistWarp{width: 980px;margin: 0 auto;box-sizing: border-box;}
.Newstitle{margin: 10px 0;}
.newslistWarp .newsItem{margin-bottom: 10px;border-top: 1px dotted #ddd;padding-top: 10px}
.newslistWarp .imgBox{width: 160px;height: 100px;margin-right: 10px;}
.newslistWarp .imgBox img{width: 100%;height: 100%;}
.newsContent{width: 820px;height: 55px;box-sizing: border-box;display: -webkit-box;text-indent: 24px;
  -webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;line-height: 28px;}
</style>
