<!-- 登录小窗 -->
<template>
  <div class="pointOutWarp">
    <div class="pointOut font14">
      {{ this.pointTextComp }}
    </div>
    <div class="">

    </div>
    <MaskBox class="mask" />
  </div>
</template>

<script>
import MaskBox from '../components/MaskBox'

export default {
  name: 'PointOut',
  data () {
    return {}
  },
  methods: {},
  components: {
    MaskBox
  },
  props: [ 'pointTextComp' ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointOutWarp{
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
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
