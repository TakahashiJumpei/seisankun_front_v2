import Vue from 'vue'
import App from './App.vue'
import router from './router'
import seisankunApi from './plugins/seisankunApi'

Vue.use(seisankunApi)
Vue.config.productionTip = false

new Vue({
  router,
  seisankunApi,
  render: h => h(App),
}).$mount('#app')
