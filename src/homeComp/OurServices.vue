<!-- product引用组件 基本身份信息 + 运营商信息 wuxiaobo-->
<template>
  <div class="oueServicesWarp homeItem" id="OurServices">
    <div class="oueServices">
      <div class="font28 servicesTitle">
        <div class="">
          <span>Our Services</span>
        </div>
        <div class="flex circleDivBox">
          <div class="circleDiv"></div>
          <div class="ruleDiv"></div>
          <div class="circleDiv"></div>
        </div>
      </div>
      <div class="servicesList flex">
        <div class="servicesItem" v-for="(item, index) in servicesList">
          <div class="servicesItemBorder">
            <div class="bg">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="textBox">
              <div class="title fontBold font22">
                <span>{{ item.title }}</span>
              </div>
              <div class="article textL ">
                {{ item.article }}
              </div>
            </div>
            <div class="servicesButtonBox flex">
              <div class="servicesButton pointer" @click="goToService()">
                <span >More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iconCloud from '../images/home/iconCloud.png'
import iconConsult from '../images/home/iconConsult.png'
import iconCredit from '../images/home/iconCredit.png'
import iconSurvey from '../images/home/iconSurvey.png'

export default {
  name: 'homeBigBg',
  data () {
    return {
      servicesList: [
        {
          imgUrl: iconCredit,
          title: '企业征信报告',
          article: '协助客户全面掌握供应商、客户、竞争对手、拟投资或收购兼并企业等目标对象的详细背景、经营状况、盈利能力、现金流和偿债意愿。......'
        },
        {
          imgUrl: iconSurvey,
          title: '实地调查报告',
          article: '量富征信通过对企业的现场实地勘察以及与企业内部各层次人员的访谈，了解企业真实的经营状况、财务情况以及盈利能力。通过整理，......'
        },
        {
          imgUrl: iconCloud,
          title: '云审批决策服务',
          article: '量富征信的云审批决策服务旨在帮助小额贷款公司、网络金融平台、汽车金融公司、消费金融公司等金融或类金融机构进行前端风险管理 ......'
        },
        {
          imgUrl: iconConsult,
          title: '信用风险管理咨询',
          article: '运用量富征信在信用风险管理方面的专业知识与丰富经验，结合国内外金融机构的最佳实践，帮助企业建立或优化其信用风险管理体系，......'
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
      // console.log('homeBigBg init')
    },
    goToService () {
      this.$router.push({ name: 'Service' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/homeComp'
</style>
