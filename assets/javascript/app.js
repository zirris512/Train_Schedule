var config = {
    apiKey: "AIzaSyAzevHRdAMycBAXoJ_Ijdz1FRVf5Ocxa3Y",
    authDomain: "classproject-4407e.firebaseapp.com",
    databaseURL: "https://classproject-4407e.firebaseio.com",
    projectId: "classproject-4407e",
    storageBucket: "",
    messagingSenderId: "158807328085",
    appId: "1:158807328085:web:fd8d2d1d0f55c04854dbdc"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#train-submit").on("click", function(event) {
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var place = $("#place-input").val().trim();
    var time = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: name,
        place: place,
        time: time,
        frequency: frequency
    }

    database.ref().push(newTrain);

    console.log(name.name);
    console.log(place.place);
    console.log(time.time);
    console.log(frequency.frequency);

    $("#name-input").val("");
    $("#place-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
})

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot);

    var name = childSnapshot.val().name;
    var place = childSnapshot.val().place;
    var time = childSnapshot.val().time;
    var frequency = parseInt(childSnapshot.val().frequency);

    console.log(name);
    console.log(place);
    console.log(time);
    console.log(frequency);

    var convertTime = moment(time, "HH:mm").subtract(1, "years");
    console.log("Converted Time: " + convertTime);

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(convertTime), "minutes");
    console.log("Time Difference: " + diffTime);

    var timeRemainder = diffTime % frequency;
    console.log("Remainder: " + timeRemainder);

    var remainingTime = frequency - timeRemainder;
    console.log("Time Remaining: " + remainingTime);

    var nextTrain = moment().add(remainingTime, "minutes");
    console.log("Next train: " + moment(nextTrain).format("HH:mm"));

})