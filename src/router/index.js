import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Service from '@/pages/Service'
import Company from '@/pages/Company'
import News from '@/pages/News'
import Comments from '@/pages/Comments'
import Jobs from '@/pages/Jobs'
import Cooperate from '@/pages/Cooperate'
import Product from '@/pages/Product'
import UserInfo from '@/pages/UserInfo'
import ProductQMX from '@/pages/ProductQMX'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/Home' },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Service',
      name: 'Service',
      component: Service
    },
    {
      path: '/Company',
      name: 'Company',
      component: Company
    },
    {
      path: '/News',
      name: 'News',
      component: News
    },
    {
      path: '/Comments',
      name: 'Comments',
      component: Comments
    },
    {
      path: '/Jobs',
      name: 'Jobs',
      component: Jobs
    },
    {
      path: '/Cooperate',
      name: 'Cooperate',
      component: Cooperate
    },
    {
      path: '/Product',
      name: 'Product',
      component: Product
    },
    {
      path: '/ProductQMX',
      name: 'ProductQMX',
      component: ProductQMX
    },
    {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo
    }
  ]
})
