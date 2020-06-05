import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Shop from "../components/Shop";

const routes = [
    {
        path: '/',
        name: 'shop',
        component: Shop
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router