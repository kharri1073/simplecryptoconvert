import Vue from 'vue'
import Meta from 'vue-meta'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Accounting from 'accounting'
import VueAnalytics from 'vue-analytics'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(Meta)
Vue.use(VueAnalytics, {
  id: 'UA-249443-35'
})
Vue.use(Accounting)

Vue.config.productionTip = false

export const cryptoType = new Vue();

new Vue({
  render: h => h(App),
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
