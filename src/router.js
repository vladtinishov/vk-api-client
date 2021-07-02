import Vue from 'vue'
import Router from 'vue-router'
import SidewaysAd from './views/SidewaysAd'
import WallAd from './views/WallAd'
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/sideways',
            component: SidewaysAd,
        },
        {
            path: '/wall',
            component: WallAd,
        }
    ]
})