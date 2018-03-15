<template>
  <div id="app" v-bind:style="{overflow: this.$store.state.appOverflow}" onselectstart="return false" >
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.getAppScroll()
  },
  watch: {},
  computed: {},
  methods: {
    getAppScroll () {
      this.$store.state.appDom = document.getElementById('app') // 楼梯关联跳转需要用到
      let app = document.getElementById('app')
      // console.log(this.$store)
      // console.log(app.scrollTop)
      // console.log(app.offsetWidth)
      this.$store.commit('CHANGEAPPWIDTH', app.offsetWidth)
      let vm = this
      app.onscroll = function () {
        let scrollTop = app.scrollTop
        let scrollLeft = app.scrollLeft
        vm.$store.commit('CHANGESCROLLLEFT', scrollLeft)
        vm.$store.commit('GETFLOORLISTTOP', scrollTop)
        // vm.$store.dispatch('homeItemScroll', scrollTop)
        if (window.location.hash === '#/Home') {
          setTimeout(function () {
            vm.$store.dispatch('homeItemScroll', scrollTop)
          }, 100)
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: "Microsoft Yahei", "Hiragino Sans GB", "Helvetica Neue", Helvetica, tahoma, arial, "WenQuanYi Micro Hei", Verdana, sans-serif, "\5B8B\4F53";
  /* -webkit-font-smoothing: antialiased; */
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: auto;
  width: calc(100vw + 20px);
}
/* #app::-webkit-scrollbar {
    display: none;
} */
body,html{-webkit-text-size-adjust: none;width: 100%;height: 100%;}
body{ margin: 0;padding: 0; overflow: hidden;}
*{text-decoration: none;list-style: none;}
img{border: 0px;}
ul,li,dl,dd,dt,p,ol,h1,h2,h3,h4,h5{font-size: 12px;font-weight: 100;padding: 0;margin: 0;}
p{font-size: 14px;}
.wrap{margin: 0 auto;}
.inBlock{display: inline-block;}
.fl{float: left;}
.fr{float: right;}
.index{overflow: hidden;}
.flex{display: flex;}
.clr{clear:both; height:0px; width:100%; font-size:1px; line-height:0px; visibility:hidden; overflow:hidden;}
.pointer{cursor:pointer;}
.notAllowed{cursor:not-allowed;}
a,input,button{ outline:none; }
.font12{font-size: 12px;}
.font14{font-size: 14px;}
.font16{font-size: 16px;}
.font18{font-size: 18px;}
.font20{font-size: 20px;}
.font22{font-size: 22px;}
.font24{font-size: 24px;}
.font28{font-size: 28px;}
.font30{font-size: 30px;}
.font32{font-size: 32px;}
.font36{font-size: 36px;}
.font44{font-size: 44px;}
.fontBold{font-weight: bold;}
.textL{text-align: left; box-sizing: border-box;}
.textR{text-align: right; box-sizing: border-box;}
.borderL{border-left: 1px solid #eee;}
.borderR{border-right: 1px solid #eee;}
.borderT{border-top: 1px solid #eee;}
.borderB{border-bottom: 1px solid #eee;}
.pL20{padding-left: 20px;box-sizing: border-box;}
.pL10{padding-left: 10px;box-sizing: border-box;}
.pR20{padding-right: 20px;box-sizing: border-box;}
.minWidthBox{min-width: 1200px;}
::-moz-focus-inner{border:0px;}
.alignCenter{align-items: center;}
/*a:link {color:#0f0;text-decoration:none;}
a:visited {color: #FFFF00; text-decoration:none;}
a:hover {color: #00FF00; text-decoration:underline;}
a:active {color: #0000FF; text-decoration:underline;}*/
a{color: #000;}
.wrapper{clear: both;width: 100%;}
word-break:break-all /*文字换行*/
/*white-space:nowrap 文字不换行*/

/*默认滚动条样式修改ie9 google Firefox 等高版本浏览器有效*/
/*::selection {background: #D03333;color: white;text-shadow: none;}
::-webkit-scrollbar-track-piece{width:10px;background-color:#f2f2f2}
::-webkit-scrollbar{width:10px;height:6px}
::-webkit-scrollbar-thumb{height:50px;background-color:rgba(0,0,0,.3);}
::-webkit-scrollbar-thumb:hover{background:#cc0000}*/


/*渐变*/
/*background-image: -moz-linear-gradient(top, #8fa1ff, #3757fa);
background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ff4f02), color-stop(1, #8f2c00)); Saf4+, Chrome
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#c6ff00', endColorstr='#538300', GradientType='0'); IE*/
</style>
