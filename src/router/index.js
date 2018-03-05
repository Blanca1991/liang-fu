import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Service from '@/pages/Service'
import Company from '@/pages/Company'
import News from '@/pages/News'
import Comments from '@/pages/Comments'
import Jobs from '@/pages/Jobs'
import Cooperate from '@/pages/Cooperate'
import AntiFraud from '@/pages/AntiFraud'
import UserInfo from '@/pages/UserInfo'
import ProductQMX from '@/pages/ProductQMX'
import ProductQMXOrder from '@/pages/ProductQMXOrder'

import Homefull from '@/pages/HomeFullpage'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/Home.html' },
    {
      path: '/Home.html',
      name: 'Home',
      component: Home
    },
    {
      path: '/Homefull',
      name: 'Homefull',
      component: Homefull
    },
    {
      path: '/Service.html',
      name: 'Service',
      component: Service
    },
    {
      path: '/Company.html',
      name: 'Company',
      component: Company
    },
    {
      path: '/News.html',
      name: 'News',
      component: News
    },
    {
      path: '/Comments.html',
      name: 'Comments',
      component: Comments
    },
    {
      path: '/Jobs.html',
      name: 'Jobs',
      component: Jobs
    },
    {
      path: '/Cooperate.html',
      name: 'Cooperate',
      component: Cooperate
    },
    {
      path: '/antiFraud.html',
      name: 'AntiFraud',
      component: AntiFraud
    },
    {
      path: '/UserInfo.html',
      name: 'UserInfo',
      component: UserInfo
    }
    // ,
    // {
    //   path: '/ProductQMX.html',
    //   name: 'ProductQMX',
    //   component: ProductQMX
    // },
    // {
    //   path: '/ProductQMXOrder.html',
    //   name: 'ProductQMXOrder',
    //   component: ProductQMXOrder
    // }
  ]
})
