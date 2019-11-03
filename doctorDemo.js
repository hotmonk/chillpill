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
var appointmentsInfo = null;
var medicinesInfo = null;
var reportsInfo = null;
// -------------------------------------------------
var name = null;
var age = null;
var bp = null;
var weight = null;
var messageID = null;
//--------------------------------------------------
messaging.onMessage(function(payload) {
  messageID = payload["data"]["message"];
  messageReceived = payload["data"]["message"];
  alert(messageReceived);
  var patientData = databaseRef.once("value", gotData, errData);
  function gotData(data) {
    var requiredInfo = { ...data.val() };
    personalInfo = requiredInfo[messageReceived]["Personal_Info"];
    name = personalInfo["Name"];
    console.log("name=======" + name);
    age = personalInfo["Age"];
    bp = personalInfo["BloodPressure"];
    weight = personalInfo["Weight"];
    appointmentsInfo = requiredInfo[messageReceived]["Appointments"];
    medicinesInfo = requiredInfo[messageReceived]["Medicines"];
    reportsInfo = requiredInfo[messageReceived]["Reports"];
    
    document.getElementById("b1").innerHTML = name;
    document.getElementById("b2").innerHTML = age;
    document.getElementById("b3").innerHTML = bp;
    document.getElementById("b4").innerHTML = weight;
    // console.log(personalInfo);
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

function updateDoctorData(patientID, date, remarks, medicine, routine) {
  var appointmentData = {
    Date: date,
    Remarks: remarks
  };
  var medicineData = {
    medicine: routine
  };
  // var medicineData = {};
  // for (const key of Object.keys(medicines)) {   TODO
  //   medicineData[key] = medicines[key];
  // }
  // console.log("Medicines ========= "); TODO
  // console.log(medicineData);  TODO
  var x = patientID;
  var id1 = "Appointments";
  var id2 = "Medicines";
  firebase
    .database()
    .ref("Patient/" + x + "/" + id1)
    .set(appointmentData);
  firebase
    .database()
    .ref("Patient/" + x + "/" + id2)
    .set(medicineData);
  alert("Patient's data updated.");
}

const sendNotification = async (message, id) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "key=AAAATlh_q_s:APA91bFXP4MGfeaFvrZkRpmpqoKJZEcKGSsH-qZlqR7cmkU4-xCtfbJrtByxBrr5MBrNHB7I6cPOH-f7MrjIX0f7iGd_GPvplY6QzidCxnnXU5lGUitZna1-i0IhlSUiJIcvLpio2Aih"
      }
    };
    // var data = {
    //   to:
    //     "/topics/919667099953",
    //   data: {
    //     title: "Lauda Lassan",
    //     message: message
    //   }
    // };
    var data = {
      to: "/topics/" + id,
      data: {
        title: "Take a chill pill",
        message: message
      }
    };
    let res = await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      data,
      options
    );
    console.log("Patient has been notified");
    // window.setTimeout(() => {
    //   location.reload();
    // }, 3000);
  } catch (err) {
    console.log(err);
  }
};

var doctorForm = document.querySelector(".doctor-form"); //selecting the div with className = .nurse-form
if (doctorForm) {
  doctorForm.addEventListener("submit", e => {
    e.preventDefault();
    const date = document.getElementById("date").value;
    const remarks = document.getElementById("remarks").value;
    const medicines = document.getElementById("medicines").value;
    console.log("medicines=========" + medicines);
    var routine = "";
    const cb1 = document.getElementById("cb1").checked;
    if (cb1 === true) {
      routine += "X";
    } else {
      routine += "0";
    }
    const cb2 = document.getElementById("cb2").checked;
    if (cb2 === true) {
      routine += "X";
    } else {
      routine += "0";
    }
    const cb3 = document.getElementById("cb3").checked;
    if (cb3 === true) {
      routine += "X";
    } else {
      routine += "0";
    }
    updateDoctorData(messageReceived, date, remarks, medicines, routine);
    sendNotification("Doctor has updated the medicines", messageID);
  });


}

// var pastHistory = document.getElementById("pastHistory");
// if(pastHistory){
//     pastHistory.addEventListener("click", function(personalInfo, appointmentsInfo, medicinesInfo, reportsInfo){

//     });
// }

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
