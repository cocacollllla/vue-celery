<template>
  <div class="title">
    <span>{{menu2}}</span>
  </div>
</template>

<script>
import { MENULIST } from '@/data/data';

export default {
  name: 'title-component',
  props: {
    title: String
  },
  data(){
    return {
      menu2: '',
      menuList: MENULIST,
    }
  },
  mounted(){
    const changeMenu = this.title.toLowerCase();
    this.menu2 = Object.keys(this.menuList).find(key => this.menuList[key] === changeMenu);
  }
}
</script>

<style>
.title {
  padding: 150px 0 50px 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
}

.title span {
  position: relative;
}

.title span:after {
  content:"";
  display: block;
  width: 40px;
  height: 3px;
  position: absolute;
  bottom: -20px;
  left: 50%;
  margin-left: -20px;
  background-color: #333;
}

</style>