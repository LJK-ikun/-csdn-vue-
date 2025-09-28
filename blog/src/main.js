import { createApp } from 'vue'
import { createPinia } from 'pinia'

//全局引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'


import Request from './utils/Request'
import Message from './utils/Message'
import VueCookies from 'vue-cookies'
import Confirm from '@/utils/Confirm'

//组件
import Table from './components/Table.vue'
import Cover from './components/Cover.vue'
import Dialog from './components/Dialog.vue'
import CoverUpload from './components/CoverUpload.vue'
import Windows from './components/Windows.vue'
import EditorHtml from './components/EditorHtml.vue'
import EditorMarkdown from './components/EditorMarkdown.vue'


const app = createApp(App)


app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.use(VueCookies)
app.config.globalProperties.Request = Request
app.config.globalProperties.Message = Message
app.config.globalProperties.Confirm = Confirm;
app.config.globalProperties.globalInfo = {
    imageUrl: "/api/file/getImage/"
}
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.component('Table', Table)
app.component('Cover', Cover)
app.component('Dialog', Dialog)
app.component('CoverUpload', CoverUpload)
app.component('Windows', Windows)
app.component('EditorHtml', EditorHtml)
app.component('EditorMarkdown', EditorMarkdown)

app.mount('#app')
