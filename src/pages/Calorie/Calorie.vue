<template>
  <div class="wrap">
    <Title :title="$route.path" />
    <div class="calorieWrap">
      <div class="contentWrap">

        <div class="calorieListWrap">
          <!-- 반복될 부분-->
          <div class="calorieListBox" v-for="topping in calorieData" :key="topping.subject">
            <div class="calorieListSubject">{{topping.subject}} 선택</div>
            <div class="calorieSelectBox">
              <select @change="onChange($event)">
                <option value="">{{topping.subject}}을 선택해주세요.</option>
                <option v-for="(name, idx) in topping.list" :value="JSON.stringify(name)" :key="idx">{{name.title}}</option>
              </select>
            </div>
          </div>
          <!-- 반복될 부분-->
        </div>

        <div class="calorieSelected">
          <div class="selectedBox">
            <div v-if="result !== 0">
              <div class="selectedListBox" v-for="select in sortSelected" :key="select.title">
                <div v-if="select.list.length !== 0" class="selectedTitle">{{select.title}}</div>
                <div v-if="select.list.length !== 0" class="selectedList">
                  <div v-for="li in select.list" :key="li.title">{{li.title}} ({{li.kcal}} kcal) <span @click="deleteKcal(li)"><i class="fa-solid fa-circle-xmark"></i></span></div>
                </div>
              </div>
            </div>
            <div v-else class="noData">선택된 토핑 및 드레싱이 없습니다.</div>
          </div>

          <div class="calorieResult">
            {{result}} Kcal
          </div>
        </div>

      </div>

    </div>


      

   
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import { CALORIE } from '@/data/calorie';
import '@/styles/Calorie/calorie.scss';

export default {
  name: 'calorie-component',
  components: {
    Title
  },
  data(){
    return {
      calorie: CALORIE,
      sortSelected: [
        {title: '메뉴', list: []}, 
        {title: '메인토핑', list: []}, 
        {title: '서브토핑', list: []}, 
        {title: '드레싱', list: []}
      ],
    }
  },
  mounted(){
    this.$store.dispatch('getData');
  },
  computed: {
    calorieData(){
      const copydata = [...this.calorie];
      copydata.unshift(this.$store.getters.modifyData);
      return copydata
    },
     
    result(){
      let calorieSum = this.sortSelected.map(el => {
        return el.list.reduce((acc, current) => acc + current.kcal, 0);
      });
      const calorieResult = calorieSum.reduce(function(a, b){ return a + b; }, 0);
      return calorieResult;
    },
  },
  methods: {

    onChange(e) {
      const value = JSON.parse(e.target.value);
      const cate = value.cate; 

      if(cate === 0){ // 메뉴면
        this.sortSelected[cate].list = [];
        this.sortSelected[cate].list.push(value);
      } else { // 메뉴 아니면
        const result = this.sortSelected[cate].list.some(topping => topping.title === value.title);
        
        if(!result){ // 총 배열에 없으면
          this.sortSelected[cate].list = [...this.sortSelected[cate].list, value]
        }
      } 
      
    },
    deleteKcal(del) {
      const delList = this.sortSelected[del.cate].list.filter(topping => topping.title !== del.title);
      this.sortSelected[del.cate].list = delList;
    }
  },
}
</script>
