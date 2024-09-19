import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Interference from './components/Interference.vue'
import Signal from './components/signal.vue'
import Relay from './components/relay.vue'
import Defense from './components/defense.vue'
import doubletonClub from './components/doubletonClub.vue'
import Natural from './components/natural.vue'

import NaturalMajor from './components/naturalMajor.vue'

import balMinor from './components/balMinor.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/relay' },
        { path: '/interference', component: Interference },
        { path: '/signal', component: Signal},
        { path: '/relay', component: Relay},
        { path: '/defense', component: Defense},
        { path: '/doubleton', component: doubletonClub},
        { path: '/natural', component: Natural},
        //{ path: '/:pathMatch(.*)*', redirect: '/'},
    ]
});

const app = createApp(App)
app.use(router)
app.component('natural-major', NaturalMajor)
app.component('bal-minor', balMinor)
app.mount('#app')
