import Vue from 'vue'
import App from './App.vue'
import filters from './config/filters'
import element from 'element-ui'
import animated from 'animate.css'
import less from 'less'
import apis from './utils/index'
import router from './router/index'
import { Message } from 'element-ui'
import store from './store'
// 引入echarts
import * as echarts from "echarts";
// 高德离线地图
import VueAMap from 'vue-amap';
import NetworkIp from './config/index'
//时间选择器-转换
import moment from "moment";
import dayjs from "dayjs";
//jeecg-boot原生的
import VueAreaLinkage from 'vue-area-linkage';
//jeecg原生的
Vue.use(VueAreaLinkage);

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  // 高德key
  key: '932e55a3e793656b8da5859b77a8e809', // 到官网申请
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete',
    'AMap.Geocoder',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView', 
    'AMap.ToolBar', 
    'AMap.MapType', 
    'AMap.PolyEditor', 
    'AMap.CircleEditor', 
    'AMap.MarkerClusterer',
    'AMap.AMapManager',
    'AMap.Autocomplete',
    'AMap.Geolocation'
  ],
  v: '1.4.15', // 不写项目会报错，而且我随便写的，跟我下载的版本对应不了
  uiVersion: '1.0', // ui版本号，也是需要写，不配置不加载,
  v: '1.4.4',
  plugin: ['AMap.Geolocation'],
  plugin: ['AMap.Geocoder'] /* , 'AMap.Geocoder' */

})


// 挂载到vue实例中
Vue.prototype.$echarts = echarts
Vue.prototype.NetworkIp = NetworkIp
Vue.prototype.$moment = moment;
Vue.prototype.dayjs = dayjs;



Vue.use(less)
Vue.use(animated)
Vue.use(element)
Vue.config.productionTip = false
Vue.prototype.$apis = apis;
Vue.prototype.$message = Message;
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    let pathuser = JSON.parse(localStorage.getItem("admin_userinfo")).rid
    if (sessionStorage.getItem("token")&&pathuser==1) {
      next()
    } else {
      next({ path: '/', query: { redirect: to.fullPath } })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


