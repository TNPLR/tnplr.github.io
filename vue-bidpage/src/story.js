import { createApp } from 'vue'
import Story from './Story.vue'

import "./assets/main.css";

const app = createApp(Story);
app.mount('#story');