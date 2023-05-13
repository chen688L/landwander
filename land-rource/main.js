import Vue from 'vue'
import App from './App'
// import animated from 'animate.css'
import ajax from "./service/index"

Vue.prototype.$ajax = ajax
Vue.config.productionTip = false
// Vue.use(animated)


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
