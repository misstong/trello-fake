import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import Message from '@/components/TMessage/TMessage.js';

import '@/assets/css/css.css'

Vue.config.productionTip = false
Vue.prototype.$message = Message

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
