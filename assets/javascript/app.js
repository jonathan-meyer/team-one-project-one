$(function() {
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

        var trailName = $("<h3>").text(" " + data[i].name);
        var trailBlurb = $("<p>").text("- " + data[i].summary);
        var length = $("<p>").text("- " + data[i].length + " miles");
        var difficulty = $("<p>").text("- " + data[i].difficulty);
        var stars = $("<p>").text("- " + data[i].stars);

        var trailPic = $("<img>");
        trailPic.attr("src", data[i].imgSmall);

        $(trailDiv).append(trailName);
        $(trailDiv).append(trailPic);
        $(trailDiv).append(trailBlurb);
        $(trailDiv).append(length);
        $(trailDiv).append(difficulty);
        $(trailDiv).append(stars);

        $("#new-card").append(trailDiv);
      }
    });


  });

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
