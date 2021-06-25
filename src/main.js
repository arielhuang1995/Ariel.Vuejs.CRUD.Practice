import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import moment from 'moment'

Vue.prototype.$moment = moment

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
