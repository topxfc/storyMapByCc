import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import './styles/global.css'
import App from './App.vue'

const app = createApp(App)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
