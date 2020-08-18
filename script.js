$(document).ready(function() {
    var history = JSON.parse(localStorage.getItem("history")) || [];
    if (history.length > 0) {
        searchWeather(history[history.length - 1]);
    }
    for (var i = 0; i < history.length; i++) {
        makeRow(history[i])
    }

    $("#search-button").on("click", function() {

        event.preventDefault();

        var searchTerm = $("#search-value").val();
        //console.log(searchTerm);

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

    function searchWeather(searchValue) {
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=2641f6c0fcb035c194bce28917537a6f&units=imperial`,
            dataType: "json",
        }).then(function(data) {
            if (history.indexOf(searchValue) === -1) {
                history.push(searchValue);
                localStorage.setItem(
                    "history",
                    JSON.stringify(history)
                );
            }

            //forecast card on top//
            var temp = Math.round(data.main.temp);
            console.log(data);
            $("#today").empty();
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass(
                "card-body"
            );
            var title = $("<h2>")
                .addClass("card-title")
                .text(data.name);
            var tempEl = $("<p>")
                .addClass("card-text")
                .text("Temperature: " + temp + "| Wind Speed:" + parseInt(data.wind.speed) + "mph" +
                    "| Humidity:" + data.main.humidity + "%");
            let TempEl = Math.round(temp);
            var wind = $("<p>")
                .addClass("card-text"); //.text(`Wind Speed: ${parseInt(data.wind.speed)} mph`);
            var humid = $("<p>").addClass("card-text"); //   .text("Humidity:" + data.main.humidity + "%");

            // var tempEl = $("<p>")
            //     .addClass("card-text")
            //     .text("Temperature: " + temp + "|Wind Speed:"); // + parseInt(data.wind.speed) + "mph" + "Humidity:" + data.main.humidity + "%");




            var img = $("<img>").attr(
                "src",
                "https://openweathermap.org/img/wn/" +
                data.weather[0].icon +
                ".png"
            );

            $("#today").append(card);
            card.append(cardBody);
            cardBody.append(
                img,
                title,
                tempEl,
                humid,
                wind
            );

            var lat = data.coord.lat;
            var lon = data.coord.lon;

            getForecast(lat, lon);
            // getUVIndex(lat, lon)
        });
    }
});

function getForecast(lat, lon) {
    $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=2641f6c0fcb035c194bce28917537a6f&units=imperial`,
        dataType: "json",
    }).then(function(res) {
        //resets cards to empty//
        $("#forecast").html("");
        for (var i = 1; i < 6; i++) {
            console.log(res.daily[i]);
            var currDay = res.daily[i];
            var col = $("<div>").addClass("col-lg-2");
            var date = moment.unix(currDay.dt).format("MMMM Do");
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var title = $("<h2>").addClass("card-title").text(date);
            var cardBody = $("<div>").addClass("card-body");

            var tempEl = $("<p>")
                .addClass("card-text")
                .text("Temp: " + parseInt(currDay.temp.day) + "F");

            var wind = $("<p>")
                .addClass("card-text")
                .text("Wind Speed: " + parseInt(currDay.wind_speed) + "mph");

            var humid = $("<p>")
                .addClass("card-text")
                .text("Humid:" + currDay.humidity + "%");

            $("#forecast").append(
                col.append(card.append(cardBody.append(title, tempEl, wind, humid)))
            );
        }
    });
}