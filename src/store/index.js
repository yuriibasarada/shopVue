import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default new Vuex.Store({
    state: {
        brands: [],
        materials: [],
        categories: [],
        products: [],
        sort: []
    },
    actions,
    getters,
    mutations
})