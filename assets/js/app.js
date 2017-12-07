
$(document).ready(function(){
    // Example queryURL for Giphy API
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
            console.log("response: "+response);
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
                // display a list of gifs
                var newImg = $("<img>");
                newImg.attr("src", data[i].images.downsized.url);
                $("#content").append(newImg);
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
})