import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/pages/Main/Main.vue';
import Menu from '@/pages/Menu/Menu.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/menu', name: 'Menu', component: Menu},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;