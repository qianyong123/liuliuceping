// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts  from 'echarts'
import VueClipboard from 'vue-clipboard2' //复制



import "./stylecss/main.scss";
import "./js/rem.js";
import store from './store.js'


Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts 
Vue.use(VueClipboard)
// Vue.use(calendar)

    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })

