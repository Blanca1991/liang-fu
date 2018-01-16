<!-- 公司介绍 wuxiaobo-->
<template>
  <div  class="ServiceWarp minWidthBox">
    <ComHeader :isActiveComp="isActives"/>
    <div class="companyBox">
      <div class="companyBoxTop flex">
        <div class="TopItem listItem" v-for="item in companyList1" @click="showTips(item)">
          <div class="imgBox">
            <img :src="item.imgUrl" alt="">
          </div>
          <div class="itemTitle font18 pointer">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="companyBoxCenter flex">
        <div class="CenterItem listItem" v-for="item in companyList2"  @click="showTips(item)">
          <div class="imgBox">
            <img :src="item.imgUrl" alt="">
          </div>
          <div class="itemTitle font18 pointer">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <TipsBox v-show="this.$store.state.isTipsShow" :tipsInfoComp="tipsInfo"/>
    <login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
    <MaskBox v-show=""/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ComHeader from '@/components/ComHeader'
import MaskBox from '@/components/MaskBox'
import Login from '@/components/Login'
import PointOut from '@/components/PointOut'
import TipsBox from '@/components/TipsBox'
import imgIn from '../images/company/imgIn.png'
import intro1 from '../images/company/intro1.jpg'
import intro2 from '../images/company/intro2.jpg'
import intro3 from '../images/company/intro3.jpg'
import intro4 from '../images/company/intro4.jpg'
import intro5 from '../images/company/intro5.jpg'

export default {
  name: 'Company',
  data () {
    return {
      isActives: 'Company',
      companyList1: [
        {
          name: '公司介绍',
          content: '<div>量富征信管理有限公司（简称“量富征信”）是复星集团的下属公司。<div>' +
            '<div>为了积极响应市场经济和金融体制改革的市场需求，落实十六届三中全会有关“建立建全社会信用体系，推动全社会信用体系发展”，' +
            '复星决定立足集团背景，依托多年形成的产业网络体系，发起设立量富征信管理有限公司，从事个人和企业征信业务。</div>' +
            '<div>量富征信于<strong>2015年4月30日</strong>于上海市宜山路1289号克隆科技园区注册成立，由国内知名民营企业，即复星集团下属的两家机构发起人发起设立，注册资本<strong>5500万元</strong>。量富征信计划立足上海地区，辐射全国，' +
            '立志在3-5年内通过提供创新型市场化征信服务成为<strong>行业龙头</strong>，助力上海建设国际金融中心的宏伟目标。',
          imgUrl: intro1
        },
        {
          name: '组织架构',
          content: '<div>公司设董事长，董事长为公司法定代表人，负责董事会的召集。董事会由3名董事组成，重大事项由公司董事会表决决定。公司聘任总经理，负责公司日常经营管理。</div>' +
            '<div>公司聘任总经理，负责公司日常经营管理。</div>' +
            '<div>公司下设企业征信业务部、ＩＴ部、法律与风险部、市场部、综合管理部五大业务部门，共计61人。详细架构可见下图：</div>',
          imgInUrl: imgIn,
          imgUrl: intro2
        },
        {
          name: '定位和愿景',
          content: '<div>市场定位：做央行征信的有益补充，以社会化和互联网化的手段获取数据和提供征信产品，坚持重度垂直的市场定位。</div>' +
            '<div>企业愿景：扎扎实实开发“接地气”的征信产品，帮助最广泛的人群建立自身信用，并将信用服务无缝提供给各生活化、行业化场景，让交易更简单，生活更便捷，助力实现“诚信中国，信用中国”。</div>' +
            '<div>企业文化：信仰是力量，信用是财富。</div>',
          imgUrl: intro3
        }
      ],
      companyList2: [
        {
          name: '发展策略',
          content: '<div>数据： 量富征信设立之初将以复星集团的资本为纽带，全面整合各资本关联企业的数据资源，为量富征信的起航打下坚实基础；恪守征信监管规则，严守“两个第三方”原则，在保护隐私权的前提下获取、加工和使用数据。</div>' +
            '<div>产品：“一个原则+四化”即坚持重度垂直原则，产品要生活化，便捷化，无缝化，行业化。</div>' +
            '<div>市场（服务场景）：重度垂直的产品决定了我们要植根各专业垂直市场，把产品嵌入各垂直市场的业务流程中，服务实体经济，提升行业交易效率和客户体验。</div>' +
            '<div>平台：纯互联网大数据平台采集加工存储数据，确保数据多样性和安全性。</div>',
          imgUrl: intro4
        },
        {
          name: '恪守原则',
          content: '<div><strong>量富征信必须成为独立的第三方征信服务提供商</strong></div>' +
            '<div>征信数据的独立公正性：量富征信面向全体社会成员收集信用信息，并按照平等的商务条件提供给所有合格的下游信息使用方，不会以任何形式优先使用或照顾利益关联方。</div>' +
            '<div>股权结构和征信业务之间的独立性： 在日常经营活动中实现所有权和运营权的分离，隔离股东对征信产品和服务的影响。</div>' +
            '<div>严格限制自身的业务范围，和上游的数据源及下游的信用场景服务对象明确分工、各司其职，从源头上避免利益冲突，进而避免影响服务的独立性。</div>' +
            '<div>充分尊重信息主体的知情权和使用授权。</div>',
          imgUrl: intro5
        }
      ],
      tipsInfo: {
        detail: [],
        imgUrl: ''
      }
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
      console.log('Company init')
    },
    showTips (item) {
      this.$store.state.isTipsShow = true
      this.tipsInfo = item
    }
  },
  components: {
    ComHeader,
    Login,
    PointOut,
    MaskBox,
    TipsBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.companyBox{width: 1200px; margin: 0 auto; margin-top: 20px;}
.imgBox{width: 100%;}
.imgBox img{width: 100%;}
.TopItem{width: 33.3%; margin:5px;height: 220px; overflow: hidden;position: relative;}
.CenterItem{width: 50%; margin:5px;height: 220px; overflow: hidden;position: relative;}
.itemTitle{position: absolute;bottom:0;height: 45px;line-height: 45px;width: 100%;
  background: rgba(0,0,0,0.5 ) ;color: #fff;}
.listItem:hover .itemTitle{height: 220px;line-height: 180px; transition: 1s height;
  background: rgba(0,0,0,0.5 ) url(../images/company/eye.png) no-repeat center 60%;}
</style>
