import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/pages/Main/Main.vue';
import Menu from '@/pages/Menu/Menu.vue';
import Calorie from '@/pages/Calorie/Calorie.vue';
import Upload from '@/components/Upload.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/menu', name: 'Menu', component: Menu},
  { path: '/calorie', name: 'Calorie', component: Calorie},
  { path: '/upload', component: Upload },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;