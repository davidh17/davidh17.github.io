var arrayRentPlaces = [];


//save renting places
function saveRentPlaces() {

    var infowindow = new google.maps.InfoWindow({
        content: ""
    });

    var xmlhttp = new XMLHttpRequest();
    var url = "https://raw.githubusercontent.com/goldironhack/2017-Purdue-UNAL-IronHack-davidh17/master/rentalplaces.json?token=ANBQdL6PypHpajmkzfA9lveafU0MM1jFks5ZBpgWwA%3D%3D"; //created file (json) for rental places (source:Zillow)
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);

            for (var i = 0; i < 94; i++) {
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

//display rental places on map

function showRentPlaces(numberPlaces, iconMap) {

    // alert(arrayRentPlaces.length);

    var infowindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(41.8708, -87.6505)
    });

    var marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(41.8708, -87.6505),
        map: map,
        title: 'C.S Dept U. of Illinois',
        icon: "images/univ.png"

    });

    function placeMarker(loc) {
        var latLng = new google.maps.LatLng(loc[0], loc[1]);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: iconMap,
            title: loc[3]

        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.close(); // Close previously opened infowindow
            infowindow.setContent('<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' + '<div>' +
                '<img src="images/h1.png" width="50px">' + '</div>' +
                '<h1 class="subtext2" id="textmap">' + loc[3] + '</h1>' +
                '<div id="bodyContent">' +
                '<p class="titlestyle">' + 'Property Manager: ' + '<tit1>' + loc[2] + '</tit1>' + '</p>' + '<p class="titlestyle">' + 'Rent Price: ' + '<tit1>' + '<b>' + '$' + '</b>' + loc[4] + '</tit1>' + '</p>' + '<p class="titlestyle">' + 'Bedrooms: ' + '<tit1>' + loc[5] + '</tit1>' + '</p>' + '<p class="titlestyle">' + 'Baths: ' + '<tit1>' + loc[6] + '</tit1>' + '</p>' + '<p class="titlestyle">' + 'Area: ' + '<tit1>' + loc[7] + ' sqft' + '</tit1>' + '</p>' + '<p class="titlestyle">' + 'Contact number: ' + '<tit1>' + loc[8] + '</tit1>' + '</p>' + '</div>' +
                '</div>');
            infowindow.open(map, marker);
        });
    }

    // ITERATE ALL LOCATIONS


    for (var i = 0; i < numberPlaces; i++) {
        placeMarker(arrayRentPlaces[i]);
    }

}
google.maps.event.addDomListener(window, 'load', initGoogleMap);