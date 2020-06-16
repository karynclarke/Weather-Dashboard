$(document).ready(function() {

    //var searchValue = "rome";
    //console.log("searchValue" +
    //searchValue)

    //getcurrenthistory
    // var history = JSON.parse(window.localStorage.getItem("history"));

    // if (history.length > 0) {
    //     searchWeather(history[history.length - 1]);
    // }

    // for (var i = 0; i < history.length; i++) {
    //     makeRow(history[i]);
    // }

    $("#search-button").on("click", function() {

        var searchTerm = $("#search-value").val();
        console.log(searchTerm);

        searchWeather(searchTerm);
        makeRow(searchTerm);

    });

    $(".history").on("click", "li", function() {
        searchWeather($(this).text());
    });

    function makeRow(text) {
        var li = $("<li>")
            .addClass("list-group-item list-group-item-action")
            .text(text);
        $(".history").prepend(li);
    }
    //console.log("searching weather");

    function searchWeather(searchValue) {
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=2641f6c0fcb035c194bce28917537a6f&units=imperial`,
            dataType: "json",
        }).then(function(data) {
            var temp = Math.round(data.main.temp);
            console.log(data);
            $("#today").empty();
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var title = $("<h2>")
                .addClass("card-title")
                .text(data.name);
            var tempEl = $("<p>")
                .addClass("card-text")
                .text("Temperature: " + temp);
            var wind = $("<p>")
                .addClass("card-text")
                .text("Wind Speed: " + data.wind.speed + "mph");
            var humid = $("<p>")
                .addClass("card-text")
                .text("Humidity:" + data.main.humidity + "%");
            // var img = $("<img>").attr(
            //     "src",
            //     "https://api.openweathermap.org/img/w" + data.weather[0].icon + "png"
            // );

            $("#today").append(card);
            card.append(cardBody);
            cardBody.append(title, tempEl, humid, wind)

            var lat = data.coord.lat;
            var lon = data.coord.lon;

            getForecast(lat, lon)
                // getUVIndex(lat, lon)
        });
    }
});
// 
//     if (history.search(searchValue) === -1) {
//         history.push(searchValue);
//         window.localStorage.setItem("history", JSONstringify(history));

//         makeRow(searchValue);
//     }
//     //clears content


//     //adds to page

//     getForecast(searchValue);
//     //        getUVIndex(data.coord.lat, data.coord.lon);
// },
// });
//console.log("done searching weather");

function getForecast(lat, lon) {
    $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=2641f6c0fcb035c194bce28917537a6f`,
        dataType: "json"
    }).then(function(res) {
        console.log(res)
    })
}
//             .then(function(resp) {
//                 return resp.json();
//             }) // Convert data to json
//             .then(function(data) {
//                 console.log(data);
//                 $("#forecast")
//                     .html('h4 class="mt-3">5 Day Forecast:</h4>')
//                     .append('div class = "row">');

//                 //loop over all forecasts
//                 for (var i = 0; 1 < data.list.length; i++) {
//                     //forecast for 3pm
//                     if (data.list[1].dt.txt.indexOf("15:00:00") !== -1) {
//                         //elements for card
//                         var col = $("<div>").addClass("col-md-2");
//                         var card = $("<div>").addClass("card bg-primary text-white");
//                         var body = $("<div>").addClass("card-body p-2");

//                         var title = $("<h5>")
//                             .addClass("card-title")
//                             .text(newDate(data.list[i].dt.txt).toLocalDateString());
//                         var img = $("<img>").attr(
//                             "src",
//                             "https://openweathermap.org/img/w" +
//                             data.list[i].weather[0].icon +
//                             ".png"
//                         );
//                         var p1 = $("<p>")
//                             .addClass("card-text")
//                             .text("Temp: " + data.list[i].main.temp_max + " f");
//                         var p2 = $("<p>")
//                             .addClass("card-text")
//                             .text("Humidity: " + data.list[i].main.humidity + " % ");
//                         //merge on page
//                         col.append(card.append(body.append(title, img, p1, p2)));
//                         $("forecast.row").append(col);
//                     }
//                 }
//             })

//             .catch(function() {
//             // catch any errors
//         }),
//     });

//     function getUVIndex(lat, lon) {
//         $.ajax({
//             type: "GET",
//             url: "https://api.openweathermap.org/data/2.5/forecast?lat=" +
//                 searchValue +
//                 "&appid=95d2250a485b04b30b74e7111f480544",
//             dataType: "json",
//             success: function(data) {
//                 var uv = $("<p>").text("UV Index:  ");
//                 var btn = $("<span>").addClass("btn bt-sm").text(data.value);

//                 //color depends on uv value
//                 if (data.value < 3) {
//                     btn.addClass("btn-success");
//                 } else if (data.value < 7) {
//                     btn.addClass("btn-warning");
//                 } else {
//                     btn.addClass("btn-danger");
//                 }

//                 $("#today .card-body").append(uv.append(btn));
//             },
//         });