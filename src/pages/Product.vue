<!-- 产品适用 wuxiaobo-->
<template>
  <div  class="ProductWarp">
    <div class="headerBox">
      <div class="header">
        <LogoBg :bgHide="bgHides" class="logoBg"/>
        <input type="text" name="uesrName" class="uesrName" placeholder="请输入姓名">
        <input type="text" name="userId" class="userId" placeholder="请输入身份证号"
        maxlength="18" >
        <input type="text" name="userPhone" class="userPhone" placeholder="请输入手机号"
        maxlength="11" >
        <span class="fontFFF searchBtn">搜索</span>
        <span class="fontFFF downBtn">下载</span>
        <Login class="fontFFF"/>
      </div>
    </div>
  </div>
</template>

<script>
import LogoBg from '@/components/LogoBg'
import Login from '@/components/Login'

export default {
  name: 'Product',
  data () {
    return {
      bgHides: true
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      // 初始化
      console.log('Product init')
    }
  },
  components: {
    LogoBg,
    Login
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ProductWarp{ }
.ProductWarp .headerBox{
  width: 100%;
}
.ProductWarp .header{
  margin: 0 auto; width: 100%;min-width: 1200px; height:80px;
  background: rgb(46, 46, 46); display: flex; justify-content: center;
  align-items: center;
}
.logoBg{
  width: 220px;
}
.fontFFF{
  color: #ffffff
}
.searchBtn{
  padding:5px 10px;padding-left: 30px; margin-right: 10px; border-radius: 5px;
  background: url(../images/search_bg.png) no-repeat 10px center rgb(8, 141, 184) ;
  margin-left: 10px; background-size: 18% ;font-weight: bold;
}
.downBtn{
  background: rgb(204, 204, 204); padding:5px 15px;border-radius: 5px;font-weight: bold;
  margin-right: 10px
}
.ProductWarp input{
  height: 30px; line-height: 30px; font-size: 14px;
  border: 0;border-radius: 5px; margin-left: 10px; outline:none ;
}
.uesrName{
  background: url(../images/userName_bg.png) no-repeat 6px center #fff ; background-size: 12% ;
  text-indent: 26px; margin-left: 20px
}
.userId{
  width:200px;text-indent: 35px;
  background: url(../images/userId_bg.png) no-repeat 9px center #fff ; background-size: 10% ;
}
.userPhone{
  text-indent: 23px;
  background: url(../images/userPhone_bg.png) no-repeat 5px center #fff ; background-size: 12% ;
}
</style>
