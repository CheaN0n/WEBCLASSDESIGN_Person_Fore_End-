import Vue from 'vue'
import './plugins/axios'
import App from './App'
import router from './router'
import './assets/icons/iconfont/iconfont.css'
import myCharts from './comm/js/myCharts.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(myCharts)
Vue.config.productionTip = false
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
