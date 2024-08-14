import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Interference from './components/Interference.vue'
import Signal from './components/signal.vue'
import Bidding from './components/bidding.vue'
import Defense from './components/defense.vue'
import doubletonClub from './components/doubletonClub.vue'
import Natural from './components/natural.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/bidding' },
        { path: '/interference', component: Interference },
        { path: '/signal', component: Signal},
        { path: '/bidding', component: Bidding},
        { path: '/defense', component: Defense},
        { path: '/doubleton', component: doubletonClub},
        { path: '/natural', component: Natural},
        { path: '/:pathMatch(.*)*', redirect: '/'},
    ]
});

const app = createApp(App)
app.use(router)
app.mount('#app')
