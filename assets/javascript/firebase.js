$(document).ready(function() {

//create variable to reference database
var database = firebase.database(); 

//initial values
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

var rowIndex = 0;
//at initial load and any data value changes, get snapshot of current data. 
database.ref().on("value", function(snapshot) {
    //console.log the snapshot value
    console.log(snapshot.val());
}




)

//click event for submit button 
$("#add-train").on("click", function() {
    event.preventDefault();
    rowIndex++;
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

    var markup = "<tr><td><input type='checkbox' name='index'><td id='train-name-dislay'"+rowIndex+">" + trainName +"</td><td id='destination-display'"+rowIndex+">" + destination + "</td><td id='train-time-display'"+rowIndex+">" + firstTrainTime + "</td><td id='frequency-display'"+rowIndex+">" + frequency + "</td></tr>"

    $("table tbody").append(markup);
});

$("#delete-train").on("click", function() {

    event.preventDefault();
    $("table tbody").find('input[name="index"]').each(function() {
        if($(this).is(":checked")) {
            $(this).parents("tr").remove();
        }
    })
})






database.ref().on("value", function(snapshot){

    var data = snapshot.val();
    console.log(data);
    console.log(data.trainName);
    console.log(data.destination);
    console.log(data.firstTrainTime);
    console.log(data.frequency);

    var markup = "<tr><td><input type='checkbox' name='index'><td id='train-name-dislay'"+rowIndex+">" + trainName +"</td><td id='destination-display'"+rowIndex+">" + destination + "</td><td id='train-time-display'"+rowIndex+">" + firstTrainTime + "</td><td id='frequency-display'"+rowIndex+">" + frequency + "</td></tr>"

    $("table tbody").append(markup);

    //update HTML
    for (var i=1; i<=rowIndex; i++) {
    $("#train-name-display"+rowIndex).text(data.trainName);
    $("#destination-display"+rowIndex).text(data.destination);
    $("#train-time-display"+rowIndex).text(data.firstTrainTime);
    $("#frequency-display"+rowIndex).text(data.frequency);
    }

}, function(err) {
    console.log("Error: " + err.code);
});



});

//calculate when next train will arrive
//firebase method to get current relative time, store
//do calculations and store value in firebase 
