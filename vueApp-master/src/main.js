import Vue from 'vue'
import App from './App'
import router from './router'
import './base/js/base.js'
import ELementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { store } from './store/index.js'
import 'swiper/dist/css/swiper.css'
import axios from 'axios'

/*element组件*/
Vue.use(ELementUI);

/*滑动事件*/
import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })

/*图片懒加载*/
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('@/assets/head.jpg'),
  attempt: 1
})

/* 轮播图 */
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

axios.interceptors.request.use(function(config) { //配置发送请求的信息
  store.dispatch('showLoading');
  return config;
}, function(error) {
  return Promise.reject(error);
});

//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
//
axios.interceptors.response.use(function(response) { //配置请求回来的信息
  store.dispatch('hideLoading');
  return response;
}, function(error) {
  return Promise.reject(error);
});
axios.defaults.baseURL = 'http://localhost:3333/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios;
/*axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';*/
// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.userInfo) {
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.userInfo));
}
// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.state.userInfo.user_id) {
          next();
      } else {
          next({
              path: '/login',
              query: { redirect: to.fullPath }
          });
      }
      console.log("================");
  } else {
      console.log("nnnnnnnnnnnnnnnnnn");
      next();
  }
});
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
