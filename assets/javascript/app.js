$(document).ready(function() {
  //researching the API and these are the key and
  var topics = [
    "puppies",
    "kittens",
    "baby",
    "fainting goats",
    "ducklings",
   "monkeys",
    "bunnies"
  ];

  createButtons();

  $("#buttonGroup").on("click", ".btnGiphy", function(event) {
    var userQuery = $(this).attr("data-name");
    console.log(userQuery);
    $("#picContainer").empty();
    displayStillGif(userQuery);

  });

  function displayStillGif(userQuery) {
    console.log("yup too");
    var userQuery;
    var apikey = "api_key=1oACTeC3yeklQABKSzKWqS7ojx3Npdlv";
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?" + apikey + "&q=" + userQuery;
    console.log(userQuery);
    // Creating an AJAX call for the specific button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      var results = response.data;

      console.log(results);

      for (var i = 0; i < 10; i++) {
        // Storing the rating data, create element to display it, then display rating
        var rating = results[i].rating;
        var gifTitle = results[i].title;
        var paraOne = $("<p>").html(
          "Rating: " + rating + "<br>" + "Title: " + gifTitle
        );
        // displaySection.appendChild(paraOne);
        $("#picContainer").append(paraOne);

        //getting the https for the still gif, creating an element to hold it as the child of section,
        var stillGif = results[i].images.fixed_height_still.url;

        console.log(stillGif);
        var animGif = results[i].images.fixed_height.url;
        var tagImage = $("<img class='gif'>");
        tagImage.attr("src", stillGif);
        tagImage.attr("data-still", stillGif);
        tagImage.attr("data-animate", animGif);
        tagImage.attr("data-state", "still");
       
        $("#picContainer").append(tagImage);
      }
      $("#picContainer").on("click", ".gif", function() {
        //state begins as "still" and then click event changes data-state to "animate"

        var state = $(this).attr("data-state");

        console.log(state);

        if (state === "still") {
          console.log("yup");
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  }

  function createButtons() {
    $("#buttonGroup").empty();
//create a new button with attributes and classes and add to button group
    for (var i = 0; i < topics.length; i++) {
      var btnNew = $("<button>");
      btnNew.addClass("btnGiphy");
      btnNew.attr("data-name", topics[i]);
      btnNew.attr("data-state", "still");
      btnNew.text(topics[i]);
      $("#buttonGroup").append(btnNew);
    }
  }
  //populate the topics when button click with user input

  $("#btnUserinput").on("click", function(event) {
    event.preventDefault();

    // This line will grab the text from the input box
    var addCute = $("#topic-input")
      .val()
      .trim();
    // The user data input add to topics array
    topics.push(addCute);
    $("#topic-input").val("");

    //call function for dynamically creating buttons
    createButtons();
    // clear($("#topic-input").text());
  });
});
