$(function() {
  console.log("start!");
  $("#hike").on("click", function(e){
    e.preventDefault();
  
    var lat = $("#latitude").val().trim();
    console.log(lat);
    var lon = $("#longitude").val().trim();
    
  
  
    var key = "200465489-a46feddcabad65b10200366668a8b02b";
    var queryURL ="https://www.hikingproject.com/data/get-trails?lat="+lat+"&lon="+lon+"&maxDistance=10&key="+key;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // console.log(response);
  
        var data = response.trails;
        console.log(data);
  
        for(var i = 0; i < 9; i++){
  
            var trailDiv = $("<div>");
            
            var trailName = $("<h3>").text("Name: "+data[i].name);
            var trailBlurb = $("<p>").text(data[i].summary);
            var length =$("<p>").text(data[i].length+" miles");
            var difficulty =$("<p>").text(data[i].difficulty);
            var stars = $("<p>").text(data[i].stars)
            
            var trailPic = $("<img>");
            trailPic.attr("src", data[i].imgMedium);
            
  
            
            $(trailDiv).append(trailName);
            $(trailDiv).append(trailPic);
            $(trailDiv).append(trailBlurb);
            $(trailDiv).append(length);
            $(trailDiv).append(difficulty);
            $(trailDiv).append(stars+" stars");
  
            $("#trails").append(trailDiv);
        
            }
    });
  });
  




});
