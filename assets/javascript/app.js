// firebase 
var firebaseConfig = {
    apiKey: "AIzaSyCh_MmJItTGX_IIi97fc7kZQphBrERblyo",
    authDomain: "train-time-cfbdb.firebaseapp.com",
    databaseURL: "https://train-time-cfbdb.firebaseio.com",
    projectId: "train-time-cfbdb",
    storageBucket: "train-time-cfbdb.appspot.com",
    messagingSenderId: "648797772104",
    appId: "1:648797772104:web:be1206ad54b0ed86"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // make a variable reference to the database

  var database = firebase.database();

  $("#add-train-btn").on("click", function() {

    // take input from the form and store locally
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();
  
    // object to hold the form data
    var newTrain = {
  
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    
  
    // Clears all form fields
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
  
    // Determine when the next train arrives.
    return false;
  });
  
  // adds to the database when form is filled out
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;
  
    var timeArr = tFirstTrain.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;
  
    // If the first train is later than the current time, sent arrival to the first train time
    if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {
  
      // figure out minutes till arrival
      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % tFrequency;
      tMinutes = tFrequency - tRemainder;
      // To calculate the arrival time, add the tMinutes to the current time
      tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }
    
  
    // Add each train's data into the table
    $("#train-table").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
            tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  });
  