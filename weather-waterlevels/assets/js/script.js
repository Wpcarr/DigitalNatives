async function GetData() {
    const apiUrl= "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055646,07055660,07055680,07055780&indent=on&period=P7D&siteStatus=active&parameterCd=00065"
    /* Make the AJAX call */
    let msg1Object = await fetch(apiUrl);
        /* Check the status */
    if (msg1Object.status >= 200 && msg1Object.status <= 299) {            
        let msg1JSONText = await msg1Object.text();
        // Parse the JSON string into an object
        let msg1 = JSON.parse(msg1JSONText);
        x = 0
    }
}