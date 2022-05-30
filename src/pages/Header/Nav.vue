<template>
  <ul>
    <li :class="{ menuOn : menu2 === value}" @click="goToMenu(value)" v-for="(value, menu) in menuList" :key="value">{{menu}}</li>
  </ul>
</template>

<script>
export default {
  name: 'NavComponent',
  props: {
    menuList: Object
  },
  data(){
    return {
      menu2 : ''
    }
  },
  methods: {
    goToMenu(value){
      this.$router.push(`/${value}`);
      this.$emit('close-menu')
    }
  },
  watch : {
    $route (a) {
      if(a.name !== undefined) {
        this.menu2 = this.$route.path.split('/')[1]
      }
    }
  },
}
</script>

