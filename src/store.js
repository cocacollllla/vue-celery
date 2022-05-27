import  { createStore } from 'vuex';
import { dbService } from './firebase';

const store = createStore({
  state () {
    return {
      products: []
    }
  },
  mutations: {
    getProducts(state, payload) {
      state.products = payload
    }
  },

  actions : {
    getData(context){

      dbService.collection('salad').get().then((querySnapshot) => {
        let getMenu = [];
        querySnapshot.forEach((doc) => {
          getMenu = [...getMenu, {docId: doc.id, ...doc.data()}];
        });
        context.commit('getProducts', getMenu); 
      });
    }

  },
  getters : {
    modifyData: state => {
      const stateData = [...state.products];
      const objeff = [];
      stateData.forEach(el => {
        objeff.push({title: el.title, kcal: parseInt(el.calorie), cate: 0,})
      });
      const menuCalorie = {subject: '메뉴', list: objeff};
      return menuCalorie;
    }
  }
});

export default store;