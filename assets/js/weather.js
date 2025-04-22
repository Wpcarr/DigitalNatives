let weatherChart;
 let weatherTableContainer = document.getElementById("weather-table-container");

 function getTemperature() {
    let locationValue = document.getElementById("weather-location").value;
    if (locationValue == "") {
        alert("Please enter a city name.");
        return;
    }
     
    locationValue = encodeURIComponent(locationValue);
    let weatherURL = "https://geocoding-api.open-meteo.com/v1/search?name=" + locationValue + "&count=10&language=en&format=json";
    fetch(weatherURL)
    .then(response => response.json())
    .then(json => {
        if (!json.results) {
            alert("No results. Try a different city name.")
            return;
        }
        let latitude = json.results[0].latitude;
        let longitude = json.results[0].longitude;
        fetch("https://api.open-meteo.com/v1/forecast?latitude="+latitude+"&longitude="+longitude+"&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=auto")
        .then(weatherResponse => weatherResponse.json())
        .then(weatherJson => {
            console.log(weatherJson)

            let temperatures = weatherJson.hourly.temperature_2m;
            let times = weatherJson.hourly.time;

            if (temperatures.length > 0) {
                document.getElementById("location-info").innerHTML = json.results[0].name + ", " + json.results[0].admin1 + ", " + json.results[0].country + "<br/>Latitude = " + json.results[0].latitude + " - Longitude = " + json.results[0].longitude;

                let weatherTable = "<table><caption>7-Day Forecast: Hourly Temperature</caption><tr><th>Date</th><th>Temp</th></tr>";
                
                let now = Date.now();
                let sevendays= now + 7 * 24 * 60 * 60 * 1000;

                let dailytemps = {};

                
                for (let i = 0; i < temperatures.length; i++) {
                    // // Convert date to unix milliseconds
                    let tempstamp = Date.parse(times[i]);
                    if ( tempstamp >= now && tempstamp <= sevendays) {
                        let dateObj = new Date(tempstamp); 
                        let hours = dateObj.getHours(); 
                        let dayKey = dateObj.toDateString().split("T")[0];
                        if ( hours === 12 && !dailytemps[dayKey]){
                            dailytemps[dayKey] = {
                                time : dateObj.toLocaleDateString(),
                                temp: temperatures[i]
                            }; 
                        }

                    }
                } 
                    // // Create temporary date variable
                    let timeFliter = [];
                    // // Extract the date/time string for a more friendly format
                    let tempFliter = [];

                    for (let key in dailytemps){
                        timeFliter.push (dailytemps[key].time);
                        tempFliter.push(dailytemps[key].temp);
                    }

                    
                weatherTable = weatherTable += "</table>"
                weatherTableContainer.innerHTML = weatherTable;
                weatherTableContainer.style.display = "block";

                if (weatherChart) {
                    weatherChart.destroy();
                }
           
                weatherChart = new Chart("weather-chart", {
                    type: "line",
                    data: {
                        labels: xValues,
                        datasets: [{
                            data: yValues,
                            fill: false,
                            backgroundColor: "#3f95ce",
                            label: "Temperatures",
                            borderColor: "#3f95ce",
                        }]
                    },
                    options: {
                        
                    }
                });

            }
        })
    });
    
 }

 function clearForm() {
    document.getElementById("weather-location").value = "";
    document.getElementById("location-info").innerHTML = "";
    weatherTableContainer.innerHTML = "";
    weatherTableContainer.style.display = "none";
    if (weatherChart) {
        weatherChart.destroy();
    }
 }

 