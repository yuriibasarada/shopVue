import Vue from 'vue'
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import 'materialize-css/dist/js/materialize.min.js'
import router from './router'

Vue.component('Paginate', Paginate)
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
