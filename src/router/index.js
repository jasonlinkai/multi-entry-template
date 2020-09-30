import Vue from 'vue';
import VueRouter from 'vue-router';
import { routerConfig } from '@/router/routerConfig.js';

Vue.use(VueRouter);

const router = new VueRouter(routerConfig);

export { router };
