// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vue-select/dist/vue-select.css';
import Vue from 'vue';
import vSelect from 'vue-select';
import App from './App';
import router from './router';

const infiniteScroll = require('vue-infinite-scroll');

Vue.use(infiniteScroll);

Vue.component('v-select', vSelect);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
