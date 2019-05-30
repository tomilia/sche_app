import firebase from 'firebase';

// Initialize your firebase app
firebase.initializeApp({
  apiKey: "AIzaSyCM_oITgfpBEGAdIjNFdh1anuTOnmfKJvU",
  authDomain: "forregistration-cefe1.firebaseapp.com",
  databaseURL: "https://forregistration-cefe1.firebaseio.com",
  projectId: "forregistration-cefe1",
  storageBucket: "forregistration-cefe1.appspot.com",
  messagingSenderId: "110541503440",
  appId: "1:110541503440:web:b15fa4b9fc9fd9d2"
})

export const db = firebase.firestore()
