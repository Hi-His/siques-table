import Vue from 'vue'
import Table from './Table.vue'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(Table),
}).$mount('#app')
