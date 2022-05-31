<template>
  <div class="wrap">
    <Title :title="$route.path" />

    <div class="eventWrap">

      <div class="eventBtn">
        <div class="writeBtn"><button @click="$router.push(`/event/upload`)">글쓰기</button></div>
        <div :class="{ btnOn : btnOn === 1}" @click="eventSort('ing')">진행중인 이벤트</div>
        <div :class="{ btnOn : btnOn === 2}" @click="eventSort('end')">종료된 이벤트</div>
      </div>

      <div class="eventList">
        <!-- 반복 -->
        <div class="event" @click="$router.push(`/event/detail/${event.docId}`)" v-for="event in resultList" :key="event.id">
          <div class="eventImg"><img :src="event.attatchmentUrl" /></div>
          <div class="eventInfo">
            <div class="eventTitle">&lt;EVENT&gt; {{event.title}}</div>
            <div class="eventTime">
              <i class="fa-regular fa-clock"></i>
              <span>이벤트 기간</span>
              <span>{{`${event.startDay} ~ ${event.endDay}`}}</span>
            </div>
          </div>
          <div class="eventState">
            <span v-if="event.isEnd" >종료</span>
            <span v-else>진행중</span>
          </div>
        </div>
        <!-- 반복 -->
      </div>
      


    </div>

    
  </div>

</template>

<script>

import Title from '@/components/Title.vue';
import { dbService } from '@/firebase';
import { get_date } from '@/data/getDate';
import '../../styles/Event/event.scss';



export default {
  name: 'EventComponent',
  components: {
    Title
  },
  data(){
    return {
      eventList: [],
      resultList: [],
      btnOn: 0
    }
  },
  methods: {
    eventSort(what) {
      what === 'ing' ? this.btnOn = 1 : this.btnOn = 2;

      const ingList = this.eventList.filter(el => {
        return what === 'ing' ? el.isEnd === false : el.isEnd === true
      });

      this.resultList = ingList;
      
    }
  },
  mounted(){
    dbService.collection('event').get().then((querySnapshot) => {
      let getEvent = [];
      let today = new Date();
      let yesterday = new Date(today.setDate(today.getDate() - 1));
      querySnapshot.forEach((doc) => {
        let end = false;
        if(doc.data().endDay <= get_date(yesterday)){
          end = true
        }
        getEvent = [...getEvent, {docId: doc.id, isEnd: end, ...doc.data()}];
      });
      this.eventList = getEvent;
      this.resultList = getEvent;
    });
  }
  
  
}
</script>

<style>

</style>