


async function GetData() {
    const apiUrl= "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055646,07055660,07055680,07055780&indent=on&period=P7D&siteStatus=active&parameterCd=00065"
    /* Make the AJAX call */
    let msg1Object = await fetch(apiUrl);
        /* Check the status */
    if (msg1Object.status >= 200 && msg1Object.status <= 299) {            
        let msg1JSONText = await msg1Object.text();
        // Parse the JSON string into an object
        let msg = JSON.parse(msg1JSONText);
        x = 0

//site 1
        var dates = [];
            var values = [];
            var fLen = msg.value.timeSeries[0].values[0].value.length;

            for (let i = 0; i < fLen; i++) {
                values[i] = msg.value.timeSeries[0].values[0].value[i].value;
                dates[i] = msg.value.timeSeries[0].values[0].value[i].dateTime;
            }

            var sitename = msg.value.timeSeries[0].sourceInfo.siteName;
            var sitecode = msg.value.timeSeries[0].sourceInfo.siteCode[0].value;
            var siteDescription = msg.value.timeSeries[0].variable.variableDescription;

          
            var ctx = document.getElementById("chartjs-0");
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: dates,
                    datasets: [{
                        label: sitename,
                        data: values,
                        fill: false,
                        borderColor: 'blue',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: true
                }
            });

//site 2
        var dates1 = [];
        var values1 = [];
        var fLen1 = msg.value.timeSeries[1].values[0].value.length;

        for (let i = 0; i < fLen1; i++) {
            values1[i] = msg.value.timeSeries[1].values[0].value[i].value;
            dates1[i] = msg.value.timeSeries[1].values[0].value[i].dateTime;
        }
        var sitename1 = msg.value.timeSeries[1].sourceInfo.siteName;
        var sitecode1 = msg.value.timeSeries[1].sourceInfo.siteCode[0].value;
        var siteDescription1 = msg.value.timeSeries[1].variable.variableDescription;
      
        var ctx1 = document.getElementById("chartjs-1");
        var myChart1 = new Chart(ctx1, {
            type: "line",
            data: {
                labels: dates1,
                datasets: [{
                    label: sitename1,
                    data: values1,
                    fill: false,
                    borderColor: 'pink',
                    tension: 0.1
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true
            }
        });
//site 3
         var dates2 = [];
        var values2 = [];
        var fLen2 = msg.value.timeSeries[2].values[0].value.length;

        for (let i = 0; i < fLen2; i++) {
            values2[i] = msg.value.timeSeries[2].values[0].value[i].value;
            dates2[i] = msg.value.timeSeries[2].values[0].value[i].dateTime;
        }
        var sitename2 = msg.value.timeSeries[2].sourceInfo.siteName;
        var sitecode2 = msg.value.timeSeries[2].sourceInfo.siteCode[0].value;
        var siteDescription2 = msg.value.timeSeries[2].variable.variableDescription;
      
        var ctx2 = document.getElementById("chartjs-2");
        var myChart2 = new Chart(ctx2, {
            type: "line",
            data: {
                labels: dates2,
                datasets: [{
                    label: sitename2,
                    data: values2,
                    fill: false,
                    borderColor: 'green',
                    tension: 0.1
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true
            }
        });
//site 4
    var dates3 = [];
    var values3 = [];
    var fLen3 = msg.value.timeSeries[3].values[0].value.length;

    for (let i = 0; i < fLen3; i++) {
        values3[i] = msg.value.timeSeries[3].values[0].value[i].value;
        dates3[i] = msg.value.timeSeries[3].values[0].value[i].dateTime;
    }
    var sitename3 = msg.value.timeSeries[3].sourceInfo.siteName;
    var sitecode3 = msg.value.timeSeries[3].sourceInfo.siteCode[0].value;
    var siteDescription3 = msg.value.timeSeries[3].variable.variableDescription;

    var ctx3 = document.getElementById("chartjs-3");
    var myChart3 = new Chart(ctx3, {
        type: "line",
        data: {
            labels: dates3,
            datasets: [{
                label: sitename3,
                data: values3,
                fill: false,
                borderColor: 'orange',
                tension: 0.1
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: true
        }
    });
        
    }

}

document.querySelectorAll('.chart-panel').forEach(canvas => {
    canvas.addEventListener('click', () => {
      canvas.classList.toggle('expanded');
    });
  });