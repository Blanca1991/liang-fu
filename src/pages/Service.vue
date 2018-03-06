<!-- 量富服务 wuxiaobo-->
<template>
  <div  class="ServiceWarp minWidthBox background">
    <div class="ComHeaderBox">
      <ComHeader :isActiveComp="isActives" :isLogoShow="isLogoShow"/>
    </div>
    <div class="servicesBox  minWidthBox">
      <div class="listBox flex " >
        <div class="item" v-for="item in servicesList">
          <div class="constantDiv colorFFF">
            <div class="constantDivIn">
              <div class="imgBox">
                  <img :src="item.imgUrl" alt="iconCredit.png">
              </div>
              <div class="titleBox">
                <span class="">{{ item.title }}</span>
              </div>
            </div>
            <div class="hoverDiv secondInfo">
              <div class="flex secondInfoTop">
                <div class="imgBox">
                    <img :src="item.imgUrl" alt="iconCredit.png">
                </div>
                <div class="titleBox font18">
                  <span>{{ item.title }}</span>
                </div>
              </div>
              <div class="secondInfoCenter font16">
                <div class="secondDetail textL">{{ item.detail }}</div>
                <div class="textL">
                  {{ item.secondTitle }}
                </div>
                <div class="textL inItemList" v-for="inItem in item.secondInfo">
                  <div class="">
                    {{ inItem }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ComHeader from '@/components/ComHeader'
import Login from '@/components/Login'
import PointOut from '@/components/PointOut'
// 引入图片
import iconCloud from '../images/home/iconCloud.png'
import iconConsult from '../images/home/iconConsult.png'
import iconCredit from '../images/home/iconCredit.png'
import iconSurvey from '../images/home/iconSurvey.png'

export default {
  name: 'Service',
  data () {
    return {
      isLogoShow: true,
      isActives: 'Service',
      servicesList: [
        {
          title: '企业征信报告',
          imgUrl: iconCredit,
          detail: '协助客户全面掌握供应商、客户、竞争对手、拟投资或收购兼并企业等目标对象的详细背景、经营状况、盈利能力、现金流和偿债意愿。凭借征信平台丰富的数据资源以及大数据处理能力，从企业背景、企业规模、财务状况以及行业展望等方面全方位地评估企业信用风险。通过提供全面、准确的征信报告，为客户建立信用管理体系、控制各种交易或投资风险、避免或减少交易损失，辅助客户制定合理的风险应对措施，从而最大程度地保障客户的商业利益。',
          secondTitle: '企业征信报告可以帮助您：',
          secondInfo: [
            '1、获取值得信赖的合作伙伴',
            '2、有效控制信用风险',
            '3、完善客户群的数据积累',
            '4、发掘潜在商机'
          ]
        },
        {
          title: '实地调查报告',
          imgUrl: iconSurvey,
          detail: '量富征信通过对企业的现场实地勘察以及与企业内部各层次人员的访谈，了解企业真实的经营状况、财务情况以及盈利能力。通过整理，加工和分析调查人员现场勘察的信息，以及各种其他渠道获得的资料，形成完整的企业实地调查报告，从而帮助客户分析交易对手的潜在风险，更好地作出商业决策。',
          secondTitle: '实地调查报告帮助您：',
          secondInfo: [
            '1、实地勘察企业的真实经营状况，充分揭示交易对手的财务风险',
            '2、分析企业的盈利能力、现金流，预测企业未来前景'
          ]
        },
        {
          title: '云审批决策服务',
          imgUrl: iconCloud,
          detail: '量富征信的云审批决策服务旨在帮助小额贷款公司、网络金融平台、汽车金融公司、消费金融公司等金融或类金融机构进行前端风险管理。通过对客户申请信息与外部数据的比对，识别客户的欺诈风险；进而通过大数据挖掘技术，客观评估客户信用风险，预测违约概率。此外，量富征信还将基于进件的风险高低对其准入，风险定价以及授信额度给出决策建议。',
          secondTitle: '云审批决策服务可帮助您：',
          secondInfo: [
            '1、标准化审批流程',
            '2、控制欺诈风险与信用风险，减少损失',
            '3、降低审批成本，提升审批效率'
          ]
        },
        {
          title: '信用风险管理咨询',
          imgUrl: iconConsult,
          detail: '运用量富征信在信用风险管理方面的专业知识与丰富经验，结合国内外金融机构的最佳实践，帮助企业建立或优化其信用风险管理体系，以支持企业更好地完成授信审批和应收账款管理等。量富征信提供的信用风险管理咨询服务涵盖了小额贷款公司、网络金融平台、汽车金融公司、消费金融公司等金融或类金融机构的全信用周期，包括贷前的授信审批，贷中的账户管理以及对逾期账户的催收管理。',
          secondTitle: '信用风险管理咨询服务可以帮助您：',
          secondInfo: [
            '1、优化审批流程，提高审批效率',
            '2、设置差异化的风险定价与合理的额度策略，提高收益率',
            '3、建立风险预警制度，帮助企业识别潜在风险',
            '4、完善客户忠诚度管理，提升客户体验与客户忠诚度',
            '5、差异化的催收策略，降低催收成本，提高催收效率'
          ]
        }
      ]
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
      console.log('init')
    }
  },
  components: {
    ComHeader,
    Login,
    PointOut
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.ServiceWarp {background: #383332;height: 100%;width: 100%;overflow: auto;position: relative;}
.background{background: #333322}
.ComHeaderBox{position: absolute;z-index: 1; width: 100%;}
.servicesBox{height: 100%;width: 100%;position: absolute;}
.listBox {height: 100%;width: 100%;}
.listBox .item{width: 25%; transition: 0.6s all }
.colorFFF{color: #ffffff !important;}
.constantDiv { width: 100%;height:120px;margin-top: 300px;position: relative; box-sizing: border-box;}
.constantDivIn{width: 100%; position: relative;background: #EA5B56;transition: 1s all }
.constantDivIn .imgBox{position: absolute;top: 0%;left: 50%;transform: translateX(-50%) translateY(-50%);}
.constantDivIn .titleBox{line-height: 120px;}
.hoverDiv{ position: absolute; top: -200px;display: none;}
.listBox .item:hover {width: 38%;}
.listBox .item:hover .constantDivIn{ display: none}
.listBox .item:hover .hoverDiv{ display: block;}
.secondInfo{ padding:0 20px; box-sizing: border-box; }
.secondInfoTop { padding: 20px; box-sizing: border-box;}
.secondInfo .secondInfoTop .titleBox{ line-height: 80px; padding-left: 10px;}
.secondInfoCenter{padding: 10px;position: absolute; top: 80px;}
.secondDetail{ width: 140%;text-indent: 32px;}
.inItemList{width: 140%;}
</style>
