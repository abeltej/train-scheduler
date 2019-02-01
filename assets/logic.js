

// 1. Initialize Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBpy1hbF9NgjS8ujODbtaq6RAqibYSUvOQ",
    authDomain: "project1-eb6ab.firebaseapp.com",
    databaseURL: "https://project1-eb6ab.firebaseio.com",
    projectId: "project1-eb6ab",
    storageBucket: "project1-eb6ab.appspot.com",
    messagingSenderId: "170733158113"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var firstTime = $("#start-input").val().trim();
    var trainRate = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      role: trainDest,
      start: firstTime,
      rate: trainRate
    };
    
    // Uploads train data to the database
    database.ref().push(newTrain);
    
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.role);
    console.log(newTrain.start);
    console.log(newTrain.rate);
    
    alert("train successfully added");
    
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().role;
    var firstTime = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;
    
    // train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(firstTime);
    console.log(trainRate);
    
    // Prettify the train start
    // var firstTimePretty = moment.unix(firstTime).format("hh, mm");

    
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(firstTime, "X"), "months");
    // console.log(empMonths);
    
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

    console.log("First:" + firstTime);

    console.log("Converted first:" + firstTimeConverted);
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainRate;
    console.log("Time Remainder:" + tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainRate - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainRate),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),

      
      // $("<td>").text(firstTimePretty),
      // $("<td>").text(empMonths),
      );
      
      // Append the new row to the table
      $("#train-table > tbody").append(newRow);
    });
    
    
    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // // It would be 3:21 -- 5 minutes away
    
    // var tFrequency = 3;
    
    
    // Solved Mathematically
    // // Test case 2:
    // // 16 - 00 = 16
    // // 16 % 7 = 2 (Modulus is the remainder)
    // // 7 - 2 = 5 minutes away
    // // 5 + 3:16 = 3:21

    // // Assumptions

    // // Time is 3:30 AM
    // var firstTime = "03:30";

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // Current Time

