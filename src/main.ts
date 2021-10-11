import Vue from 'vue'
import Table from './Table.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import md5 from 'js-md5'

Vue.prototype.$md5 = md5
Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  render: (h) => h(Table),
}).$mount('#app')
