<template>
  <div class="LogoBgBox">
    <div class="LogoBg">
      <div v-show="isLF">
        <img src="../images/liangfu_logo.png" alt="liangfu_logo" />
      </div>
      <div v-show="isXHJ">
        <img src="../images/xinghujia_logo.png" alt="xinghujia_logo" >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoBg',
  data () {
    return {
      isLF: true,
      isXHJ: this.bgHide
    }
  },
  props: [ 'bgHide' ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.LogoBg{
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.LogoBg img{
  width: 90%;
  height: auto;
  margin-top: 10px;
}
</style>
