<template>
  <div class="wrap">
    <Title :title="$route.name" />
    <div class="menuWrap">
      <div class="salad" v-for="menu in salad" :key="menu.id">
        <div class="saladImage"><img :src="menu.attatchmentUrl" /></div>
        <div class="saladTitle">{{menu.title}}</div>
        <p>{{menu.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { dbService } from '@/firebase';
import Title from '@/components/Title.vue';
import '../../styles/Menu/menu.scss';

export default {
  name: 'MainComponent',
  components: {
    Title
  },
  data(){
    return {
      salad: [],
    }
  },
  mounted(){
    dbService.collection('salad').get().then((querySnapshot) => {
      let getMenu = [];
      querySnapshot.forEach((doc) => {
        getMenu = [...getMenu, {docId: doc.id, ...doc.data()}];
      });
      this.salad = getMenu;
    });

  }
}
</script>

<style>

</style>