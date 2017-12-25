<!-- 登录输入信息框 -->
<template>
  <div class="maskWarp">
    <div class="maskBox"></div>
  </div>
</template>

<script>

export default {
  name: 'MaskBox'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.maskWarp{
  width: 100vw;
  min-width: 1200px;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  position: absolute;
  z-index: 9;
  top: 0;
}
</style>
