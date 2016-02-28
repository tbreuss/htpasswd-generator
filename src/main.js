import Vue from 'vue'
import Resource from 'vue-resource'
import Router from 'vue-router'
import App from './App.vue'
import Impressum from './components/Impressum.vue'
import Infos from './components/Infos.vue'
import Fehler from './components/Fehler.vue'
import Generator from './components/Generator.vue'
import Home from './components/Home.vue'

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
