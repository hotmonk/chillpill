var fireBase = fireBase || firebase;
var hasInit = false;
var config = {
  apiKey: "AIzaSyAm9BtTy7W89QE6AZ5i_2knlKFu3jDzARQ",
  authDomain: "cbshack-3c5ee.firebaseapp.com",
  databaseURL: "https://cbshack-3c5ee.firebaseio.com",
  projectId: "cbshack-3c5ee",
  storageBucket: "cbshack-3c5ee.appspot.com",
  messagingSenderId: "336492211195",
  appId: "1:336492211195:web:fde44d94f393e9b57f395e",
  measurementId: "G-CBB3EQN0FF"
  };
if(!hasInit){
    firebase.initializeApp(config);
    hasInit = true;
}


