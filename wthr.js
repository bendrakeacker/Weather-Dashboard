
$(document).ready(function(){

//Variables
var apiKey = "5f23293254a52c2562b57e712b10f79e";
var dayCnt = "6";
var cityArr = JSON.parse(localStorage.getItem("cities")) || [];

//Functions
$('#srchBtn').on('click', function() {
    var dayArr = [];
    event.preventDefault();
    var srchCity = "";
    srchCity = $('#searchCity').val().trim(); 


    function runQuery(srchCity) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + srchCity + "&cnt=" + dayCnt + "&appid=" + apiKey;
        cityArr.push({
            cityName: srchCity
         });
        localStorage.setItem("cities", JSON.stringify(cityArr));
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (weatherData){
            saveCity();
            for(var i = 0; i < 6; i++) {
                var dayNumber = {
                    // day = moment().add(i, 'days').format('l');
                    temp: ((weatherData.list[i].main.temp)-273.15) * 9/5 + 32,
                    humidity: weatherData.list[i].main.humidity,
                    windSpeed: weatherData.list[i].wind.speed,
                    icon: weatherData.list[i].weather[0].icon,
                    id: i
                };
                dayArr.push(dayNumber);
            }
            var lon = weatherData.city.coord.lon;
            var lat = weatherData.city.coord.lat;
            queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + apiKey;

        $.ajax({
            
            url: queryURL,
            method: 'GET'
        }).then(function (weatherData) {
            var uvi = weatherData.daily[0].uvi;
            $('#srchUVI').html(uvi);
        })
            display(dayArr);
        });
    }


    function display(dayArr) {
        $('#srchCity').html(srchCity);
        $('#srchTemp').html("Temp: " + (dayArr[0].temp).toFixed(2));
        $('#srchHumid').html("Humidity: " + (dayArr[0].humidity));  
        $('#srchWind').html("Wind Speed: " + (dayArr[0].windSpeed));
        $('#srchIcon').html((dayArr[0].icon));
       
        
        for(var i = 1; i <= 5; i++) {
            var dayTemp = "#day" + i + "Temp";
            $(dayTemp).html("Temp: " + (dayArr[i].temp).toFixed(2));

            var dayHumid = "#day" + i + "Humid";
            $(dayHumid).html("Humidity: " + (dayArr[i].humidity));

            var dayWind = "#day" + i + "Wind";
            $(dayWind).html("Wind Speed: " + (dayArr[i].windSpeed));

            var dayIcon = "#day" + i + "Icon";
            $(dayIcon).html(dayArr[i].icon);
        }   
    }
    runQuery(srchCity);
    })

    function saveCity() {
        for(var i = 15; i > 0; i--) {
            $('#btn' + i).html($('#btn' + (i-1)).html());
        }
    $('#btn1').html(srchCity)
    }
    
});


    