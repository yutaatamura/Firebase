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

    var trainName = data.trainName;
    var destination = data.destination;
    var firstTrainTime = data.firstTrainTime;
    var frequency = data.frequency;

    var row = $('<tr>');

    var inputCol = $('<td>').append($('<input>').attr({
        type : "checkbox",
        name : "index"
        }));
    
    var trainNameCol = $('<td>'+ trainName + '</td>')
    
    var destCol = $('<td>' + destination + '</td>')

    var firstTimeCol = $('<td>' + firstTrainTime + '</td>')

    var freqCol = $('<td>' + frequency + '</td>')
    
    
    row.append(inputCol, trainNameCol, destCol, firstTimeCol, freqCol);
    
    $("table tbody").append(row);
    

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






//calculate when next train will arrive
//firebase method to get current relative time, store
//do calculations and store value in firebase 
