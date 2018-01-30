<!-- 登录小窗 -->
<template>
  <div class="pointOutWarp minWidthBox" >
    <div class="pointOut font14" v-if="!pointShowBtn">
      {{ pointText }}
    </div>
    <div class="btnClass" v-if="pointShowBtn">
      <!-- <div class="">
        {{ pointText }}
      </div> -->
      <div class="btnClassText font18" >
        <div class="" v-for="item in pointText">
          {{ item }}
        </div>
      </div>
      <div class="btnBox flex font14">
        <div class="btnWarp ">
          <span class="cancelBtn pointer" @click="cancelPoint">取消</span>
        </div>
        <div class="btnWarp " v-if="!pointOutLoginBtn">
          <span class="ensureBtn pointer" @click="cancelPoint">确定</span>
        </div>
        <div class="btnWarp " v-if="pointOutLoginBtn">
          <span class="ensureBtn pointer" @click="showLogin">确定</span>
        </div>
      </div>
    </div>
    <MaskBox class="mask" />
  </div>
</template>

<script>
import MaskBox from '../components/MaskBox'
import {mapState} from 'vuex'

export default {
  name: 'PointOut',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      // 获取数据
      pointText: state => state.pointText,
      pointShowBtn: state => state.pointShowBtn,
      pointOutLoginBtn: state => state.pointOutLoginBtn
    })
  },
  methods: {
    showLogin () {
      this.$store.commit('HIDEOPTION')
      this.$store.commit('SHOWLOGIN')
    },
    cancelPoint () {
      this.$store.commit('HIDEOPTION')
    }
  },
  components: {
    MaskBox
  },
  props: []
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointOutWarp{width: 100vw;height: 100vh;letter-spacing:4px;
}
.pointOut{background: #fff;z-index: 20;padding:10px 30px;border-radius: 5px;position: absolute;
  top: 50%;left: 50%;transform:  translateX(-50%) translateY(-50%);
}
.pointOutWarp .mask{z-index: 19;}
.pointOutWarp .btnClass{ width: 320px; height: 120px; background: #fff;z-index: 20;padding: 20px 0px;border-radius: 5px;
  position: absolute;top: 50%;left: 50%;transform:  translateX(-50%) translateY(-50%); }
.btnClassText{color: #EA5B56 }
.pointOutWarp .btnClass .btnBox{ position: absolute; bottom: 20px; width: 100%;}
.btnClass .btnBox .btnWarp{width: 50%;}
.btnWarp .cancelBtn {display: inline-block; padding:5px 20px; color: #EA5B56;border-radius: 5px;border: 1px solid #EA5B56;}
.btnWarp .ensureBtn{display: inline-block; padding:5px 20px; color: #fff;border-radius: 5px;background-color: #EA5B56;border: 1px solid #EA5B56;}
</style>
