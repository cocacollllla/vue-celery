import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFq86V6DUBfBGzUALYKNFoDh52X9yIY4Q",
  authDomain: "vue-celery.firebaseapp.com",
  projectId: "vue-celery",
  storageBucket: "vue-celery.appspot.com",
  messagingSenderId: "296313689995",
  appId: "1:296313689995:web:4c40136485c181ab99818e"
};

firebase.initializeApp(firebaseConfig);

export const dbService = firebase.firestore();
export const storageService = firebase.storage();