// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './unit/rem'

import './style/normalize.css'
import './style/config.css'
import './style/base.css'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

import Api from './unit/api'
Vue.use(Api);

import VueResource from 'vue-resource'
Vue.use(VueResource);

// import './sdk'  微信 sdk

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

