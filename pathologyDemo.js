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
  var reports = null;
  messaging.onMessage(function(payload) {
    messageReceived = payload["data"]["message"];
    alert(messageReceived);
    var patientData = databaseRef.once("value", gotData, errData);
    function gotData(data) {
      // console.log(data.val());
      var requiredInfo = { ...data.val() };
      // console.log(xinfo);
      reports = requiredInfo[messageReceived]["Reports"];
      console.log(reports);
      var bp = personalInfo["BloodPressure"];
    var weight = personalInfo["Weight"];
    document.getElementById("b1").innerHTML = name;
    document.getElementById("b2").innerHTML = age;
    document.getElementById("b3").innerHTML = bp;
    document.getElementById("b4").innerHTML = weight;
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
  
  function updatePatientReport(patientID, reportURL) {
    //function to update the data of the selected patient
    var data = {};
    for (const key of Object.keys(reports)) {   
    data[key] = reports[key];
  }
    data["latestReport"] = reportURL;
    var x = patientID;
    var id = "Reports";
    firebase
      .database()
      .ref("Patient/" + x + "/" + id)
      .set(data);
    alert("Patient's reports uploaded");
  }
  

 // for (const key of Object.keys(medicines)) {   TODO
  //   medicineData[key] = medicines[key];
  // }

  var url = null;
  fileButton.addEventListener('change',function(e){

    for(let i=0;i<e.target.files.length;i++)
    {
        let reportFile=e.target.files[i];

        let storageRef=firebase.storage().ref("Reports"+reportFile.name);

        let task=storageRef.put(reportFile);

        task.on('state_changed',function progress(snapshot){
            let percentage= snapshot.bytesTransferred/ snapshot.totalBytes*100;

            console.log("Upload is"+ percentage + "% done");
            switch(snapshot.state){
                case firebase.storage.TaskState.PAUSED :
                    case firebase.storage.TaskState.PAUSED :
                        console.log("Upload is paused");
                        break;
                    case firebase.storage.TaskState.RUNNING :
                        console.log("Upload is running");
                        break;
                    
            }
        }, function(error) {

          }, function() {
            // Upload completed successfully, now we can get the download URL
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              url = downloadURL;
              console.log('File available at', downloadURL);
              updatePatientReport(messageReceived, downloadURL);
            });
          });
    }
})




  // var pathoForm = document.querySelector(".patho-form"); //selecting the div with className = .nurse-form
  // if (pathoForm) {
  //   pathoForm.addEventListener("submit", e => {
  //     e.preventDefault();
  //     const weight = document.getElementById("weight").value;
  //     // console.log("weight ==== " + weight);
  //     // console.log("message received ====== ");
  //     // console.log(messageReceived);
  //     const bloodPressure = document.getElementById("bloodPressure").value;
  //     // console.log("bloodPressure ==== " + bloodPressure);
  //     updatePatientData(messageReceived, weight, bloodPressure);
  //   });
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
  