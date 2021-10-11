import Vue from 'vue'
import Table from './Table.vue'

import jquery from 'jquery'

Vue.prototype.$jquery = jquery

Vue.config.productionTip = false

new Vue({
  render: (h) => h(Table),
}).$mount('#app')
