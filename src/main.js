import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Vue2Filters from 'vue2-filters'
import Accounting from 'accounting'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(Vue2Filters)
Vue.use(VueAxios, axios)
Vue.use(Accounting)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
