import Vue from 'vue'
import Resource from 'vue-resource'
import Router from 'vue-router'
import App from './App.vue'
import Fehler from './pages/Fehler.vue'
import Generator from './pages/Generator.vue'
import Home from './pages/Home.vue'
import Impressum from './pages/Impressum.vue'
import Infos from './pages/Infos.vue'

Vue.use(Resource)
Vue.use(Router)

var router = new Router()

router.map({
    '/': {
        component: Home
    },
    '/generator': {
        component: Generator
    },
    '/impressum': {
        component: Impressum
    },
    '/infos': {
        component: Infos
    },
    '*': {
        component: Fehler
    }
})

router.start(App, "#app")
