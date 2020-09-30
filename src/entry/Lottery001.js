import Vue from 'vue';
import Entry from '@/templateEntry/Lottery001.vue';
Vue.config.productionTip = false;

new Vue({
  render: h => h(Entry),
}).$mount('#app');
