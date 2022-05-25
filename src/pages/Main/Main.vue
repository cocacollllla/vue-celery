<template>
  <div class="mainWrapper">

    <!-- <input v-model="testText" />
    <button class="please" @click="addToFirebase">클릭</button> -->
  </div>
</template>

<script>
import { dbService } from '@/firebase';
import '@/styles/Main/main.scss';


export default {
  name: 'MainComponent',
  data(){
    return {
      testText: ''
    }
  },
  methods: {
    addToFirebase(){
      dbService.collection('test').add({
        name: this.testText
      })
    }
  },
}
</script>

