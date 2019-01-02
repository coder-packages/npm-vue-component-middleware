# Middleware for using in VUE components

## Example of using

Middleware auth.js
```js
export default function auth ({ to, from, next, store, router }) {
  if (!store.getters.auth.loggedIn) {
    return router.push({
      name: 'signin'
    })
  }

  return next()
}
```

Homepage.vue
```html
<template>
  ...
</template>

<script type="text/javascript">
import auth from './auth'
export default {
  middleware: [auth]
}
</script>
```

routes.js
```js
import Vue from 'vue'
import Router from 'vue-router'
import middlewaresInComponents from 'coder-vue-component-middleware'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: [
      	middleware: [auth] // also you can use same middleware in routes
      ]
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninPage
    }
  ]
})

middlewaresInComponents({router, store})
export default router
```
