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

    alert("Train Successfully Added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    
});

database.ref().on("child_added", function(childsnapshot) {
    console.log(childsnapshot.val());

    var trainName = childsnapshot.val().trainName;
    var destination = childsnapshot.val().destination;
    var frequency = childsnapshot.val().frequency;

    var nextArrival = moment().add(frequency, "minutes");
    console.log(nextArrival)

    var timeLeft = moment().diff(moment(nextArrival, "X"), "minutes");
    console.log(timeLeft);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(timeLeft)
    );

    $("#train-table > tbody").append(newRow)

});