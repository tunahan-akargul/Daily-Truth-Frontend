import { createApp } from 'vue'

// Vuetify (includes most utilities we need)
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import router from './router'

import './style.scss'
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#ff9800',
          secondary: '#ffb74d', 
          success: '#28a745',
          info: '#17a2b8',
          warning: '#ffc107',
          error: '#dc3545',
        }
      }
    }
  }
})

createApp(App).use(vuetify).use(router).mount('#app')
