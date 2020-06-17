
$(document).ready(function(){

//Variables
var apiKey = "5f23293254a52c2562b57e712b10f79e";
var dayCnt = "6";

//Functions
$('#srchBtn').on('click', function() {
    var dayArr = [];
    event.preventDefault();
    var srchCity = "";
    srchCity = $('#searchCity').val().trim(); 
    
    function runQuery(srchCity) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + srchCity + "&cnt=" + dayCnt + "&appid=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
            
        }).then(function (weatherData){
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
            display(dayArr);
        });
    }

    function display(dayArr) {
        $('#srchCity').html(srchCity);
        $('#srchTemp').html(dayArr[0].temp);
        $('#srchHumid').html(dayArr[0].humidity);
        $('#srchWind').html(dayArr[0].windSpeed);
        $('#srchIcon').html(dayArr[0].icon);
        
        for(var i = 1; i <= 5; i++) {
            var dayTemp = "#day" + i + "Temp";
            $(dayTemp).html(dayArr[i].temp);

            var dayHumid = "#day" + i + "Humid";
            $(dayHumid).html(dayArr[i].humidity);

            var dayWind = "#day" + i + "Wind";
            $(dayWind).html(dayArr[i].windSpeed);

            var dayIcon = "#day" + i + "Icon";
            $(dayIcon).html(dayArr[i].icon);
        }
        
    }
    runQuery(srchCity);
    });

});


    


