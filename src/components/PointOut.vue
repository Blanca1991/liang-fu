<!-- 登录小窗 -->
<template>
  <div class="pointOutWarp minWidthBox" v-if="!pointShowBtn">
    <div class="pointOut font14">
      {{ pointText }}
    </div>
    <div class="btnClass" v-if="pointShowBtn">
      <div class="">
        {{ pointText }}
      </div>
      <div class="">
        <div class="cancelBtn">
          取消
        </div>
        <div class="ensureBtn">
          确定
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
      pointShowBtn: state => state.pointShowBtn
    })
  },
  methods: {},
  components: {
    MaskBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointOutWarp{
  width: 100vw;
  height: 100vh;
  letter-spacing:4px;
}
.pointOut{
  background: #fff;
  z-index: 20;
  padding:10px 30px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform:  translateX(-50%) translateY(-50%);
}
.pointOutWarp .mask{
  z-index: 19;
}
</style>
