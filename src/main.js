import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/sass/reset.scss'
import 'font-awesome/css/font-awesome.css'
import { Tabs, TabPane } from 'element-ui'
import VueDragResize from 'vue-drag-resize'
Vue.component('vue-drag-resize', VueDragResize)
Vue.config.productionTip = false
Vue.use(Tabs);
Vue.use(TabPane);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
