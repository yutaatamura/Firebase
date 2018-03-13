$(document).ready(function() {

//create variable to reference database
var database = firebase.database(); 

//initial values
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";
//at initial load and any data value changes, get snapshot of current data. 
database.ref().on("value", function(snapshot) {
    //console.log the snapshot value
    console.log(snapshot.val());
}




)

//click event for submit button 
$("#add-train").on("click", function() {
    event.preventDefault();
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#first-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);


    database.ref().set({
        trainName : trainName,
        destination : destination,
        firstTrainTime : firstTrainTime,
        frequency : frequency
    });
});



database.ref().on("value", function(snapshot){

    var data = snapshot.val();
    console.log(data);
    console.log(data.trainName);
    console.log(data.destination);
    console.log(data.firstTrainTime);
    console.log(data.frequency);

    //update HTML
    $("#train-name-display").text(data.trainName);
    $("#destination-display").text(data.destination);
    $("#train-time-display").text(data.firstTrainTime);
    $("#frequency-display").text(data.frequency);

}, function(err) {
    console.log("Error: " + err.code);
});



});

//calculate when next train will arrive
//firebase method to get current relative time, store
//do calculations and store value in firebase 
