import Vue from 'vue'
import Router from 'vue-router'
import BitcoinConverter from '@/components/BitcoinConverter'
import VueAnalytics from 'vue-analytics'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: BitcoinConverter,
      meta: {
        title: 'Home Page - Example App',
        metaTags: [
          {
            name: 'description',
            content: 'The home page of our example app.'
          },
          {
            property: 'og:description',
            content: 'The home page of our example app.'
          }
        ]
      }
    }
  ]
})

Vue.use(VueAnalytics, {
  id: 'UA-249443-35',
  router
})

export default router
