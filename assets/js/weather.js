let weatherTableContainer = document.getElementById("weather-table-container");

function getTemperature() {
    let locationValue = "Buffalo National River";
    
     
    locationValue = encodeURIComponent(locationValue);
    let weatherURL = "https://geocoding-api.open-meteo.com/v1/search?name=" + locationValue + "&count=10&language=en&format=json";
    fetch(weatherURL)
    .then(response => response.json())
    .then(json => {
        if (!json.results) {
            alert("No results found.");
            return;
        }
        let latitude = json.results[0].latitude;
        let longitude = json.results[0].longitude;
        fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=auto")
        .then(weatherResponse => weatherResponse.json())
        .then(weatherJson => {
            console.log(weatherJson);

            let temperatures = weatherJson.hourly.temperature_2m;
            let times = weatherJson.hourly.time;

            if (temperatures.length > 0) {

                let weatherTable = "<table><tr><th>Date</th><th>Temp</th></tr>";

                let now = Date.now();
                let sevendays = now + 7 * 24 * 60 * 60 * 1000;

                let dailytemps = {};

                for (let i = 0; i < temperatures.length; i++) {
                    let tempstamp = Date.parse(times[i]);
                    if (tempstamp >= now && tempstamp <= sevendays) {
                        let dateObj = new Date(tempstamp); 
                        let hours = dateObj.getHours(); 
                        let dayKey = dateObj.toDateString().split("T")[0];
                        if (hours === 12 && !dailytemps[dayKey]) {
                            dailytemps[dayKey] = {
                                time: dateObj.toLocaleDateString(),
                                temp: temperatures[i]
                            };
                        }
                    }
                }

                // Filter out the results to display
                let timeFliter = [];
                let tempFliter = [];

                for (let key in dailytemps) {
                    timeFliter.push(dailytemps[key].time);
                    tempFliter.push(dailytemps[key].temp);
                }

                // Generate the table rows with the filtered data
                for (let i = 0; i < timeFliter.length; i++) {
                    weatherTable += "<tr><td>" + timeFliter[i] + "</td><td>" + tempFliter[i] + "°F</td></tr>";
                }

                weatherTable += "</table>";
                weatherTableContainer.innerHTML = weatherTable;
                weatherTableContainer.style.display = "block";
            }
        });
    });
}
function clearForm() {
    weatherTableContainer.innerHTML = "";
    weatherTableContainer.style.display = "none";}


getTemperature()