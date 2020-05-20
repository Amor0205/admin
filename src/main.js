import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global'
import './filters'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './bus'
import '../public/reset.css'
import VCharts from 'v-charts'
import Print from '@/plugs/print'
import i18n from './i18n/langs/index'

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

Vue.use(VCharts)
Vue.use(ElementUI)
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false
Vue.use(Print) // 注册


new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')