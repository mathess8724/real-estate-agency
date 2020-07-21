import React from 'react'
import * as firebase from 'firebase'

function FirebaseConfig(){

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyCyTH1gjuP166oz1z9sXN0R0_FtwrBekbQ",
  authDomain: "monagence-daf4c.firebaseapp.com",
  databaseURL: "https://monagence-daf4c.firebaseio.com",
  projectId: "monagence-daf4c",
  storageBucket: "monagence-daf4c.appspot.com",
  messagingSenderId: "1008547303734",
  appId: "1:1008547303734:web:da8b0bd6f0fe7efb92e397"


  };
  // Return config
  return firebase.initializeApp(firebaseConfig)

}
  export default FirebaseConfig;
