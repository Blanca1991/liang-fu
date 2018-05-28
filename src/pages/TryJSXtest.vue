<script>
import http from '@/utils/http'

export default {
    props: ['onClick', 'isShow'],

    data() {
        return {
            test: 123,
            todos: [
              {id: 0,name: 'aaa'},
              {id: 1,name: 'bbb'},
              {id: 2,name: 'bbb'}
            ]
        };
    },
    render() {
        return (
            <div class="test" onClick={ this.onClick }>
                { this.test }
                { this.isShow + '' }
                <div >
                  <div class="nihao">{ this.msg }</div>
                    <div >
                      {
                        this.todos.map((item, index) =>{
                          return <div onClick={this.changeMsg} key={index}>{item.name}</div>
                        }, this)
                      }
                    </div>
                </div>
            </div>
        )
    },
    methods: {
      changeMsg (index) {
        console.log(index)
        this.fetchJobs()
      },
      fetchJobs: async function () {
        // 接口请求 ———— 搜索接口
        const res = await http.get('http://127.0.0.1:8888/')
        // console.log(res)
        if (res.status === 200) {
          console.log('success');
        } else {
          console.log('error');
        }
      }
    }
}
</script>
