import { createApp } from 'vue'
import { createPinia } from 'pinia'

//全局引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import Request from './utils/Request'
const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.config.globalProperties.Request = Request
app.mount('#app')
