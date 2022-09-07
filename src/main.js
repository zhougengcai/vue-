import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 1.reset.css 
import "./assets/css/reset.css";

//公共组件
import "./components"
Vue.config.productionTip = false

//引入ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import "./less/color.scss"



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
