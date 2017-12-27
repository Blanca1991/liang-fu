<!-- 登录输入信息框 -->
<template>
  <div class="maskWarp" @click="callMethod">
    <div class="maskBox" ></div>
  </div>
</template>

<script>

export default {
  name: 'MaskBox',
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    callMethod () {
      // 事件绑定 -- 接收父组件传递的事件 并执行
      this.$emit('closeComp')
    }
  }
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
