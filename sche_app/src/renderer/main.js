import Vue from 'vue'
import axios from 'axios'
//import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { firestorePlugin } from 'vuefire'
import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
 

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(require('bootstrap-vue/dist/bootstrap-vue.common'))
Vue.use(firestorePlugin)
Vue.use(Datetime)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
