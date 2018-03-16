$(document).ready(function() {

//create variable to reference database
var database = firebase.database(); 

//initial values
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";
// var nextArrival = "";
// var timeAway = "";
var currentTime = moment().format("hh:mm A");
$('#time').text(currentTime);

//at initial load and any data value changes, get snapshot of current data. 


//click event for submit button 
$("#add-train").on("click", function() {
event.preventDefault();
    
trainName = $("#train-name-input").val().trim();
destination = $("#destination-input").val().trim();
firstTrainTime = $("#first-time-input").val().trim();
frequency = $("#frequency-input").val().trim();

$("#train-name-input").val('');
$("#destination-input").val('');
$("#first-time-input").val('');
$("#frequency-input").val('');

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    database.ref('train').push( {
        trainName : trainName,
        destination : destination,
        firstTrainTime : firstTrainTime,
        frequency : frequency, 
        dateAdded : firebase.database.ServerValue.TIMESTAMP
    }); 
});



database.ref('train').orderByChild("dateAdded").on("child_added", function(childSnapshot) {

    var data = childSnapshot.val();

    var name = data.trainName;
    var dest = data.destination;
    var start = data.firstTrainTime;
    var freq = data.frequency;
    var key = childSnapshot.key;
    console.log("key= "+key)

    var startConverted = moment(start, "hh:mm A").subtract(1, "years");
    console.log(startConverted);

    console.log("Current time: "+ moment().format("hh:mm A"));

    var diffTime = moment().diff(moment(startConverted, "hh:mm A"), "minutes");
    console.log("time difference= "+diffTime);

    var timeRemain = diffTime % freq;
    console.log("remaining time= "+timeRemain);

    var timeAway = freq - timeRemain; 
    console.log("time away: "+timeAway)

    var timeNext = moment().add(timeAway, "minutes").format("hh:mm");
    console.log("Arrival time: "+timeNext)

    var row = $('<tr>').addClass(key);


    var deleteBtn = $('<td>').append($('<button>Delete</button>').attr({
        class : "btn btn-danger deleteBtn",
        dataKey : key
        }));
    
    var trainNameCol = $('<td>'+ name + '</td>')
    
    var destCol = $('<td>' + dest + '</td>')

    var firstTimeCol = $('<td>' + start + '</td>')

    var freqCol = $('<td>' + freq + '</td>')

    var timeNextCol = $('<td>' + timeNext + '</td>')

    var timeAwayCol = $('<td>' + timeAway +'</td>')
    
    
    row.append(deleteBtn, trainNameCol, destCol, firstTimeCol, freqCol, timeNextCol, timeAwayCol);
    
    $("table tbody").append(row);
    

}, function(errorObject) {
    console.log("Errors: " + errorObject.code);
});


//delete the train row 
$(document).on("click", ".deleteBtn", function() {
    var key = $(this).attr("dataKey");
    database.ref("train/" + key).remove();
    $('.'+ key).remove();
})

})




//calculate when next train will arrive
//firebase method to get current relative time, store
//do calculations and store value in firebase 
