var topics = ["dogs", "cats", "bears"]
var APIkey = "fTPjGEwjqFzTHWzs9U8biFX3uSz0ZCpq"

//render buttons to the page for each topic in array
function renderButtons() {
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

//puts user searchterm in a button on the page & adds it to the topics array
$(".Userinput").on("submit", function (event) {
    event.preventDefault();
    var topic = $("#Usertext").val().trim();
    console.log(topic);
    topics.push(topic);
    renderButtons();
    $("#Usertext").val("");
});

//runs the ajax method when a button is clicked
$(document).on("click", ".topic-button", function () {
    var searchTerm = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIkey + "&limit=10"
    console.log("button was clicked");
    console.log($(this).text())

    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (response) {
        console.log(response.data);
        //loops through the gifs and ascribes values to them then puts them on the page
        for (var i = 0; i < response.data.length; i++) {
            var stillImage = response.data[i].images.fixed_width_still.url;
            var animatedImage = response.data[i].images.fixed_width.url;
            var mainURL = stillImage;
            var gifImage = $("<img>").attr("src", mainURL).attr("data-still", stillImage).attr("data-animate", animatedImage).attr("data-state", "still").addClass("gif");
            var rating = response.data[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            $(".gifs").prepend(p, gifImage);
            //stops and starts gifs with on.click event
        }
        $(".gif").on("click", function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
});


renderButtons();