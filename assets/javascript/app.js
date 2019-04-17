$( document ).ready(function() {

    var gifCategory = ["bob's burgers", "ostrich", "timelapse", "coffee", "space"]
    console.log(gifCategory);

    function renderButtons(){

        $("#new-categories").empty();

        for (var i = 0; i < gifCategory.length; i++) {

            var btn = $("<button>");
            
            btn.addClass("btn btn-secondary gifs-category");
            
            btn.attr("gif-name", gifCategory[i]);
        
            btn.text(gifCategory[i]);
            
            $("#new-categories").append(btn);
        }
    }

    renderButtons();

    $("#new-gif").on("click", function(event) {

        event.preventDefault();

        var gif = $("#form-text").val().trim();

        gifCategory.push(gif);

        var validate = document.forms["gif-form"]["input-gif"].value;
        if (validate == "") {
        alert("You must fill in a category.");
        return false;
        }

        renderButtons();

        $("#form-text").val("");
    });



    $("#new-categories").on("click", "button", function() {
        
        var gifName = $(this).attr("gif-name");

        
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifName + "&api_key=08ljFPShrIznaQjJUY0J72U7nGNJ60qa&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            
            var results = response.data;
            
            for (var i = 0; i < results.length; i++) {
                console.log(results[i]);
                if (results[i].rating) {

                    var gifDiv = $("<div>");

                    var rating = results[i].rating;
                    
                    var p = $("<p>").text("Rating: " + rating);
                    
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr({"data-animate" : results[i].images.fixed_height.url});
                    gifImage.attr({"data-state" : "still"});
                    gifImage.attr({"data-still" : results[i].images.fixed_height_still.url});
                    

                    $(gifImage).addClass("gif");
                    
                    gifDiv.append(gifImage);
                    // gifDiv.append(p);
                    gifDiv.addClass("flex-wrap")
                    
                    $("#home-of-the-gifs").prepend(gifDiv);

                    

                
                }
            }
        });

        $("#home-of-the-gifs").on("click", ".gif", function() {
            
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