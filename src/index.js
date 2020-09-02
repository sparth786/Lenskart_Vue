import Vue from 'vue'
import App from './components/App.vue'

import VueRouter from 'vue-router'
import Routes from './components/routes'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import store from './store/index.js'
import ImageMagnifier from 'vue-image-magnifier'
Vue.use(ImageMagnifier)

import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import jwt from 'jwt-simple'
Vue.use(jwt)
Vue.use(VueRouter)
Vue.use(VueMaterial)

import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)
Vue.config.productionTip = false


const router=new VueRouter({
  routes:Routes,
  mode:'history'
})
new Vue({
  el: '#app',
  render: h => h(App),
  router:router,
  store:store 
})
