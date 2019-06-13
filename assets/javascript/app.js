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