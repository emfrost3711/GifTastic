var topics = ["dogs", "cats", "bears"]
var APIkey = "fTPjGEwjqFzTHWzs9U8biFX3uSz0ZCpq"


//render buttons to the page
console.log("giphy.js lnked!")
function renderButtons (){
    $(".buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var topic = topics[i];
        var newButton = $("<button>"); 
            newButton.text(topic);
            newButton.addClass("topic-button");
            newButton.attr("data-title", topic);
        $(".buttons").append(newButton);
    }
};

$(".Userinput").on("submit", function (event) {
    event.preventDefault ();
    var topic = $("#Usertext").val().trim();
    console.log(topic);
    topics.push(topic);
    renderButtons();
    $("#Usertext").val(""); 
});

$(document).on("click", ".topic-button", function (){
    var searchTerm = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIkey + "&limit=10"
    console.log("button was clicked");
    console.log($(this).text())
    
    $.ajax({
        method: "GET", 
        url: queryURL
    }).then(function(response) {
      console.log(response.data);
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i].images.fixed_width.url)
        $(".gifs").append("<img src = '" + response.data[i].images.fixed_width.url + "'>")
      }
    });
});


renderButtons();

//give images a class and a data-attribute that will store the still image; replace the source with the data atttribute 
//create click events. 
