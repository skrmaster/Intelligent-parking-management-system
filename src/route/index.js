import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import login from '@/views/admin/signIn.vue'
import register from '@/views/admin/signUp.vue'
import admin from '@/views/admin/admin.vue'
import dataCenter from '@/views/admin/children/dataCenter.vue'
import members from '@/views/admin/children/members.vue'
import order from '@/views/admin/children/order.vue'
import personal from '@/views/admin/children/personal.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: '智能停车场管理系统'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta: {
            title: '注册'
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: admin,
        children: [{
                path: 'dataCenter',
                name: 'dataCenter',
                component: dataCenter,
                meta: {
                    title: '数据中心',
                    requireAuth: true
                }
            },
            {
                path: 'members',
                name: 'members',
                component: members,
                meta: {
                    title: '会员管理',
                    requireAuth: true
                }
            },
            {
                path: 'order',
                name: 'order',
                component: order,
                meta: {
                    title: '订单管理',
                    requireAuth: true
                }
            },
            {
                path: 'personal/:userId',
                name: 'personal',
                component: personal,
                meta: {
                    title: '账户管理',
                    requireAuth: true
                }
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})
export default router
