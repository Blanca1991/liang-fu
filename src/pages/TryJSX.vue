<template>
  <div class="wrapper">
    <Test :on-click="clickHandler" :is-show="show"></Test>
  </div>
</template>

<script>
import Test from '@/pages/TryJSXtest.vue';
// 使用jsx语法不需要 template
export default {
  name: 'hello',
  components: {
    Test
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: true
    }
  },
  mounted () {
    // 钩子函数
    this.init()
  },
  methods: {
    init () {
      console.log('jsx');
    },
    clickHandler(){
      this.show = !this.show;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nihao{color: red}
</style>
