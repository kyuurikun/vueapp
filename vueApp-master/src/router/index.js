import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('pages/index')
const Car = () => import('pages/car')
const Search = () => import('pages/search')
const Login = () => import('pages/login')
const Main = () => import('pages/main')
const vipMessage = () => import('pages/vip-message')
const Classify = () => import('pages/classify')
const Reg =() => import('pages/Reg.vue')
const GoodsDetail =() => import('pages/GoodsDetail')
const ChangePwd =() => import('pages/ChangePwd')
const Orders = () => import('pages/orders')
const paypwd = () => import('pages/paypwd')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Main,
      children: [
        {
          path: '',
          redirect: 'index'
        },
        {
          name: 'index',
          path: 'index',
          component: Index
        },
        {
          name: 'search',
          path: 'search',
          component: Search
        },
        {
          name: 'vip',
          path: 'vip',
          component: vipMessage
        }
      ]
    },
    {
      path: '/classify/:type',
      component: Classify,
      name: 'classify'
    },
    {
      path: '/login',
      component: Login
    },
    {
      name: 'car',
      path: '/car',
      component: Car
    },
    {
      name: 'orders',
      path: '/orders',
      component : Orders
    },
    {
      path: '/register',
      component: Reg
    },
    {
      path: '/ChangePwd',
      component: ChangePwd,
      name: 'ChangePwd'
    },
    {
      path: '/detail/:id',
      component: GoodsDetail
    },
    {
      path: '/paypwd',
      component: paypwd,
      name: 'paypwd'
    }
  ]
})
