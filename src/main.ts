import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import './styles/global.css'
import App from './App.vue'

createApp(App)
  .use(store)
  .use(ElementPlus)
  .mount('#app')
