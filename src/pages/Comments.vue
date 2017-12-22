<!-- 意见和建议 wuxiaobo-->
<template>
  <div  class="ServiceWarp">
    <ComHeader :isActiveComp="isActives"/>
    <div class="">
      <span>意见和建议</span>
    </div>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader'
import http from '@/utils/http'
import api from '@/utils/api'

export default {
  name: 'Comments',
  data () {
    return {
      isActives: 'Comments'
    }
  },
  mounted () {
    // 钩子函数
    this.init()
    this.fetchData()
  },
  methods: {
    init () {
      // 初始化
      console.log('Comments init !')
    },
    fetchData: async function () {
      let params = {
        userName: 'testlogin',
        password: '1234qwer'
      }
      const res = await http.post(api.login, params)
      if (res.data.success) {
        alert('请求成功')
      }
    }
  },
  components: {
    ComHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
