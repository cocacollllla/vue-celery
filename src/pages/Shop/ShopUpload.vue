<template>
  <div class="wrap">
    <Title :title="$route.path" />

    <form @submit="submitForm">
      <div class="inputForm">
        <div class="inputTitle">지점명</div>
        <div class="inputBox">
          <input type="text" v-model="name" required />
        </div>
      </div>

      <div class="inputForm">
        <div class="inputTitle">지점전화번호</div>
        <div class="inputBox">
          <input type="text" v-model="callNum" @input="getHyphen(callNum)" />
        </div>
      </div>

      <div class="inputForm addressForm">
        <div class="inputTitle">지점주소</div>
        <div class="inputBox">
          <input class="addrBtn" type="button" @click="execDaumPostcode()" value="주소 검색">
          <input type="text" id="address" readonly v-model="address" required>
          <input type="text" id="detailAddr" v-model="detailAddr" placeholder="상세주소">
        </div>
      </div>

      <div class="inputForm">
        <div class="inputTitle">지점이미지</div>
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
import { imgageUpload } from '@/data/imgUploadF';
import Title from '@/components/Title.vue';
import '@/styles/Shop/shopUpload.scss';

export default {
  name: 'ShopUpload',
  components: {
    Title
  },
  data(){
    return {
      name: '',
      address: '',
      callNum: '',
      detailAddr : '',
      imgFile: '',
    }
  },
  methods: {
    upload(e){
      this.imgFile = e.target.files[0];
    },
    async submitForm(e){
      e.preventDefault();
      try{
        const gdsz = await imgageUpload(this.imgFile, 'shop');
        await dbService.collection("shop").add({
          id: Date.now(), 
          name: this.name, 
          address: this.address,
          detailAddr: this.detailAddr,
          call: this.callNum,
          attatchmentUrl: gdsz
        });
        alert('업로드 되었습니다.');
      } catch(err) {
        console.log(err);
      }
    },

    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {

          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
          }

        },
      }).open();
    },

   

    getHyphen(number){

      let res = '';
      let cNumber = number.replace(/[^0-9]/g, '');

      if(cNumber.length < 4){
        res = cNumber;
      } else if(cNumber.length < 7) {
        if(cNumber.startsWith('02')){
          res = cNumber.slice(0, 2) + '-' + cNumber.slice(2);
        } else {
          res = cNumber.slice(0, 3) + '-' + cNumber.slice(3);
        }

      } else if(cNumber.length < 11) { 
        if(cNumber.startsWith('02')){
          if(cNumber.length < 10) {
            res = cNumber.slice(0, 2) + '-' + cNumber.slice(2, 5) + '-' + cNumber.slice(5);
          } else {
            res = cNumber.slice(0, 2) + '-' + cNumber.slice(2, 6) + '-' + cNumber.slice(6); 
          }
          
        } else {
          res = cNumber.slice(0, 3) + '-' + cNumber.slice(3, 6) + '-' + cNumber.slice(6); 
        }

      } else {
        if(!cNumber.startsWith('02')){
          res = cNumber.slice(0, 3) + '-' + cNumber.slice(3, 7) + '-' + cNumber.slice(7);
        }
      }

      this.callNum = res

    }
  },

}
</script>
