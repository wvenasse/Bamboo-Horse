import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'
import Card from './components/Card.vue'
import ListCardView from './components/ListCard.vue'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import axios from 'axios'
import './plugins/element.js'

import Cookies from 'js-cookie'

import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')




Vue.use(VideoPlayer);

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(Cookies);

Vue.component('m-card',Card);
Vue.component('m-list-card',ListCardView);

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})


import http from './http'
Vue.prototype.$http = http;
Vue.mixin({
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: 'Bearer ' + (localStorage.token || '')
      }
    }
  }
});


import { Button, Cell } from 'mint-ui';
import { CellSwipe } from 'mint-ui'; 
Vue.component(CellSwipe.name, CellSwipe);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
