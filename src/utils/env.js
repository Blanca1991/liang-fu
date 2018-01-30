// 配置编译环境 和 SIT UAT 线上 环境
// const devUrl = 'http://10.166.15.150:20010/'
const sitUrl = 'http://10.166.10.111:20010'
// const uatUrl = 'http://10.166.8.56:11080'
// const prdUrl = 'http://credit.liangfuzhengxin.com/'
let baseUrl = sitUrl
// if (process.env.NODE_ENV === 'development') {
//   baseUrl = sitUrl
// } else if (process.env.NODE_ENV === 'production') {
//   baseUrl = prdUrl
// }
export {
  baseUrl
}
