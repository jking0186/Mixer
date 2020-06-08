// Cocktail Search by Liquor function
$("#choiceSubmit").on("click", function () {
  event.preventDefault();
  search = document.getElementById("liquorSelect").value;
  var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + search;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      results = response.drinks;

      //Math random for random drink to be displayed
      var num = Math.floor(Math.random() * results.length);
      // Store drink for second api
      var drinkId = results[num].idDrink;

      //Drink Name Div
      $("#name").text(results[num].strDrink)

      // Drink Img
      $("#cocktailImg").attr("src", results[num].strDrinkThumb);

      // SECOND API
      queryURL2 = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
      $.ajax({
        url: queryURL2,
        method: "GET"
      })
        .then(function (response) {
          results = response.drinks[0];
          var ingredients = [
            results.strIngredient1,
            results.strIngredient2,
            results.strIngredient3,
            results.strIngredient4,
            results.strIngredient5,
            results.strIngredient6,
            results.strIngredient7,
            results.strIngredient8,
            results.strIngredient9,
            results.strIngredient10,
            results.strIngredient11,
            results.strIngredient12,
            results.strIngredient13,
            results.strIngredient14,
            results.strIngredient15,
          ]
          var instruction = results.strInstructions
          var measure = [
            results.strMeasure1,
            results.strMeasure2,
            results.strMeasure3,
            results.strMeasure4,
            results.strMeasure5,
            results.strMeasure6,
            results.strMeasure7,
            results.strMeasure8,
            results.strMeasure9,
            results.strMeasure10,
            results.strMeasure11,
            results.strMeasure12,
            results.strMeasure13,
            results.strMeasure14,
            results.strMeasure15,
          ]
          // Create a table for ingredients, measurements
          var i = 0
          ingredients.forEach(generateInfo)

          function generateInfo(item) {
            newRow = $("<tr>")
            var ingDiv = $("<td>").attr("class", "ingredient")
            ingDiv.text(item);
            measDiv = $("<td>").attr("class", "measure")
            measDiv.text(measure[i]);
            newRow.append(ingDiv);
            newRow.append(measDiv);

            $("#cocktailRecipe").append(newRow)

            //Iterate for measure
            i++;
          } // Add instructions 
          $("#cocktailRecipe").append(instruction)
        });
    });
});

// PAGE ONE
$("#ageSubmit").on("click",
  function getAge() {
    event.preventDefault();
    var dateString = document.getElementById("start").value;
    if (dateString != "") {
      var today = new Date();
      var birthDate = new Date(dateString); //format is mm.dd.yyyy
      var age = today.getFullYear() - birthDate.getFullYear();
      var message = document.getElementById("age")
      if (age < 21 || age > 100) {
        message.textContent = "Sorry, You're Not Old Enough."
      }
      else {
        optionPage.style.display = "block";
        agePage.style.display = "none";
      }
    }
    else {
      alert("please provide your date of birth");
    }
  })

//SELECT PAGE
$("#choiceSubmit").on("click", function choice() {
  event.preventDefault();
  optionPage.style.display = "none";
  resultsPage.style.display = "block";
})

function clear() {
  $("#display").empty();
  $("#cocktailRecipe").empty();
}
//Return to drink and song select
$("#newMix").on("click", function () {
  event.preventDefault();
  clear();
  optionPage.style.display = "block";
  resultsPage.style.display = "none";
})

//Pages
agePage = document.getElementById("legal");
optionPage = document.getElementById("mixForm");
resultsPage = document.getElementById("results");

  // Playlist search by choice


  $("#choiceSubmit").on("click", function () {
    event.preventDefault();
    var song = $('#musicOptions').find(":selected").text();
    console.log(song);


    if (song === 'Top 50') {
      $("#playlist").attr("src", "https://open.spotify.com/embed/playlist/37i9dQZEVXbLRQDuF5jeBp")
    }

    else if (song === 'Hot Country') {
      $("#playlist").attr("src", "https://open.spotify.com/embed/playlist/37i9dQZF1DX1lVhptIYRda")
    }

    else if (song === "All Out 00's") {
      $("#playlist").attr("src", "https://open.spotify.com/embed/playlist/37i9dQZF1DX4o1oenSJRJd")
    }

    else if (song === 'Lorem') {
      $("#playlist").attr("src", "https://open.spotify.com/embed/playlist/37i9dQZF1DXdwmD5Q7Gxah")
    }
  })


// Search for artist my car


// var templateSource = document.getElementById('results-template').innerHTML,
//     template = Handlebars.compile(templateSource),
//     resultsPlaceholder = document.getElementById('results'),
//     playingCssClass = 'playing',
//     audioObject = null;

// var fetchTracks = function (albumId, callback) {
//     $.ajax({
//         url: 'https://api.spotify.com/v1/albums/' + albumId,
//         success: function (response) {
//             callback(response);
//         }
//     });
// };

// var searchAlbums = function (query) {
//     $.ajax({
//         url: 'https://api.spotify.com/v1/search',
//         data: {
//             q: query,
//             type: 'album'
//         },
//         success: function (response) {
//             resultsPlaceholder.innerHTML = template(response);
//         }
//     });
// };

// results.addEventListener('click', function (e) {
//     var target = e.target;
//     if (target !== null && target.classList.contains('cover')) {
//         if (target.classList.contains(playingCssClass)) {
//             audioObject.pause();
//         } else {
//             if (audioObject) {
//                 audioObject.pause();
//             }
//             fetchTracks(target.getAttribute('data-album-id'), function (data) {
//                 audioObject = new Audio(data.tracks.items[0].preview_url);
//                 audioObject.play();
//                 target.classList.add(playingCssClass);
//                 audioObject.addEventListener('ended', function () {
//                     target.classList.remove(playingCssClass);
//                 });
//                 audioObject.addEventListener('pause', function () {
//                     target.classList.remove(playingCssClass);
//                 });
//             });
//         }
//     }
// });

// document.getElementById('search-form').addEventListener('submit', function (e) {
//     e.preventDefault();
//     searchAlbums(document.getElementById('query').value);
// }, false);
