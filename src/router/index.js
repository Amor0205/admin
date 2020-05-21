import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        redirect: '/'
    },
    // {
    //     path: '/',
    //     name: 'home',
    //     component: home,
    //     meta: {
    //         title: "首页",

    //     }
    // },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../pages/login/login'),
        meta: {
            title: "登录",

        }
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../pages/register/register'),
        meta: {
            title: "注册",

        }

    },
    {
        path: '/lock',
        name: 'lock',
        component: () =>
            import ('../pages/lock/lock'),
        meta: {
            title: "锁屏",

        }

    },
    {
        path: '/',
        component: home,
        children: [{
                path: '',
                name: 'dashboard',
                component: () =>
                    import ('../pages/dashboard/dashboard'),
                meta: {
                    title: "首页",
                    enName: "dashboard",
                    parentName: null,
                }

            },

        ]
    },
    {
        path: '/calendar',
        component: home,
        children: [{
                path: '',
                name: 'calendar',
                component: () =>
                    import ('../pages/calendar/calendar'),
                meta: {
                    title: "日程管理",
                    enName: "calendar",
                    parentName: null,
                }
            },

        ]
    },
    {
        path: '/maillist',
        component: home,
        children: [{
                path: '',
                name: 'maillist',
                component: () =>
                    import ('../pages/maillist/maillist'),
                meta: {
                    title: '通讯录',
                    enName: "mailList",
                    parentName: null,
                }
            },

        ]
    },
    {
        path: '/organization/offer',
        component: home,
        children: [{
                path: '',
                name: 'offer',
                component: () =>
                    import ('../pages/organization/offer'),
                meta: {
                    title: "offer管理",
                    enName: "offer",
                    parentName: 'organize',
                }
            },

        ]
    },
    {
        path: '/organization/userInfo',
        component: home,
        children: [{
                path: '',
                name: 'userInfo',
                component: () =>
                    import ('../pages/organization/userInfo'),
                meta: {
                    title: "人员信息",
                    enName: "userInfo",
                    parentName: 'organize',
                }
            },

        ]
    },
    {
        path: '/organization/pay',
        component: home,
        children: [{
                path: '',
                name: 'pay',
                component: () =>
                    import ('../pages/organization/pay'),
                meta: {
                    title: "薪酬管理",
                    enName: "payMent",
                    parentName: 'organize',
                }
            },

        ]
    },
    {
        path: '/form/stepForm',
        component: home,
        children: [{
                path: '',
                name: 'stepForm',
                component: () =>
                    import ('../pages/form/stepForm'),
                meta: {
                    title: "分步表单",
                    enName: "stepForm",
                    parentName: 'form',
                }
            },

        ]
    },
    {
        path: '/CheckForm',
        component: home,
        children: [{
                path: '',
                name: 'CheckForm',
                component: () =>
                    import ('../pages/checkForm/CheckForm'),
                meta: {
                    title: "查看账单",
                    enName: "checkForm",
                    parentName: 'form',
                }
            },

        ]
    },





]

const isPro = process.env.NODE_ENV === 'production'


const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

//锁屏守卫(存密码用的localStorage守卫里面也用localStorage)
router.beforeEach((to, from, next) => {
    if (localStorage.getItem('password') && to.path !== '/lock') {
        next({
            path: '/lock'
        })
    }
    next()
})