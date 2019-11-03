var firebaseConfig = {
  apiKey: "AIzaSyAm9BtTy7W89QE6AZ5i_2knlKFu3jDzARQ",
  authDomain: "cbshack-3c5ee.firebaseapp.com",
  databaseURL: "https://cbshack-3c5ee.firebaseio.com",
  projectId: "cbshack-3c5ee",
  storageBucket: "cbshack-3c5ee.appspot.com",
  messagingSenderId: "336492211195",
  appId: "1:336492211195:web:beb89ee21669bed57f395e",
  measurementId: "G-HGQYQRZGHW"
};
firebase.initializeApp(firebaseConfig);

//=======================================cloud messaging logic starts=============================================
const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BPvF2GIda8pGJZqKYqug9QsH8Q0vFvfV9qc_EfAmrN4YbhKOqpalrviLIV6lRe4t30w4htkE0dMiqu-HNJHvufw"
);
messaging
  .requestPermission()
  .then(function() {
    console.log("Have permission");
    return messaging.getToken();
  })
  .then(function(token) {
    console.log(token);
  })
  .catch(function(err) {
    console.log(err);
  });

var messageReceived = null;
var personalInfo = null;
messaging.onMessage(function(payload) {
  messageReceived = payload["data"]["message"];
  alert(messageReceived);
  var patientData = databaseRef.once("value", gotData, errData);
  function gotData(data) {
    // console.log(data.val());
    var requiredInfo = { ...data.val() };
    // console.log(xinfo);
    personalInfo = requiredInfo[messageReceived]["Personal_Info"];
    var name = personalInfo["Name"];
    var age = personalInfo["Age"];
    var weight = personalInfo["Weight"];
    var bp = personalInfo["BloodPressure"];
    document.getElementById("b1").innerHTML = name;
    document.getElementById("b2").innerHTML = age;
    document.getElementById("b3").innerHTML = weight;
    document.getElementById("b4").innerHTML = bp;
    console.log(personalInfo);
  }
  function errData(err) {
    console.log(err);
  }
});
//=======================================cloud messaging logic ends=============================================

//======================================= realtime database starts =============================================
var databaseRef = firebase
  .database()
  .ref()
  .child("Patient"); //storing the reference to the firebase realtime database

function updatePatientData(patientID, weight, bloodPressure) {
  //function to update the data of the selected patient
  var data = {
    Weight: weight,
    BloodPressure: bloodPressure,
    Name: personalInfo["Name"],
    Age: personalInfo["Age"],
    Gender: personalInfo["Gender"]
  };
  var x = patientID;
  var id = "Personal_Info";
  firebase
    .database()
    .ref("Patient/" + x + "/" + id)
    .set(data);
  alert("Patient's Weight and Blood-Pressure updated");
  setTimeout(() => {
    location.reload();
  }, 3000);
}

var nurseForm = document.querySelector(".nurse-form"); //selecting the div with className = .nurse-form
if (nurseForm) {
  nurseForm.addEventListener("submit", e => {
    e.preventDefault();
    const weight = document.getElementById("weight").value;
    // console.log("weight ==== " + weight);
    // console.log("message received ====== ");
    // console.log(messageReceived);
    const bloodPressure = document.getElementById("bloodPressure").value;
    // console.log("bloodPressure ==== " + bloodPressure);
    updatePatientData(messageReceived, weight, bloodPressure);
  });
}
// var patientData = databaseRef.on('value', gotData, errData);
// function gotData(data){
//     // console.log(data.val());
//     var xinfo = {...data.val()};
//     console.log(xinfo);
//     var abcd = xinfo["+919354522796"];
//     // console.log(PersonalInfo);
//     var PersonalInfo = abcd["Personal Info"];
//     // var data =

// }
// function errData(err){
//     console.log(err);
// }

// var patientData = databaseRef.once('value', gotData, errData);
// function gotData(data){
//     // console.log(data.val());
//     var requiredInfo = {...data.val()};
//     // console.log(xinfo);
//     var personalInfo = requiredInfo[messageReceived]["Personal_Info"];
//     console.log(personalInfo);
// }
// function errData(err){
//     console.log(err);
// }
