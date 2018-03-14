$(document).ready(function() {

//create variable to reference database
var database = firebase.database(); 

//initial values
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";


//at initial load and any data value changes, get snapshot of current data. 


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

    database.ref().push( {
        trainName : trainName,
        destination : destination,
        firstTrainTime : firstTrainTime,
        frequency : frequency,
        dateAdded : firebase.database.ServerValue.TIMESTAMP
    });

    
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    var data = snapshot.val();

    // var trainName = data.trainName;
    // var destination = data.destination;
    // var firstTrainTime = data.firstTrainTime;
    // var frequency = data.frequency;

    
    // "<tr><td><input type='checkbox' name='index'><td id='train-name-dislay'>" + trainName +"</td><td id='destination-display'>" + destination + "</td><td id='train-time-display'>" + firstTrainTime + "</td><td id='frequency-display'>" + frequency + "</td></tr>"
    var row = $('<tr>');
    var column = $('<td>');
    var inputCol = $('<input>');
    inputCol.attr("type", "checkbox");
    inputCol.attr("name", "index");
    var trainNameCol = $('<td>');
    trainNameCol.attr("id", "train-name-display");
    var destCol = $('<td>');
    destCol.attr("id", "destination-display");
    var firstTimeCol = $('<td>');
    firstTimeCol.attr("id", "train-time-display");
    var freqCol = $('<td>');
    freqCol.attr("id", "frequency-display");
    
    
    row.append(column);
    column.append(inputCol);
    row.append(trainNameCol);
    row.append(destCol);
    row.append(firstTimeCol);
    row.append(freqCol);
    $("table tbody").append(row);
    

    $("#train-name-display").text(data.trainName);
    $("#destination-display").text(data.destination);
    $("#train-time-display").text(data.firstTrainTime);
    $("#frequency-display").text(data.frequency);

}, function(errorObject) {
    console.log("Errors: " + errorObject.code);
});

})

$("#delete-train").on("click", function() {

    event.preventDefault();
    $("table tbody").find('input[name="index"]').each(function() {
        if($(this).is(":checked")) {
            $(this).parents("tr").remove();
        }
    })
})

// database.ref().on("value", function(snapshot){

//     var data = snapshot.val();
//     console.log(data);
//     console.log(data.trainName);
//     console.log(data.destination);
//     console.log(data.firstTrainTime);
//     console.log(data.frequency);

//     //update HTML
   
//     $("#train-name-display").text(data.trainName);
//     $("#destination-display").text(data.destination);
//     $("#train-time-display").text(data.firstTrainTime);
//     $("#frequency-display").text(data.frequency);
    

// }, function(err) {
//     console.log("Error: " + err.code);
// });




//calculate when next train will arrive
//firebase method to get current relative time, store
//do calculations and store value in firebase 
