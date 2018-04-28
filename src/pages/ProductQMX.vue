<!-- 产品适用 wuxiaobo-->
<template>
  <div class="ProductWarp minWidthBox minHight" >
    <HeaderNav />
    <div class="myCanvasBox">
      <!-- <myCanvas :dotsNum="50" :isColor="false" /> -->
      <div class="CanvasBox">
        <canvas id="Mycanvas" style="background: rgba(255,255,155,0);"></canvas>
      </div>
      <div class="topTextBox">
        <div class="font36 colorWhite">
          下报告，查企业，就上企明星！
        </div>
        <div class="font14">
          <input class="searchInput font14" type="text"
          v-model="searchValue" placeholder="请输入完整的企业名/注册号/统一社会信用代号">
        </div>
        <div class="colorWhite font12 yangli pointer" @click="goPdf">
          点击查看企业征信报告样例 > >
        </div>
        <div class="submitBox">
          <span class="submit colorWhite font18 pointer" @click="submitFun">提交</span>
        </div>
      </div>
    </div>
    <div class="newsBox">
      <div class="newsTips">
        <span class="newsTipsText font16">行业使用案例</span>
      </div>
      <div class="newsListBoxWarp">
        <div class="newsListBox flex">
          <div class="newsItem" v-for="item in newsList">
            <div class="">
              <img :src="item.img" alt="">
            </div>
            <div class="font16 newsTitle textL">
              {{ item.titleName }}
            </div>
            <div class="textL newsMsg font14">
              {{ item.newsMsg }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="colorWhite TextBottom">
      <span>量富征信管理有限公司版权所有©沪ICP备18002309号-1</span>
    </div>
    <!-- 三个月内重复调用提示 -->
    <div class="submitTipsBox" v-if="threeTips">
      <div class="submitTips submitPoint">
        <div class="textTip colorWhite font14">
          温馨提示
        </div>
        <div class="textCenter font14">
          <div class="">
            您在三个月内已提交该企业征信报告订单，
          </div>
          <div class="">
            是否重新计费生成报告？
          </div>
        </div>
        <div class="bgLine"></div>
        <div class="colorWhite flex btnBox font14">
          <div class="blueBg pointer" @click="yesfetchSubmit">
            是
          </div>
          <div class="blueBg pointer" @click="hidTipsBox">
            否
          </div>
        </div>
      </div>
    </div>
    <!-- 三个月内重复调用提示 -->
    <Login v-show="isLogin"/>
    <PointOut v-show="pointShow" />
    <Loading v-show="isLoading"/>
    <OrderOver v-show="isQmxSubTips" />
  </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/utils/api'
import service from '@/service'
import {mapState} from 'vuex'
import LogoBg from '@/components/LogoBg'
import PointOut from '@/components/PointOut'
import Loading from '@/components/Loading'
import LoginNav from '@/components/LoginNav'
import HeaderNav from '@/QmxComp/HeaderNav'
import Login from '@/components/Login'
import OrderOver from '@/QmxComp/OrderOver'
import news01 from '@/images/QMX/news01.png'
import news02 from '@/images/QMX/news02.png'
import news03 from '@/images/QMX/news03.png'

export default {
  name: 'Product',
  data () {
    return {
      threeTips: false, // 企明星 三个月重复提交提示
      searchValue: '', // 查询的企业代码或者企业的名称
      news01: news01,
      news02: news02,
      news03: news03,
      bgHides: false, // 星护甲logo 显示和隐藏
      isLoading: false, // 加载动画 显示和隐藏
      isDownLoad: false,
      isMsgShow: false, // 控制消息列表的显示
      newsList: [
        {
          titleName: '政府部门',
          img: news01,
          newsMsg: '结合政府部门工作的特点，开发具有政府特色的风险与信用综合分级管理征信体系。实时监控管辖领域内企业的风险点，一旦触碰风险，监管部门可及时知悉，并作出相应决策。'
        },
        {
          titleName: '金融行业',
          img: news02,
          newsMsg: '量富征信依托自身优秀的风控能力及人工智能技术，提供金融体系的客户信息完善，贷前反欺诈过滤，申请评分模型，贷后监控等全面风控解决方案，提升信审效率，降低运营风险。'
        },
        {
          titleName: '采招行业',
          img: news03,
          newsMsg: '量富征信依托复星集团采购平台构建基于诚信的供应链采招服务体系，提供面向供应商的基础审核、资质审查、围标检测，招标审核、履约监控服务，实现采招流程的公开化和透明性。'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      pointShow: state => state.pointShow,
      isLogin: state => state.isLogin,
      isQmxSubTips: state => state.QMXStore.isQmxSubTips
    })
  },
  mounted () {
    // 钩子函数
    this.initFun()
  },
  methods: {
    initFun () {
      // 初始化
      this.canvasFun()
    },
    submitFun () {
      if (localStorage.getItem('userName')) {
        if (this.searchValue) {
          // let  onkeyup="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')"
          // let reglank = /^\s*(\S+)\s*$/;
          // let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
          this.searchValue = this.searchValue.replace(/^\s+|\s+$/gm,'')
          this.fetchCheckThree()
          // if (reg.test(this.searchValue)) {
          //   this.fetchCheckThree()
          // } else {
          //   this.$store.dispatch('showPoint', '请输入正确的企业名/注册名/统一社会信用代号')
          // }
        } else {
          this.$store.dispatch('showPoint', '请输入企业名/注册名/统一社会信用代号')
        }
      } else {
        this.$store.dispatch('showPoint', '请先登录')
      }
    },
    goPdf () {
      // 跳转到Pdf 查看pdf样例
      // this.$router.push({ name: 'QmxPdf' })
      // this.$store.commit('CHANGEPDFURL', '../staticV2/pdf/征信报告样例.pdf')
      let pdfName = '/staticV2/pdf/征信报告样例.pdf'
      pdfName = encodeURI(encodeURI(pdfName))
      window.open(window.location.href.split('#')[0] +'/staticV2/pdf/征信报告样例.pdf')
      // window.open(window.location.href.split('#')[0] +'/staticV2/pdf/SampleReport.pdf')
    },
    yesfetchSubmit () {
      // 三个月内重复提交  走提交接口
      this.threeTips = false
      this.fetchSubmit()
    },
    hidTipsBox () {
      // 三个月内重复提交  提示关闭
      this.threeTips = false
    },
    fetchSubmit: async function () {
      // 接口请求 ———— 查询企业订单提交
      this.isLoading = true
      let params = {
        body: {
          keyWord: this.searchValue,
          token: localStorage.getItem('LFZXtoken')
        },
        header: {
          reqFlag: '0',
          source: 'web',
          userName: localStorage.getItem('userName'),
          reqDateTime: service.getNowFormatDate(Date()),
          reqTransID: ''
        }
      }
      // console.log(params)
      const res = await http.post(api.searchSubmit, params)
      // console.log(res)
      if (res.status == 200) {
        this.isLoading = false
        if (res.data.body.success != 'false') {
          this.$store.commit('SHOWQMXSUBTIPS')
          let vm = this
          setTimeout(function(){
            vm.getMessageInfo()
          }, 4000)
          // setTimeout(function(){ vm.HeaderNav.methods.fetchMessage() }, 3000);
        } else if(res.data.body.success == 'false' && res.data.body.errorMsg == null){
          this.$store.dispatch('showPoint', '未搜索到相关企业，请重新输入')
        } else {
          this.$store.dispatch('showPoint', res.data.body.errorMsg)
        }
      } else {
        this.isLoading = false
        this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    },
    fetchCheckThree: async function (){
      // checkThreeMonths
      // 接口请求 ———— 判断三个月内是否有重复调用
      this.isLoading = true
      let params = {
        body: {
          keyWord: this.searchValue,
          token: localStorage.getItem('LFZXtoken')
        },
        header: {
          reqFlag: '0',
          source: 'web',
          userName: localStorage.getItem('userName'),
          reqDateTime: service.getNowFormatDate(Date()),
          reqTransID: ''
        }
      }
      const res = await http.post(api.checkThreeMonths + '?time=' + Date.now(), params)
      // console.log('', res);
      if (res.status == 200) {
        // console.log(res.data.body.success);
        if (res.data.body.success == 'true') {
          this.isLoading = false
          this.threeTips = true
        } else if (res.data.body.success == 'false' && res.data.body.errorMsg == null) {
          this.fetchCheckEmpty()
          // this.fetchSubmit()
        } else {
          this.isLoading = false
          this.$store.dispatch('showPoint', res.data.body.errorMsg)
        }
      } else {
        this.$store.dispatch('showPoint', '网络异常请稍后再试')
        this.isLoading = false
      }
    },
    fetchCheckEmpty: async function () {
      // 接口请求 ———— 判断提交的企业是否存在
      this.isLoading = true
      let params = {
        body: {
          keyWord: this.searchValue,
          token: localStorage.getItem('LFZXtoken')
        },
        header: {
          reqFlag: '0',
          source: 'web',
          userName: localStorage.getItem('userName'),
          reqDateTime: service.getNowFormatDate(Date()),
          reqTransID: ''
        }
      }
      const res = await http.post(api.checkEmpty + '?time=' + Date.now(), params)
      // console.log('checkEmpty', res);
      if (res.status == 200) {
        if (res.data.body.success == 'true') {
          this.fetchSubmit()
        } else {
          this.isLoading = false
          this.$store.dispatch('showPoint', res.data.body.errorMsg)
        }
      } else {
        this.$store.dispatch('showPoint', '网络异常请稍后再试')
        this.isLoading = false
      }
    },
    getMessageInfo () {
      this.fetchMessage()
    },
    fetchMessage: async function () {
      // 接口请求 ———— 获取企明星的消息list
      this.isLoading = true
      let params = {
        body: {
          pageNum: '1',
          orderCode: '',
          companyName: '',
          isMsgOrderFlag: 'message',
          token: localStorage.getItem('LFZXtoken')
        },
        header: {
          reqFlag: '0',
          source: 'web',
          userName: localStorage.getItem('userName'),
          reqDateTime: service.getNowFormatDate(Date()),
          reqTransID: ''
        }
      }
      // console.log(params)
      const res = await http.post(api.getOrderList + '?time=' + Date.now(), params)
      if (res.status == 200) {
        console.log(res.data.body.success);
        if (res.data.body.success != 'false') {
          // 成功
          // console.log("拉取数据")
          // 更新消息通知列表
          this.$store.dispatch('changeMessageList', res.data.body.result)
          // 添加未读消息数字的 方法
          this.$store.commit('CHANGEREADNUM', res.data.body.result.noReadNum)
        } else {
          console.log('暂时没有消息');
          this.isNoMessage = true;
          // this.$store.dispatch('showPoint', res.data.body.errorMsg)
        }
        this.isLoading = false
      } else {
        this.isLoading = false
        this.isNoMessage = true;
        console.log('网络异常请稍后再试');
        // this.$store.dispatch('showPoint', '网络异常请稍后再试')
      }
    },
    canvasFun () {
      // canvas 的设置
      var windowWidth = (window.innerWidth > 1200) ? window.innerWidth : 1200
      // console.log(windowWidth)
      var POINT = 35
      var canvas = document.getElementById('Mycanvas')
  		canvas.width = 1200
  		canvas.height = 400
  		var context = canvas.getContext('2d')
      // console.log(context)
  		context.fillStyle = 'rgba(255, 255, 255, 0.8)'
      context.fillRect(0, 0, windowWidth, 400)
  		context.strokeStyle = 'rgba(255, 255, 255, 0.2)'
  		context.strokeWidth = 1
  		var circleArr = []
      // 线条：开始xy坐标，结束xy坐标，线条透明度
  		function Line (x, y, _x, _y, o) {
  			this.beginX = x,
  			this.beginY = y,
  			this.closeX = _x,
  			this.closeY = _y,
  			this.o = o
  		}
      // 点：圆心xy坐标，半径，每帧移动xy的距离
  		function Circle (x, y, r, moveX, moveY) {
  			this.x = x,
  			this.y = y,
  			this.r = r,
  			this.moveX = moveX,
  			this.moveY = moveY
  		}
      // 生成max和min之间的随机数
  		function num (max, _min) {
  			var min = arguments[1] || 0;
  			return Math.floor(Math.random() * (max - min + 1) + min)
  		}
      // 绘制原点
  		function drawCricle (cxt, x, y, r, moveX, moveY) {
  			var circle = new Circle(x, y, r, moveX, moveY)
  			cxt.beginPath()
  			cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
  			cxt.closePath()
        // cxt.fillStyle = '#0D4C96'
  			cxt.fill()
  			return circle
  		}
  		// 绘制线条
  		function drawLine (cxt, x, y, _x, _y, o) {
  			var line = new Line(x, y, _x, _y, o)
  			cxt.beginPath()
  			cxt.strokeStyle = 'rgba(255, 255, 255, ' + o + ')'
  			cxt.moveTo(line.beginX, line.beginY)
  			cxt.lineTo(line.closeX, line.closeY)
  			cxt.closePath()
  			cxt.stroke()
  		}
  		// 初始化生成原点
  		function init () {
  			circleArr = []
  			for (var i = 0; i < POINT; i++) {
  				circleArr.push(drawCricle(context, num(windowWidth), num(400), num(5, 2), num(10, -10)/40, num(10, -10)/40));
  			}
  			draw()
  		}
      // 每帧绘制
  		function draw () {
  			context.clearRect(0, 0, canvas.width, canvas.height)
  			for (var i = 0; i < POINT; i++) {
  				drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r)
  			}
  			for (var i = 0; i < POINT; i++) {
  				for (var j = 0; j < POINT; j++) {
  					if (i + j < POINT) {
  						var A = Math.abs(circleArr[i+j].x - circleArr[i].x)
  						var	B = Math.abs(circleArr[i+j].y - circleArr[i].y)
  						var lineLength = Math.sqrt(A*A + B*B)
  						var C = 1/lineLength*7-0.009 // 设置线条的个数 0.009变大 则线条个数减少 变小线条个数增加
  						var lineOpacity = C > 0.08 ? 0.08 : C
  						if (lineOpacity > 0) {
  							drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i + j].x, circleArr[i + j].y, lineOpacity);
  						}
  					}
  				}
  			}
  		}
      // 调用
      init();
      setInterval(function () {
      	for (var i = 0; i < POINT; i++) {
          var cir = circleArr[i]
      		cir.x += cir.moveX
      		cir.y += cir.moveY
      	if (cir.x > windowWidth) {
          cir.x = 0
        } else if (cir.x < 0) {
          cir.x = windowWidth
        }
        if (cir.y > 400) {
          cir.y = 0
        } else if (cir.y < 0) {
          cir.y = 400
        }
      }
      draw()
    }, 16)
      // end
    }
  },
  components: {
    // myCanvas,
    LogoBg,
    LoginNav,
    Login,
    PointOut,
    Loading,
    HeaderNav,
    OrderOver
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myCanvasBox{background: #0D4C96;width: 100%;height:400px;min-width: 1200px;position: relative;}
.colorBlue{color: #3b77e3}
.colorWhite{color: #fff;}
.topTextBox{ position: absolute; top: 50%;left: 50%;height: 250px;width: 600px;
  transform: translateX(-50%) translateY(-50%);}
.searchInput{width: 600px;height: 46px;background: #fafafa;text-indent: 12px;margin-top: 30px;
  border-radius: 5px;border:#ccc solid 1px;outline:medium;}
::-webkit-input-placeholder{color: #999;}
.yangli{margin-top: 20px;}
.submitBox{margin-top: 20px;}
.submit{display: inline-block;background: #0366c3;border-radius: 5px;border:1px solid #fff;
  padding: 10px 30px;}
.newsBox{min-width: 1200px;width: 100%;position: relative; padding-top: 50px;}
.newsListBoxWarp{ margin: 0 auto; width: 1100px;}
.newsTips{width: 1100px; height: 1px;background: #ccc;top: 55px;
  position: absolute;transform: translateX(-50%);left: 50%;}
.newsTipsText{color: #0d4492;background: #fff;position: absolute;top: -10px;padding: 0 30px;
  left: 50%;transform: translateX(-50%);}
.newsListBox{margin-top: 60px;width: 1100px;display: flex;justify-content: space-between;}
.newsItem{width: 320px;}
.newsMsg{color: #999;}
.newsItem img{width: 100%;height: auto;}
.newsTitle{color: #0d4492;margin: 10px 0;}
.TextBottom{background: #2d3237;height: 58;line-height: 58px;position: absolute;bottom: 0;
  width: 100%;min-width: 1200px;}
.minHight{position: relative;min-height: 1000px;height: 100%;}
.submitTipsBox{position:fixed;top: 0;min-width: 1200px; width: 100vw;height: 100vh;
  min-height: 1000px;background: rgba(0,0,0, 0.3);}
.submitTips{width: 400px; height: 250px;background: #fff; position: absolute; top: 40%;left: 50%;
  transform: translateX(-50%) translateY(-50%);border-radius: 5px;}
.textTip{background: #3b77e3;height: 40px;width: 100%;line-height: 40px;text-align: left;padding-left: 20px;
  box-sizing: border-box;border-radius: 5px 5px 0 0 ;}
.colorWhite{color: #fff;}
.textCenter{text-align: center; margin-top: 60px;}
.bgLine{background: #f1f1f1;width: 90%;margin:50px auto 12px;height: 1px;}
.blueBg{background: #3b77e3; border-radius: 5px; padding: 5px 15px;}
.btnBox{justify-content: space-between;width: 40%;margin: 0 auto;}
</style>
