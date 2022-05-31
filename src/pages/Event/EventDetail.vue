<template>
  <div class="wrap">
    <Title :title="$route.path" />
    <div class="eventDetailWrap">
      <div class="eventDetail">
        <div class="eDetailTitle">&lt;EVENT&gt; {{eventData.title}}</div>
        <div class="eDetailTime">이벤트 기간 : {{eventData.startDay}} ~ {{eventData.endDay}}</div>
        <div class="eDetailContent">
          <img :src="eventData.attatchmentUrl" />
          <p>{{eventData.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import { dbService } from '@/firebase';
import '../../styles/Event/eventDetail.scss';

export default {
  name: 'EventComponent',
  components: {
    Title
  },
  data(){
    return {
      eventData : {},
    }
  },
  mounted() {
    dbService.collection('event').doc(this.$route.params.id).get().then((doc) => {
      this.eventData = doc.data();
    });


  },
}
</script>

<style>

</style>