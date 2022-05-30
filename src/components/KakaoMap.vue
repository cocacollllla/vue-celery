<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: 'KakaoMap',
  props: {
    title: String,
    address: String,
  },
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?appkey=7273a3a370152971f65457303531daca&libraries=services&autoload=false';
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 2, //지도의 레벨(확대, 축소 정도)
      };
      let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      this.map = map;

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new window.kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(this.address,function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });


            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
            
          }
        }
      );
    },
  },
};
</script>

<style>
  #map {
    width: 100%;
    height: 100%;
  }
</style>


