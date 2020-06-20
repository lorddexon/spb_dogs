import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Main from '../components/Main'
import NotFound from '../components/404'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    meta: {
      title: 'Dogs'
    },
    children: [
      {
        path: '/favorites',
        name: 'favorite',
        component: Main
      },
      {
        path: '/:breed',
        name: 'breed',
        component: Main
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  base: process.env.BASE_URL
})

router.beforeEach((to, from, next) => {
  store.commit('SET_SECTION', to.name)
  store.commit('SET_SORT_TYPE', { sortType: 'random' })
  next()
})

export default router
