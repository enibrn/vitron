import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import BlogHome from './components/BlogHome.vue'
import { Theme } from 'vitepress'

const customTheme: Theme = {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    // Register the BlogHome component globally
    app.component('BlogHome', BlogHome)
  }
}

export default customTheme