var config = {
apiKey: "AIzaSyC0SBTHqCXRTU70HHH3ny_70y3YjqeyzGs",
authDomain: "mytraintimetable.firebaseapp.com",
databaseURL: "https://mytraintimetable.firebaseio.com/",
projectId: "mytraintimetable",
storageBucket: "",
messagingSenderId: "589133943418"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var frequency = 0;

$(document).on("click", "#add-train-btn", function(event) {
    event.preventDefault();

    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    console.log(trainName)
    console.log(destination)
    console.log(frequency)

    database.ref().on("value", function(snapshot) {
        trainName = snapshot.val().trainName;
        destination = snapshot.val().destination;
        frequency = snapshot.val().frequency
    });

    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency
    });

});


// var currentTime = moment().format("hh:mm:ss a");
// console.log(currentTime);

// var arrivalTime = currentTime.add(frequency,"minutes");
// console.log(arrivalTime);