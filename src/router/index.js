import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'shop',
        component: () => import('../components/Shop.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router