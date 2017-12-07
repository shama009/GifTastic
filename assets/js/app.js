
$(document).ready(function () {

    //HmC6jYxAxwhp61bde8FJ2MDSN2VdTQ0h
    // my API key - XW2Cj4MK2064FaM505lDN0FeIqr4b5tJ
    var apiKey = 'XW2Cj4MK2064FaM505lDN0FeIqr4b5tJ';
    var searches = [];

    // finds giphy results based on text
    // from the user input 
    function getGiphies(userInput) {

        // if I do not have data-giphy use userInput
        var input = $(this).attr("data-giphy") || userInput;

        // clear out any previous images on the page when there is a new search happening
        $("#content").empty();

        // we retrieve gifs matching the value they inputed
        // sample url: https://api.giphy.com/v1/gifs/search?api_key=XW2Cj4MK2064FaM505lDN0FeIqr4b5tJ&q=minions&limit=10&offset=0&rating=G&lang=en
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + input + "&limit=10&offset=0&lang=en";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            console.log("response: " + response);
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
                // display a list of gifs and ratings
                var gifDiv = $("<div class='gif-div'>");
                var newImg = $("<img>");
                var url = data[i].images.downsized.url;
                var splitUrl = url.split(".gif");
                var stillUrl = splitUrl[0] + "_s.gif";
                console.log(stillUrl);
                // include all required attributes to animate and pause images
                newImg.attr("src", stillUrl);
                newImg.addClass("giphy-img");
                newImg.attr("data-still", stillUrl);
                newImg.attr("data-animate", url);
                newImg.attr("data-state", "still");

                var rating = data[i].rating;
                gifDiv.append("<p>Rating: " + rating);
                gifDiv.append(newImg);
                $("#content").append(gifDiv);
            }
        });
        $("#user-input").val("");
    }

    // when the user finishes searching
    // make a new button for them to click on later

    function makeUserSearchButtons(input) {
        var newBtn = $("<button>");
        newBtn.addClass("giphy-btn");
        newBtn.text(input);
        newBtn.attr("data-giphy", input);
        $('.button-container').append(newBtn);
    }

    // when the user clicks the submit button
    $("#submit").on("click", function (e) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        e.preventDefault();
        // take the value from the user-input field
        var userInput = $("#user-input").val();
        makeUserSearchButtons(userInput);
        getGiphies(userInput);
    });

    // when the user dynamically generated giphy button
    $(document).on("click", ".giphy-btn", getGiphies);
    $(document).on("click", ".giphy-img", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            var src = $(this).attr("src");
            var dataAnimate = $(this).attr("data-animate");
            $(this).attr("src", dataAnimate);
            $(this).attr("data-state", "animate");

        } else {
            var src = $(this).attr("src");
            var dataStill = $(this).attr("data-still");
            $(this).attr("src", dataStill);
            $(this).attr("data-state", "still");

        }

    });
});