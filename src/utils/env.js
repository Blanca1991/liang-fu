// 配置编译环境 和 SIT UAT 线上 环境
// const devUrl = 'http://10.166.15.150:20010/'

const sitUrl = 'http://10.166.10.111:20010'
let baseUrl = sitUrl

// const uatUrl = 'http://10.166.8.56:11080'
// let baseUrl = uatUrl

// const prdUrl = 'http://10.168.1.86:11080' // 预生产环境
// let baseUrl = prdUrl

// const prdUrl = 'http://credit.liangfuzhengxin.com/'
// // let baseUrl = prdUrl
//
// let baseUrl
// if (process.env.NODE_ENV === 'development') {
//   baseUrl = sitUrl
// } else if (process.env.NODE_ENV === 'production') {
//   baseUrl = prdUrl
// }

export {
  baseUrl
}
