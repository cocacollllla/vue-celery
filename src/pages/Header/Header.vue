<template>
  <div class="headerWrap">
    <div class="header">
      
      <div class="logo" @click="$router.push('/')">CELERY</div>
      <div class="menu">
        <Nav :menuList="menuList" />
      </div>
      
      
      <div :class="{ sideBtnOn : sideOpen}" class="sideMenuBtn" @click="sideOpen = !sideOpen">
        <span></span>
      </div>
      
      <transition name="menuSlide">
        <div class="sideMenuWrap" v-if="sideOpen">
          <Nav :menuList="menuList" @close-menu="sideOpen = !sideOpen" />
          <p>ⓒ 2022 CELERY</p>
        </div>
      </transition>

      <transition name="bgOpacity">
        <div class="grayBackground" v-if="sideOpen"></div>
      </transition>
      
    </div>
  </div>
</template>

<script>
import { MENULIST } from '@/data/menuList';
import Nav from '@/pages/Header/Nav.vue';
import '@/styles/Header/header.scss';

export default {
  name: 'HeaderComponent',
  components: {
    Nav
  },
  data(){
    return {
      menuList: MENULIST,
      sideOpen: false,
    }
  }
}
</script>

<style>

</style>