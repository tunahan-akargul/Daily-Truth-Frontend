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

function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: getCssVar('--color-primary'),
          secondary: getCssVar('--color-secondary'),
          background: getCssVar('--color-background'),
          backgroundSecondary: getCssVar('--color-background-secondary'),
          success: getCssVar('--color-success'),
          info: getCssVar('--color-info'),
          warning: getCssVar('--color-warning'),
          error: getCssVar('--color-error'),
        }
      }
    }
  }
})

createApp(App).use(vuetify).use(router).mount('#app')
