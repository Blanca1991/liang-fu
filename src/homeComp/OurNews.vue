<!-- home引用组件 新闻模块 wuxiaobo-->
<template>
  <div class="oueServicesWarp ourNewsWarp homeItem" id="OurNews">
    <div class="oueServices ourNews">
      <div class="font28 servicesTitle">
        <div class="">
          <span>Our News</span>
        </div>
        <div class="flex circleDivBox">
          <div class="circleDiv"></div>
          <div class="ruleDiv"></div>
          <div class="circleDiv"></div>
        </div>
      </div>
      <div class="ourNewsListBox" ref="ourNewsListBox">
        <div class="ourNewsList" :style="{left: moveNum}" ref="ourNewsList">
          <div class="ourNewsItem flex" v-for="item in newsList" >
            <div class="ourNewsBg">
              <img :src="imgUrl" alt="newsImg">
            </div>
            <div class="newsInfo">
              <div class="font24">
                <strong>{{ item.title }}</strong>
              </div>
              <div class="font16 newsArticle">
                {{ item.article }}
              </div>
              <div class="moreBtnBox">
                <span class="moreBtn pointer" @click="moreNewsFun">查看更多</span>
              </div>
            </div>
          </div>
        </div>
        <div class="toggleBtnBox ">
          <div class="leftBtn pointer" @click='leftSlide'>
            <em></em>
          </div>
          <div class="rightBtn pointer"  @click='rightSlide'>
            <em></em>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import news from '../images/home/news.jpg'

export default {
  name: 'homeBigBg',
  data () {
    return {
      imgUrl: news,
      newsList: [
        {
          title: '梁信军出席圣彼得堡高峰论坛 复星献策世界经济发展',
          article: '7月4日，复星集团执行董事、总裁汪群斌与蚂蚁金融服务集团总裁井贤栋代表双方在上海正式签署战略合作协议，双方将致力于结合复星集团在医疗、旅游、金融、商业地产等板块的优质资源与蚂蚁金服领先的互联网技术，在互联网+医疗、旅游、金融、商业，及移动支付、数字化服务平台等领域展开深入合作，共同探索创新型解决方案。此次协议的签署是两家企业携手推动信息技术和产业生态融合的第一步。......'
        },
        {
          title: '复星集团与蚂蚁金服签署战略合作协议',
          article: '6月16至18日，复星集团副董事长兼首席执行官梁信军出席第二十届圣彼得堡国际经济论坛。本次论坛，梁信军以就业工作组联合主席的身份，代表该组就讨论的政策建议做了汇报。在汇报中，梁信军建议 “贯彻落实大力推进大众创业、万众创新计划”，希望发起G20智慧网络倡议（SMART）,推动技术创新。同时，在G20国家范围内成立国家创新基金，打造创新技术分享经济平台，建立G20创新签证计划。G20国家还可以发起全国性或全球性的创业大赛来引导万众创新。......'
        },
        {
          title: '复星联合健康保险股份有限公司获准筹建',
          article: '8月3日，复星国际（00656.HK）发布公告宣布，由复星集团发起设立的复星联合健康保险股份有限公司（以下简称“复星联合健康保险”（筹））收到中国保险监督管理委员会的正式批复，批准在广东省广州市筹建，注册资本金为人民币5亿元。复星联合健康保险（筹）将在中国市场积极拓展健康险和健康服务，在各类医疗险、疾病险的领域为消费者提供优质产品，建立以客户为本的服务体系。复星联合健康保险（筹）以健康发展、创新驱动、特色经营、体验至上为宗旨，致力于成为具有国际视野的专业健康保障和健康管理金融服务机构。......'
        },
        {
          title: '郭广昌出席巴西平台签约，新兴市场再迈坚实一步',
          article: '巴西当地时间8月1日，复星集团收购Rio Bravo投资集团签约仪式在巴西圣保罗举行，共同庆祝Rio Bravo——这一巴西市场领先的房地产基金管理公司加入复星的全球化版图。Rio Bravo于2000年开展业务，业务覆盖私募股权、股权基金、信贷基金、基础设施基金、财务咨询和多品类资产组合管理等领域。7月30日，复星集团宣布收购Rio Bravo投资集团，这是复星首次以股权收购形式进入拉美市场。......'
        }
      ],
      moveNum: '',
      screenWidth: document.body.clientWidth,
      needWidth: 1200,
      timer: false
    }
  },
  computed: {},
  watch: {
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let vm = this
        setTimeout(function () {
          // console.log(vm.screenWidth)
          vm.init()
          vm.timer = false
        }, 400)
      }
    }
  },
  mounted () {
    // 钩子函数
    this.init()
    this.play()
  },
  methods: {
    init () {
      // 初始化
      // console.log('OurNews init')
      this.getScreenWidth()
      this.getNeedWidth()
    },
    getScreenWidth () {
      const vm = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          vm.screenWidth = window.screenWidth
          // console.log(vm.screenWidth)
        })()
      }
    },
    getNeedWidth () {
      // let width = this.screenWidth
      // console.log(width)
      this.moveNum = '-0px'
      // if (width < 1200) {
      //   this.needWidth = 1200
      //   this.moveNum = '-' + this.needWidth + 'px'
      // } else {
      //   this.needWidth = document.body.clientWidth
      //   this.moveNum = '-' + this.needWidth + 'px'
      // }
      // console.log(this.needWidth)
    },
    animate (offset) {
      // 获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
      // 且style.left获取的是字符串，需要用parseInt()取整转化为数字。
      //   /////////////////////
      let moveNum = parseInt(this.moveNum)
      let newMoveNum = moveNum + offset
      this.moveNum = newMoveNum.toString() + 'px'
      // this.moveNum = newMoveNum.toString() + 'px'
      let moveLeft = -(3 * Math.abs(offset))
      let moveRight = -0
      // console.log(newMoveNum, moveLeft, moveRight)
      if (newMoveNum < moveLeft) {
        this.moveNum = '0px'
      } else if (newMoveNum > moveRight) {
        this.moveNum = moveLeft + 'px'
      }
    },
    leftSlide () {
      // 事件绑定 —— 左点击事件
      // console.log('leftSlide')
      this.animate(this.needWidth)
    },
    rightSlide () {
      // 事件绑定 —— 右点击事件
      // console.log('rightSlide')
      this.animate(-this.needWidth)
    },
    play () {
      let vm = this
      setInterval(function () {
        vm.rightSlide()
      }, 3000)
    },
    moreNewsFun () {
      this.$router.push({ name: 'News' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/homeComp'
</style>
