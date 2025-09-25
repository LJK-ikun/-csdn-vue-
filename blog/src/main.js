import { createApp } from 'vue'
import { createPinia } from 'pinia'

//全局引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

import Request from './utils/Request'
import message from './utils/Message'
import VueCookies from 'vue-cookies'

//组件
import Table from './components/Table.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.use(VueCookies)
app.config.globalProperties.Request = Request
app.config.globalProperties.message = message
app.config.globalProperties.globalInfo = {
    imageUrl: "/api/file/getImage/"
}
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.component('Table', Table)

app.mount('#app')
