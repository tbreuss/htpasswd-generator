import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

Vue.use(Resource)
Vue.use(Router)

import Fehler from './pages/Fehler.vue'
import Generator from './pages/Generator.vue'
import Home from './pages/Home.vue'
import Impressum from './pages/Impressum.vue'
import Infos from './pages/Infos.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/impressum', component: Impressum },
    { path: '/infos', component: Infos },
    { path: '/generator', component: Generator },
    { path: '*', component: Fehler }
]

var router = new Router({
    routes: routes
})

const app = new Vue({
    router: router,
    el: '#app',
    render: h => h(App)
})
