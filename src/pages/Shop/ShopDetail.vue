<template>
  <div class="wrap">
    <Title :title="$route.path" />
    <div class="mapContentWrap">
      <div class="mapBox">
        <KakaoMap v-if="Object.keys(shopData).length !== 0" :title="shopData.name" :address="shopData.address" />
      </div>
      <div class="shopDetailBox">
        <div class="detailImage"><img :src="shopData.attatchmentUrl" /></div>
        <div class="detailInfo">
          <div class="detailName">{{shopData.name}}</div>
          <div class="detailAddr">{{shopData.address}} {{shopData.detailAddr}}</div>
          <div class="detailCall"><i class="fa-solid fa-phone"></i>{{shopData.call}}</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { dbService } from '@/firebase';
import KakaoMap from '@/components/KakaoMap.vue';
import Title from '@/components/Title.vue';
import '@/styles/Shop/shopDetail.scss';

export default {
  name: 'ShopDetail',
  components: {
    KakaoMap,
    Title
  },
  data(){
    return {
      shopData : {},
    }
  },
  mounted() {
    dbService.collection('shop').doc(this.$route.params.id).get().then((doc) => {
      this.shopData = doc.data();
    });


  },

}

</script>

<style>

</style>