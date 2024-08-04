import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Interference from './components/Interference.vue'
import Signal from './components/signal.vue'
import Bidding from './components/bidding.vue'
import Defense from './components/defense.vue'

const router = createRouter({
    history: createWebHistory(),
    redirect: { path: "/interference" },
    routes: [
        { path: '/', redirect: '/bidding' },
        { path: '/interference', component: Interference },
        { path: '/signal', component: Signal},
        { path: '/bidding', component: Bidding},
        { path: '/defense', component: Defense},
    ]
});

const app = createApp(App)
app.use(router)
app.mount('#app')
