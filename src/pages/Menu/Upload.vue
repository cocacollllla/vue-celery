<template>
<div class="wrap">
    <Title :title="$route.path" />
    <form @submit="submitForm">
      <div class="inputForm">
        <div class="inputTitle">메뉴명</div>
        <div class="inputBox">
          <input type="text" v-model="title" required />
        </div>
      </div>

      <div class="inputForm">
        <div class="inputTitle">메뉴설명</div>
        <div class="inputBox">
          <input type="text" v-model="content" required />
        </div>
      </div>

      <div class="inputForm">
        <div class="inputTitle">메뉴이미지</div>
        <div class="inputBox">
          <input type="file" @change="upload" id="file" />
        </div>
      </div>
      
      <input class="uploadBtn" type="submit" value="업로드" />
    </form>

  </div>
</template>

<script>
import { dbService } from '@/firebase';
import Title from '@/components/Title.vue';
import { imgageUpload } from '@/data/imgUploadF';

export default {
  name: 'Upload-component',
  components: {
    Title
  },
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
        const gdsz = await imgageUpload(this.imgFile, 'salad');
        await dbService.collection("salad").add({id: Date.now(), title: this.title, content: this.content, attatchmentUrl: gdsz});
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
