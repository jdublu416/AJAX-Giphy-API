$(document).ready(function() {
  //researching the API and these are the key and
  var topics = [
    "puppy",
    "kitten",
    "baby",
    "fainting goats",
    "ducklings",
    "piglets",
    "bunnies"
  ];

  createButtons();

  $(".btnGiphy").on("click", function(event) {
      createButtons();
    var userQuery = $(this).attr("data-name");
    console.log(userQuery);
    displayStillGif(userQuery);
  });

  function displayStillGif(userQuery) {

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
      console.log(response);
      var results = response.data;

      console.log(results);

      for (var i = 0; i < 10; i++) {
        // Storing the rating data, create element to display it, then display rating
        var rating = results[i].rating;
        var gifTitle=results[i].title;
        var paraOne = $("<p>").text("Rating: " + rating +""+ "    Title: "+ gifTitle);
        // displaySection.appendChild(paraOne);
        $("#picContainer").append(paraOne);

        //getting the https for the still gif, creating an element to hold it as the child of section,

        var stillGif = results[i].images.fixed_height_still.url;
        console.log(stillGif);
        var animGif= results[i].images.fixed_height.url;
        var tagImage = $("<img class='gif'>");
        tagImage.attr("src", stillGif);
        tagImage.attr("data-still",stillGif);
        tagImage.attr("data-animate",animGif);
        tagImage.attr("data-state", "still");
        $("#picContainer").append(tagImage);

        $(".gif").on("click", function() { //state begins as "still" and then click event changes data-state to "animate"
           
            var state = $(this).attr("data-state");
           
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
      }
    });
  }

  function createButtons() {
    $("#buttonGroup").empty();

    for (var i = 0; i < topics.length; i++) {
      var btnNew = $("<button>");
      btnNew.addClass("btnGiphy");
      btnNew.attr("data-name", topics[i]);
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
