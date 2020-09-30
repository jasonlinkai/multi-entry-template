import Vue from 'vue';
import Entry from '@/templateEntry/Lottery002.vue';
Vue.config.productionTip = false;

new Vue({
  render: h => h(Entry),
}).$mount('#app');
