$(function() {
  console.log("start!");
});


var lat;
var lon;

var key = "200465489-a46feddcabad65b10200366668a8b02b";
var queryURL = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key="+key;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    // console.log(response);

    var data = response.trails;
    console.log(data);

    for(var i = 0; i < data.length; i++){

        var trailDiv = $("<div>");
        
        var trailName = $("<h3>").text("Name: "+data[i].name);
        var trailBlurb = $("<p>").text(data[i].summary);
        var length =$("<p>").text(data[i].length+" miles");
        var difficulty =$("<p>").text(data[i].difficulty);
        var stars = $("<p>").text(data[i].star)
        
        var trailPic = $("<img>");
        trailPic.attr("src", data[i].imgSmall);
        

        
        $(trailDiv).append(trailName);
        $(trailDiv).append(trailPic);
        $(trailDiv).append(trailBlurb);
        $(trailDiv).append(length);
        $(trailDiv).append(difficulty);
        $(trailDiv).append(stars+" stars");

        $("#trails").append(trailDiv);
    
        }
})