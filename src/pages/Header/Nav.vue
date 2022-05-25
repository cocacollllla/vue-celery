<template>
  <ul>
    <li :class="{ menuOn : lower === value}" @click="goToMenu(value)" v-for="(value, menu) in menuList" :key="value">{{menu}}</li>
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
      lower : ''
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
        this.lower = a.name.toLowerCase();
        console.log(this.lower)
      }
    }
  },
}
</script>

