<template>
  <div class="ddd">
    <form @submit="submitForm">
      <input type="file" @change="upload" id="file" required />
      <!-- <img :src="`${imgFile}`" /> -->
      <input type="text" placeholder="샐러드이름" v-model="title" required />
      <input type="text" placeholder="칼로리" v-model="calorie" required />
      <input type="text" placeholder="상세설명" v-model="content" required />
      <input type="submit" value="업로드" />
    </form>

  </div>
</template>

<script>
import { dbService, storageService } from '@/firebase';

export default {
  name: 'Upload-component',
  data(){
    return {
      title: '',
      calorie: '',
      content: '',
      imgFile: ''
    }
  },
  methods: {
    upload(e){
      this.imgFile = e.target.files[0];
    },
    async submitForm(e){
      e.preventDefault();
      try{
        let loloca = storageService.ref();
        let please = await loloca.child(`salad/${this.imgFile.name}`).put(this.imgFile);
        let attatchmentUrl = await please.ref.getDownloadURL();
        await dbService.collection("salad").add({id: Date.now(), title: this.title, calorie:this.calorie, content: this.content, attatchmentUrl});
        alert('업로드 되었습니다.');
        this.title = '';
        this.calorie = '';
        this.content = '';
        this.imgFile = '';
      } catch(err) {
        console.log(err);
      }
  

    }
  }
}
</script>

<style scoped>
  .ddd {
    margin-top: 200px;
    padding: 50px;

  }

  input {
    display: block;
    width: 500px;
    margin-bottom: 10px;
    padding: 8px 10px;
  }

  textarea {
    display: block;
    width: 500px;
    height: 100px;
    margin-bottom: 10px
  }
</style>