<!-- 产品适用 企业监测预警 wuxiaobo-->
<template>
  <div class="ProductWarp minWidthBox minHight"  >
    <HeaderNavMon />
    <div class=" bannerBg" >
      <img :src="bannerBg" alt="" class="imgBanner">
      <div class="textCenter">
        <span class="bannerBgText font28">帮助中心</span>
        <span class="bannerBgR colorWhite font32">Help Center</span>
      </div>
    </div>
    <div class="centerContent">
      <div class="textL font22 borderB">
        常见问题
      </div>
      <div class="flex borderB">
        <div class="flex width50 fl item" v-for="item in itemsA">
          <div class="">
            <i class="iconBg" :style="{'background-position-y': item.bg}"></i>
          </div>
          <div class="textL ">
            <div class="font18 title pl20">
              {{ item.title }}
            </div>
            <div class="font14 color666 pr20">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex width50 fl item pt20" v-for="item in itemsB">
          <div class="">
            <i class="iconBg" :style="{'background-position-y': item.bg}"></i>
          </div>
          <div class="textL ">
            <div class="font18 title pl20">
              {{ item.title }}
            </div>
            <div class="font14 color666 pr20">
              <span>{{ item.content }}</span><span v-if="item.tel" class="colorBlue">{{item.tel}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
    <Loading v-show="isLoading"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import PointOut from '@/components/PointOut'
import Loading from '@/components/Loading'
import Login from '@/components/Login'
import HeaderNavMon from '@/ProductComp/HeaderNavMon'
import { baseUrl } from '@/utils/env.js'
import bannerBg from '@/images/QMX/banner.png'
import iconBg from '@/images/QMX/download.png'

export default {
  name: 'Product',
  data () {
    return {
      isLoading: false,
      bannerBg: bannerBg,
      itemsA: [
        {
          title: '什么是企业监测预警服务？',
          bg: '0',
          content: ''
          + '企业监测预警服务是量富征信提供的对目标企业进行信息跟踪、实时监测、'
          + '风险分类预警的企业征信服务。企业用户可以及时了解目标企业变更的风险类事件、预警类事件、'
          + '关注类事件等，以便于第一时间采取相应手段，并为下一步行动提供参考依据。'
        },
        {
          title: '如何申请使用企业监测预警服务？',
          bg: '-50px',
          content: ''
          + '企业用户如需申请企业监测预警服务，可直接拨打咨询电话021-34611615，'
          + '我们的工作人员会和您沟通，完成签约的步骤并为您开通企业账号，'
          + '登陆后即可添加关注企业，并在“预警中心”里实时查看关注企业的变更信息。'
        }
      ],
      itemsB: [
        {
          title: '企业监测预警服务的计费标准？',
          bg: '-100px',
          content: ''
          + '企业监测预警服务按年计费，自关注企业当日起开始按年计费，中途取消不满一个年按一年计费，'
          + '多家关注企业分别计费互不影响。如在监测过程中取消对某家企业的关注，后又重新关注，在监控有效期内将不重复计费。'
          + '目标企业一年监控期结束后需用户手动续期，重新计费后将继续监控。具体费用详情可查阅协议详情，或直接咨询',
          tel: '客服电话：021-34611615。'
        },
        {
          title: '企业监测的范围及更新频次如何？',
          bg: '-150px',
          content: ''
          + '企业监测的范围为企业工商照面信息、股东信息、最终控股股东、主要人员、法人对外投资信息、'
          + '法人其他任职信息、企业对外投资信息、分支机构信息、股权出质信息、动产抵押信息、动产抵押物信息、'
          + '失信信息、被执行信息、股权冻结信息、清算信息、行政处罚信息的新增、变更、删除，监测内容的更新频次为每日。'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      isLogin: state => state.isLogin,
      userName: state => state.userName
    })
  },
  watch: {

  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {

    }
  },
  components: {
    // myCanvas,
    Login,
    PointOut,
    Loading,
    HeaderNavMon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ProductWarp{background: #fafafa;width: 100%;height: 100%;}
.colorWhite{color: #fff}
.bannerBg{position: relative;margin-top: 2px;height: 104px;}
.bannerBgText{position: absolute;display: inline-block;
  top: 0;line-height: 104px;left: 0px;color: #F4F5F6}
.bannerBgR{opacity: 0.5; position: absolute;display: inline-block;
  top: 0;line-height: 104px;right: 0px;}
.centerContent{width: 1000px;margin: 0 auto;}
.borderB{border-bottom: 1px solid #ccc;padding: 20px 0;}
.item{padding: 0 20px 20px 0;box-sizing: border-box;}
.iconBg{display: inline-block; width: 50px;height: 50px;background: url(../../images/QMX/download.png)}
.color666{color: #999;}
.title{line-height: 56px;}
.pt20{padding-top: 20px;}
.pl20{padding-left: 20px;}
.pr20{padding-right: 20px;}
.colorBlue{color: #4AA0D5; word-spacing:0;}
.width50{width: 50%;}
.imgBanner{width: 100%;height: 104px;}
.textCenter{width: 1000px;left: 50%;position: absolute;top: 0;transform: translateX(-50%);}
</style>
