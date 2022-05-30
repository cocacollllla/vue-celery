import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/pages/Main/Main.vue';
import Menu from '@/pages/Menu/Menu.vue';
import Calorie from '@/pages/Calorie/Calorie.vue';
import Shop from '@/pages/Shop/Shop.vue';
import ShopUpload from '@/pages/Shop/ShopUpload.vue';
import ShopDetail from '@/pages/Shop/ShopDetail.vue';
import Upload from '@/pages/Menu/Upload.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/menu', name: 'Menu', component: Menu},
  { path: '/menu/upload', component: Upload },
  { path: '/calorie', name: 'Calorie', component: Calorie},
  { path: '/shop', name: 'Shop', component: Shop},
  { path: '/shop/upload', name: 'ShopUpload', component: ShopUpload},
  { path: '/shop/detail/:id', name: 'ShopDetail', component: ShopDetail},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;