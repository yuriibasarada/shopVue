import Vue from 'vue'
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import 'materialize-css/dist/js/materialize.min.js'
import router from './router'

import capitalizeFilter from './filters/capitalize.filter'

Vue.component('Paginate', Paginate)
Vue.filter('capitalize', capitalizeFilter)
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
