var config = {
apiKey: "AIzaSyC0SBTHqCXRTU70HHH3ny_70y3YjqeyzGs",
authDomain: "mytraintimetable.firebaseapp.com",
databaseURL: "https://mytraintimetable.firebaseio.com",
projectId: "mytraintimetable",
storageBucket: "",
messagingSenderId: "589133943418"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var frequency = 0;

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    
    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency
    });
});

database.ref().on("value", function(snapshot) {

    // Print the initial data to the console.
    console.log(snapshot.val());

    // Log the value of the various properties
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().frequency);

});
