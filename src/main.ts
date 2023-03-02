import { TOKENS, get } from '@/services'
import App from './app/App.vue'

async function mountVueApplication() {
  const app = await get(TOKENS.app)(App)
  app.mount('#app')
  get(TOKENS.bootstrap)()
}

mountVueApplication()
