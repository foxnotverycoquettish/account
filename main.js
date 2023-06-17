import App from './App'
import uView from './uni_modules/vk-uview-ui';
import { createPinia } from 'pinia'



import { createSSRApp } from 'vue'
export function createApp() {
	const pinia = createPinia()
  const app = createSSRApp(App)
  
   // 使用 uView UI
    app.use(uView)
	app.use(pinia)
  return {
    app
  }
}
