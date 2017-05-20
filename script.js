    // pre-loaded buttons
    var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "frog"];
    var newButtonList = [];
    console.log(topics);
    var gAnimate = [];
    var gStill = [];

    // Create a button for each item in the array. 
    function buttonMaker () {
       for (var i = 0; i < topics.length; i++) {
            $("<button>").text(topics[i]).addClass("btn btn-primary btn-md butt").appendTo($(".buttonsHere"));
       } 
    }

    // function must load first before ajax
    buttonMaker ();

    // Pulls JSON Data and displays gifs
    $(".buttonsHere").on("click", ".butt", function() {
        var animal = $(this).html();
        console.log(animal);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                gAnimate = results[i].images.fixed_height.url;
                gStill = results[i].images.fixed_height_still.url;

                var gifDiv = $("<div class=''>");
                var rating = results[i].rating;
                var p = $("<h3 class='text-center rating'>").text("Rating: " + rating);
                var zooImage = $("<img class='img-responsive center-block gif' data-state='still'>");
                zooImage.attr("src", gStill).attr("data-animate", gAnimate).attr("data-still", gStill);

                gifDiv.prepend(p);
                gifDiv.prepend(zooImage);

                $(".gifsHere").prepend(gifDiv);
            }

        });
        
    });

    // Clicking on gifs will start and stop gifs
    $(".gifshere").on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        var gifAnimate = $(this).attr("data-animate");
        var gifStill = $(this).attr("data-still");

        if (state === 'still') {
            $(this).attr("src", gifAnimate);
            $(this).attr("data-state", "animate");
        }

        else {
            $(this).attr("src", gifStill);
            $(this).attr("data-state", "still");
        }

    });
       
    // hovering over gif animates them
    $(".gifshere").on("mouseenter", ".gif", function() {
        var gifAnimate = $(this).attr("data-animate");
                $(this).attr("src", gifAnimate);
            $(this).attr("data-state", "animate");
    });

    $(".gifshere").on("mouseleave", ".gif", function() {
        var gifStill = $(this).attr("data-still");
                $(this).attr("src", gifStill);
            $(this).attr("data-state", "still");
    });

    // Adds new category button from user input
    $("#addButton").on("click", function(event) {
        event.preventDefault();

        var item = $("#buttonCategory").val();
        console.log(item);

        newButtonList.push(item);
        console.log("Button List " + newButtonList);
        if ($("#buttonCategory").val() == "") {
            alert("Field cannot be empty");
        }
        else {
            $("<button>").text(item).addClass("btn btn-primary btn-md butt").appendTo($(".buttonsHere"));
            $("#buttonCategory").val("")
        }
    });