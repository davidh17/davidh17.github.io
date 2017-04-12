var arrayRentPlaces = [];


//save renting options
function saveRentPlaces() {

    var infowindow = new google.maps.InfoWindow({
        content: ""
    });

    var xmlhttp = new XMLHttpRequest();
    var url = "rentalplaces.json"; //created file (json) for rental places (source:Zillow)
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);

            for (var i = 0; i < 30; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json.data[i][0]);
                //longitude - 1
                dataLine.push(json.data[i][1]);
                //property manager - 2
                dataLine.push(json.data[i][2]);
                //address - 3
                dataLine.push(json.data[i][3]);
                //rent price - 4
                dataLine.push(json.data[i][4]);
                //number of bedrooms - 5
                dataLine.push(json.data[i][5]);
                //number of baths - 6
                dataLine.push(json.data[i][6]);
                //Square Feet - 7
                dataLine.push(json.data[i][7]);
                //Phone - 8
                dataLine.push(json.data[i][8]);

                arrayRentPlaces.push(dataLine);
            };

        }

    }

};

var shown = false;

//show rental sites on map
function showRentPlaces() {


    if (shown) {
        return;
    }
    shown = true;

    var numberOfMarkets = arrayRentPlaces.length;

    for (var i = 0; i < numberOfMarkets; i++) {
        var myLatLng = {
            lat: arrayRentPlaces[i][0],
            lng: arrayRentPlaces[i][1]

        };


        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: arrayRentPlaces[i][3],
            icon: 'images/apt.png'

        });
    }


}