<!-- 登录输入信息框 -->
<template>
  <div class="TipsBoxWarp minWidthBox">
    <div class="tipsBox textL">
      <div class="iconBtn pointer" @click="closeTips">
        <em></em>
      </div>
      <div class="contentDiv">
        <div class="font22">
          <strong>{{ this.tipsInfoComp.name }}</strong>
        </div>
        <span class="font16" v-html="this.tipsInfoComp.content"></span>
        <div class="imgInUrlStyle">
          <img :src="this.tipsInfoComp.imgInUrl" alt="">
        </div>
      </div>
      <div class="bottomBtnBox flex">
        <div class="preBtn" >
          <span class="pointer" @click="preFun" v-show="newsListCom[tipsIndexCom - 1]">
            <span>上一条：</span>
            <span>{{  }}</span>
          </span>
        </div>
        <div class="nextBtn">
          <span class="pointer" @click="nextFun" v-show="newsListCom[tipsIndexCom + 1]">
            <span>下一条：</span>
            <span>{{  }}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="" @click="closeTips">
      <MaskBox />
    </div>
  </div>
</template>

<script>
import MaskBox from '@/components/MaskBox'

export default {
  name: 'TipsBox',
  data () {
    return {}
  },
  computed: {},
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {},
    closeTips () {
      this.$store.state.isTipsShow = false
    },
    nextFun () {
      console.log('下一页')
      console.log(this.newsListCom)
    },
    preFun () {
      console.log('上一页')
    }
  },
  components: {
    MaskBox
  },
  props: [
    'tipsInfoComp',
    'tipsIndexCom',
    'newsListCom'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tipsBox {width: 800px;height: 340px;overflow: hidden; position: absolute; left: 50%;background: #fff;z-index: 10;
   transform: translate(-50%);box-shadow: 0px 0px 5px #888888; padding: 40px;top: 200px;border-radius: 5px;}
.iconBtn{position: absolute;right: 20px;top: 20px;}
.iconBtn em{display: inline-block;width: 20px;height: 20px;
  background: url(../images/company/fancy_close.png) no-repeat;background-size: 100%;}
.imgInUrlStyle{text-align: center;}
.contentDiv{overflow: auto; height: 100%;}
.contentDiv::-webkit-scrollbar { display: none; }
.bottomBtnBox{line-height: 40px; justify-content: space-between;}
.bottomBtnBox .preBtn{width: 40%;display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
.bottomBtnBox .nextBtn{width: 40%;display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}

</style>
