<template>
  <div class="shopList">
    <div class="shop" v-for="shop in resultList" :key="shop.id" @click="$router.push(`/shop/detail/${shop.docId}`);">
      <div class="shopImg"><img :src="shop.attatchmentUrl" /></div>
      <div class="shopInfo">
        <div class="shopName">{{shop.name}}</div>
        <div class="shopAddr">{{`${shop.address} ${shop.detailAddr}`}}</div>
        <div class="shopCall"><i class="fa-solid fa-phone"></i>{{shop.call}}</div>
      </div>
      
    </div>
  </div>
  
</template>

<script>
import '@/styles/Shop/shopList.scss';

export default {
  name: 'ShopList',
  props: {
    resultList: Array
  },
}
</script>

<style>

</style>