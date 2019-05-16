//Global Variables

var firebaseConfig = {
  apiKey: "AIzaSyCigFa99mWeaeY2L7Iheqdo_JbcLZapIFs",
  authDomain: "take-a-hike-de5fe.firebaseapp.com",
  databaseURL: "https://take-a-hike-de5fe.firebaseio.com",
  projectId: "take-a-hike-de5fe",
  storageBucket: "take-a-hike-de5fe.appspot.com",
  messagingSenderId: "584883654583",
  appId: "1:584883654583:web:ab3e9864344feb61"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var trailName;
var length;
var totalMiles = 0;

//when document loads...
$(function() {
  //Hiking project AJAX call
  $("#hike").on("click", function(e) {
    e.preventDefault();

    var lat = $("#latitude")
      .val()
      .trim();

    var lon = $("#longitude")
      .val()
      .trim();

    var key = "200465489-a46feddcabad65b10200366668a8b02b";
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=10&key=" + key;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var data = response.trails;
      console.log(data);

      for (var i = 0; i < Math.min(9, data.length); i++) {
        var trailDiv = $("<div>", {
          id: 'new-div',
        });
        //create variables to hold api data
        var trailName = $("<h3>").text(" " + data[i].name);
        var trailBlurb = $("<p>").text(data[i].summary);
        var length = $("<p>").text(data[i].length + " miles");
        var difficulty = $("<p>").text(data[i].difficulty);
        var stars = $("<p>").text(data[i].stars + " stars");
        var button = $("<button>").text("Hike it!");

        $(button).addClass("btn btn-secondary hike-it").data("name", data[i].name).data("length", data[i].length);

        var trailPic = $("<img>");
        trailPic.attr("src", data[i].imgSmall);
        //display api data on html
        $(trailDiv).append(trailName);
        $(trailDiv).append(trailPic);
        $(trailDiv).append(trailBlurb);
        $(trailDiv).append(length);
        $(trailDiv).append(difficulty);
        $(trailDiv).append(stars);
        $(trailDiv).append(button);

        $("#new-card").append(trailDiv);

        
      }
      //Collecting data attributes and storing them in Firebase
      $(".hike-it").on("click", function(){
        

        var myHike = {
          myTrail: $(this).data("name"),
          myMiles: $(this).data("length")
        }
        console.log(myHike);
        database.ref().push(myHike);

        
      })
      //display firbase info on html
      database.ref().on("child_added", function(childSnapshot){
        totalMiles += childSnapshot.val().myMiles;
        console.log("You have hiked "+totalMiles+" miles");
      })
    });


  });
  //Google Maps api call
  $("#load_latlon").on("click", function(e) {
    e.preventDefault();

    var city = $("#City")
      .val()
      .trim();
    var url = "https://maps.googleapis.com/maps/api/geocode/json";
    var query = $.param({
      key: "AIzaSyA1z01urdsx5lGMEuk34rZ6LV8XTvl_lP8",
      address: city
    });

    if (city.length > 0) {
      $.ajax({
        url: url + "?" + query
      }).then(geocode => {
        if (geocode.results.length > 0) {
          const { lng, lat } = geocode.results[0].geometry.location;
          $("#latitude").val(lat);
          $("#longitude").val(lng);
        }
      });
    }
  });
});
