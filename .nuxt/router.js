import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _20557a77 = () => interopDefault(import('../pages/add/_id.vue' /* webpackChunkName: "pages/add/_id" */))
const _19f88346 = () => interopDefault(import('../pages/posts/_activity.vue' /* webpackChunkName: "pages/posts/_activity" */))
const _8c1ac18c = () => interopDefault(import('../pages/profile/_username.vue' /* webpackChunkName: "pages/profile/_username" */))
const _cfec7f8c = () => interopDefault(import('../pages/rank/_year/_month/_day.vue' /* webpackChunkName: "pages/rank/_year/_month/_day" */))
const _2dd02c86 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _290355a0 = () => interopDefault(import('../pages/_destination/_flag.vue' /* webpackChunkName: "pages/_destination/_flag" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/add/:id?",
    component: _20557a77,
    name: "add-id"
  }, {
    path: "/posts/:activity?",
    component: _19f88346,
    name: "posts-activity"
  }, {
    path: "/profile/:username?",
    component: _8c1ac18c,
    name: "profile-username"
  }, {
    path: "/rank/:year?/:month?/:day?",
    component: _cfec7f8c,
    name: "rank-year-month-day"
  }, {
    path: "/",
    component: _2dd02c86,
    name: "index"
  }, {
    path: "/:destination/:flag?",
    component: _290355a0,
    name: "destination-flag"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
