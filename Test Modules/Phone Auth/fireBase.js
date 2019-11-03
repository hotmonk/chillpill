var fireBase = fireBase || firebase;
var hasInit = false;
var config = {
    apiKey: "AIzaSyBp9p9byi9MJ7Ty006sYOaXw4oroVebT0s",
    authDomain: "testmed-776da.firebaseapp.com",
    databaseURL: "https://testmed-776da.firebaseio.com",
    projectId: "testmed-776da",
    storageBucket: "testmed-776da.appspot.com",
    messagingSenderId: "1021166013547",
    appId: "1:1021166013547:web:a518e0624ac7b1ccdab52e",
    measurementId: "G-P9CGRZHJSP"
  };
if(!hasInit){
    firebase.initializeApp(config);
    hasInit = true;
}


