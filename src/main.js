import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './route'
import 'es6-promise/auto'
import Vuex from 'vuex'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import store from './store'
import utils from './utils/index.js'

Vue.filter('digitsRound', utils.digitsRound)
Vue.filter('dateHandle', utils.dateHandle)

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With',
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
        "Content-Type": "application/json;charset=utf-8"
    }
})

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(Element, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false

router.beforeResolve((to, from, next) => {
    if (to.matched.some(record => record.name)) {
        next()
    } else {
        if (window.sessionStorage.getItem('adminToken') && to.meta.requireAuth) {
            document.title = to.meta.title 
            next('/admin/datacenter')
        } else {
            next('/')
        }
    }
})

axios.interceptors.request.use(function (config) {
    window.sessionStorage.getItem('adminToken')
    ? config.headers.common['Authorization'] = 'Bearer ' + window.sessionStorage.getItem('adminToken')
    : console.log('noToken in start')
    return config
}, function (error) {
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error) {
        Element.Message({
            type: 'warning',
            message: `请先登录, 登录后即可查看!`,
            duration: 1000
        })
    }
    return Promise.reject(error)
})

new Vue({
    router,
    store,
    scrollBehavior (to, from, savedPosition) {
        return { 
            x: 0, 
            y: 0,
            behavior: 'smooth'
        }
    },
    render: h => h(App)
}).$mount('#app')