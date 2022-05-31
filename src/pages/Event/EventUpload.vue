<template>
<div class="wrap">
    <Title :title="$route.path" />

    <form @submit="submitForm">
      <div class="inputForm">
        <div class="inputTitle">제목</div>
        <div class="inputBox">
          <input type="text" v-model="title" required />
        </div>
      </div>

      <div class="inputForm">
        <div class="inputTitle">기간</div>
        <div class="inputBox selectDay">
          <div><datepicker v-model="selectStartDay" /></div>
          <span> ~ </span>
          <div><datepicker v-model="selectEndDay" /></div>
        </div>
      </div>

      <div class="inputForm">
        <div class="inputTitle">내용</div>
        <div class="inputBox">
          <textarea v-model="content" required></textarea>
        </div>
      </div>

      <div class="inputForm">
        <div class="inputTitle">이미지</div>
        <div class="inputBox">
          <input type="file" @change="upload" id="file" />
        </div>
      </div>
      
      <input class="uploadBtn" type="submit" value="업로드" />
    </form>

    
  </div>

</template>

<script>
import Datepicker from 'vue3-datepicker';
import Title from '@/components/Title.vue';
import { imgageUpload } from '@/data/imgUploadF';
import { get_date } from '@/data/getDate';
import { dbService } from '@/firebase';



export default {
  name: 'EventComponent',
  components: {
    Datepicker,
    Title
  },
  data(){
    return {
      title: '',
      content: '',
      selectStartDay: new Date(),
      selectEndDay: new Date(),
      startDay: '',
      endDay: '',
      imgFile: ''
    }
  },
  watch: {
    selectStartDay(a){
      this.startDay = get_date(a);
    },
    selectEndDay(a){
      this.endDay = get_date(a);
    }
  },
  methods: {
    upload(e){
      this.imgFile = e.target.files[0];
    },
    async submitForm(e){
      e.preventDefault();
      try{
        const gdsz = await imgageUpload(this.imgFile, 'event');
        await dbService.collection("event").add({
          id: Date.now(), 
          title: this.title, 
          content: this.content,
          startDay: this.startDay,
          endDay: this.endDay,
          attatchmentUrl: gdsz
        });
        alert('업로드 되었습니다.');
      } catch(err) {
        console.log(err);
      }
    },

  }
}
</script>

<style scoped>
  .selectDay {
    display: flex;
  }

  .selectDay span {
    margin: 0 10px;
  }

</style>