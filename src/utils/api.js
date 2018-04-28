export default {
  login: 'credit-service/login', // 登录接口
  addAdvice: 'http://portal.mis.liangfuzhengxin.com/portal/static/addAdvice?times=', // 联系我们  意见建议
  getAboutUsInfo: 'static/getAboutUsInfo', // 公司介绍  暂时是没用上的
  getArticleInfoPage: 'http://portal.mis.liangfuzhengxin.com/portal/static/getFirstInfo', // 获取新闻资讯
  getRecruitInfo: 'http://portal.mis.liangfuzhengxin.com/portal/static/getRecruitInfo', // 招聘信息
  antifraud: 'credit-service/v2/xinghujiaAntiFraud', // 星护甲查询接口
  checkToken: 'credit-service/v2/checkToken', // 检查token接口
  searchSubmit: 'credit-service/v2/benchMark', // 企明星提交订单
  updateMessage: 'credit-service/updateVenus', // 企明星用户的消息通知 已读未读修改
  getOrderList: 'credit-service/getVenusInfo', // 企明星用户订单列表  和  消息通知列表
  downQmxPdf: 'credit-service/pdfbyOrder/url/', // 企明星 下载Pdf
  checkThreeMonths: 'credit-service/queryModelByThreeMonths', // 企明星 提交订单前的三个月判断
  checkEmpty: 'credit-service/api/v3/BE/BE' // 企明星 判断提交的企业是否存在
}
