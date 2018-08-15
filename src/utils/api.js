export default {
  login: 'credit-service/login', // 登录接口
  addAdvice: 'http://portal.mis.liangfuzhengxin.com/portal/static/addAdvice?times=', // 联系我们  意见建议
  getAboutUsInfo: 'static/getAboutUsInfo', // 公司介绍  暂时是没用上的
  getArticleInfoPage: 'http://portal.mis.liangfuzhengxin.com/portal/static/getFirstInfo', // 获取新闻资讯
  getRecruitInfo: 'http://portal.mis.liangfuzhengxin.com/portal/static/getRecruitInfo', // 招聘信息
  antifraud: 'credit-service/v3/xinghujiaAntiWeb', // 星护甲查询接口  xinghujiaAntiWeb
  checkToken: 'credit-service/v2/checkToken', // 检查token接口
  searchSubmit: 'credit-service/v2/benchMark', // 企明星提交订单
  updateMessage: 'credit-service/updateVenus', // 企明星用户的消息通知 已读未读修改
  getOrderList: 'credit-service/getVenusInfo', // 企明星用户订单列表  和  消息通知列表
  downQmxPdf: 'credit-service/pdfbyOrder/url/', // 企明星 下载Pdf
  checkThreeMonths: 'credit-service/queryModelByThreeMonths', // 企明星 提交订单前的三个月判断
  checkEmpty: 'credit-service/api/v3/BE/BE', // 企明星 判断提交的企业是否存在
  getUserInfo: 'credit-service/cm/getUserInfoByLoginName', // 企业监测 获取用户的相信信息
  getMonitorInfoList: 'credit-service/cm/getChangeInfoList', // 企业监测 获取 预警中心页面 list
  updateChangeInfo: 'credit-service/cm/updateChangeInfo', // 企业监测 获取 预警中心页面 未读信息修改为已读
  getAttentionList: 'credit-service/cm/getMonitorCompanyList', // 企业监测 获取 关注企业页面 list
  getOverdueInfoList: 'credit-service/cm/getOverdueInfoList', // 企业监测 获取我的消息 messagelist
  getCompanyList: 'credit-service/cm/getCompanyList', // 企业监测 添加监控企业 企业搜索模糊查询
  addOrRemoveMonitorCompany: 'credit-service/cm/addOrRemoveMonitorCompany', // 企业监测 添加或者取消监控企业
  updateOverdueInfo: 'credit-service/cm/updateOverdueInfo' // 企业监测 消息列表未读修改为已读
}
