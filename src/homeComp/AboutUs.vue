<!-- product引用组件 基本身份信息 + 运营商信息 wuxiaobo-->
<template>
  <div class="oueServicesWarp aboutUsWarp">
    <div class="oueServices">
      <div class="font28 servicesTitle">
        <div class="">
          <span>About Us</span>
        </div>
        <div class="flex circleDivBox">
          <div class="circleDiv"></div>
          <div class="ruleDiv"></div>
          <div class="circleDiv"></div>
        </div>
      </div>
      <div class="aboutUs flex">
        <div class="imgBox">
          <img :src="imgUrl" alt="">
        </div>
        <div class="aboutUsArticles font16" >
          <div class="articles">
            量富征信管理有限公司（简称“量富征信”）是复星集团的下属公司。
          </div>
          <div class="articles">
            为了积极响应市场经济和金融体制改革的市场需求，
            落实十六届三中全会有关“建立建全社会信用体系，
            推动全社会信用体系发展”，复星决定立足集团背景，
            依托多年形成的产业网络体系，发起设立量富征信管理有限公司，
            从事个人和企业征信业务。
          </div>
          <div class="articles">
            <strong>量富征信于</strong>
            <strong>2015年4月30日</strong>
            <span>于上海市宜山路1289号克隆科技园区注册成立，由国内知名民营企业，即复星集团下属的两家机构发起人发起设立，注册资本</span>
            <strong>5500万元。</strong>
            <span>量富征信计划立足上海地区，辐射全国，立志在3-5年内通过提供创新型市场化征信服务成为</span>
            <strong>行业龙头，</strong>
            <span>助力上海建设国际金融中心的宏伟目标。</span>
          </div>
          <div class="aboutUsBtn pointer">
            <span>查看详情</span>
          </div>
          <div class="aboutRuleDiv"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import liangfu from '../images/home/liangfu.png'

export default {
  name: 'homeBigBg',
  data () {
    return {
      imgUrl: liangfu,
      articles: [
        {
          article: '量富征信管理有限公司（简称“量富征信”）是复星集团的下属公司。'
        },
        {
          article: '为了积极响应市场经济和金融体制改革的市场需求，落实十六届三中全会有关“建立建全社会信用体系，推动全社会信用体系发展”，复星决定立足集团背景，依托多年形成的产业网络体系，发起设立量富征信管理有限公司，从事个人和企业征信业务。'
        },
        {
          article: '量富征信于'
        },
        {
          article: '2015年4月30日'
        },
        {
          article: '于上海市宜山路1289号克隆科技园区注册成立，由国内知名民营企业，即复星集团下属的两家机构发起人发起设立，注册资本'
        },
        {
          article: '5500万元。'
        },
        {
          article: '量富征信计划立足上海地区，辐射全国，立志在3-5年内通过提供创新型市场化征信服务成为'
        },
        {
          article: '行业龙头，'
        },
        {
          article: '助力上海建设国际金融中心的宏伟目标。'
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
      console.log('homeBigBg init')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/homeComp'
</style>
