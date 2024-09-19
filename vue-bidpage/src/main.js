import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import "./assets/main.css";

import App from './App.vue'
import Interference from './components/Interference.vue'
import Signal from './components/signal.vue'
import Relay from './components/relay.vue'
import Defense from './components/defense.vue'
import doubletonClub from './components/doubletonClub.vue'
import Natural from './components/natural.vue'

import NaturalMajor from './components/naturalMajor.vue'

import balMinor from './components/balMinor.vue'

import Cmbc from './components/cmbc.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/cmbc'},
        { path: '/interference', component: Interference, meta: {title: '受干擾的叫牌'}},
        { path: '/signal', component: Signal, meta: {title: '防禦信號'}},
        { path: '/relay', component: Relay, meta: {title: 'Relay 制度'}},
        { path: '/defense', component: Defense, meta: {title: '防禦叫牌'}},
        { path: '/doubleton', component: doubletonClub},
        { path: '/natural', component: Natural},
        { path: '/cmbc', component: Cmbc, meta: {title: 'CMBC 自然制'}},
        { path: '/:pathMatch(.*)*', redirect: '/'},
    ]
});

router.beforeEach((to) => {
    const { title, description } = to.meta;
    const defaultTitle = 'Relay 制度網';
    const defaultDescription = '一個Relay制度的網站。';
  
    document.title = title || defaultTitle
});

const app = createApp(App)
app.use(router)
app.component('natural-major', NaturalMajor)
app.component('bal-minor', balMinor)
app.mount('#app')
