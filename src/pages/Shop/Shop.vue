<template>
  <div class="wrap">
    <Title :title="$route.path" />
    <div class="shopWrap">

      <div class="titleText">
        <div>가맹점을 확인하세요.</div>
        <p>오프라인 매장의 원하는 지역을 선택해주시기 바랍니다.</p>
      </div>
      <div class="searchSelect">
        <div>
          <select v-model="citiesValue">
            <option value="">지역을 선택해주세요.</option>
            <option v-for="(city, idx) in cities" :value="city" :key="idx">{{city}}</option>
          </select>
          <select v-model="areaValue">
            <option value="">지역을 선택해주세요.</option>
            <option v-for="(ar, idx) in area[citiesValue]" :value="ar" :key="idx">{{ar}}</option>
          </select>
        </div>
        
        <button @click="searchHandler">조회하기</button>
        
      </div>

      <div class="writeBtn"><button @click="$router.push(`/shop/upload`)">글쓰기</button></div>
      <ShopList v-if="resultList.length !== 0" :resultList="resultList" />
      <div v-else class="noData">해당 지역에 매장이 없습니다.</div>



    </div>
    
  </div>

  

</template>

<script>
import { dbService } from '@/firebase';
import Title from '@/components/Title.vue';
import ShopList from '@/pages/Shop/ShopList.vue';
import { cities, area } from '@/data/area';
import '@/styles/Shop/shop.scss';

export default {
  name: 'ShopComponent',
  components: {
    Title,
    ShopList
  },
  data(){
    return {
      shopList : [],
      cities,
      area,
      citiesValue: '',
      areaValue: '',
      resultList : []
    }
  },
  methods: {
    searchHandler(){
      const test = this.shopList.filter(el => {
        return el.address.includes(`${this.citiesValue} ${this.areaValue}`);
      });
      this.resultList = test;
    }
  },
  mounted(){
    dbService.collection('shop').get().then((querySnapshot) => {
      let getMenu = [];
      querySnapshot.forEach((doc) => {
        getMenu = [...getMenu, {docId: doc.id, ...doc.data()}];
      });
      this.shopList = getMenu;
      this.resultList = getMenu;
    });
  }
}
</script>
