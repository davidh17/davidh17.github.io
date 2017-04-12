//Javascript for the project

function initialize() {
    saveCrimes();
    savePoliceStations();
    saveRentPlaces();
    determineSafety();
    saveDistance();
    saveTrafficRegions();
}
window.onload = initialize;



// Initialize the map to a specific location
function initMap() {
    var myLatLng = {
        lat: 41.8708,
        lng: -87.6505


    };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: myLatLng

    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'C.S Dept U. of Illinois',
        icon: 'images/univ.png'

    });
}



var elevator;
var map;
// 2-level array 
var arrayPoliceStations, arrayCrimes = [];


String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

//save police stations
function savePoliceStations() {

    var infowindow = new google.maps.InfoWindow({
        content: ""
    });

    var xmlhttp = new XMLHttpRequest();

    var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);

            //information of the markets 

            for (var i = 0; i < 23; i++) {
                var dataArray = [];
                //latitude - 0
                dataArray.push(json.data[i][20]);
                //longitude - 1
                dataArray.push(json.data[i][21]);
                //name - 2
                dataArray.push(json.data[i][9]);
                //address - 3
                dataArray.push(json.data[i][10]);
                //website - 4
                dataArray.push(json.data[i][14][0]);
                //phone - 5
                dataArray.push(json.data[i][15][0]);
                //fax- 6
                dataArray.push(json.data[i][16][0]);
                //TTY-7
                dataArray.push(json.data[i][17][0]);
                //zip - 8
                dataArray.push(json.data[i][13][0]);

                arrayPoliceStations.push(dataArray);
            };


        }
    }
};

//save some crimes in Chicago (since Jan 1 2017)

function saveCrimes() {

    var infowindow = new google.maps.InfoWindow({
        content: ""
    });

    var xmlhttp = new XMLHttpRequest();

    var url = "https://data.cityofchicago.org/api/views/itbm-jtnw/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            //alert(json.data[1][1]);

            //information of the markets 

            for (var i = 0; i < 965; i++) {
                var dataArray = [];
                //latitude - 0
                dataArray.push(json.data[i][27]);
                //longitude - 1
                dataArray.push(json.data[i][28]);
                //case number -2
                dataArray.push(json.data[i][9]);
                //primary type- 3
                dataArray.push(json.data[i][13]);
                //description - 4
                dataArray.push(json.data[i][14]);
                //location description - 5
                dataArray.push(json.data[i][15]);

                arrayCrimes.push(dataArray);
            };


        }
    }
};

//Determine safety for a renting place

function determineSafety() {


    for (var i = 0; i < arrayRentPlaces.length; i++) {
        var min_distance = 0;

        for (var j = 0; j < arrayCrimes.length; j++) {

            var lat1 = arrayRentPlaces[i][0];
            var lon1 = arrayRentPlaces[i][1];

            var lat2 = parseFloat(arrayCrimes[j][0]);
            var lon2 = parseFloat(arrayCrimes[j][1]);

            var distance = Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));

            if (min_distance == 0) {
                min_distance = distance;

            } else {
                if (distance < min_distance) {
                    min_distance = distance;
                }
            }

            arrayRentPlaces[i][9] = min_distance;

        };


    };


    //order rent places by proximity to crimes locations, to determine safest places according to this parameter 
    arrayRentPlaces.sort(function (a, b) {
        if (a[9] < b[9]) return -1;
        if (a[9] > b[9]) return 1;
        return 0;

    });

};

//show safest renting options on map



function showSafestPlaces(numberPlaces) {



    for (var i = 0; i < numberPlaces; i++) {
        var myLatLng = {
            lat: arrayRentPlaces[i][0],
            lng: arrayRentPlaces[i][1]

        };



        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: arrayRentPlaces[i][3],
            icon: 'images/apt-sf.png'

        });
    }


}

// show cheapest rental sites on map

function showCheapestPlaces(numberPlaces) {

    arrayRentPlaces.sort(function (a, b) {
        if (a[4] < b[4]) return -1;
        if (a[4] > b[4]) return 1;
        return 0;

    });


    for (var i = 0; i < numberPlaces; i++) {
        var myLatLng = {
            lat: arrayRentPlaces[i][0],
            lng: arrayRentPlaces[i][1]

        };

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: arrayRentPlaces[i][3],
            icon: 'images/apt-pr.png'

        });
    }


}

//determine distance to University of Illinois from each rental site

function saveDistance() {

    var latUniversity = 41.8708;
    var lonUniversity = -87.6505;

    for (var i = 0; i < arrayRentPlaces.length; i++) {

        var lat1 = arrayRentPlaces[i][0];
        var lon1 = arrayRentPlaces[i][1];

        var distance = Math.sqrt(Math.pow(latUniversity - lat1, 2) + Math.pow(lonUniversity - lon1, 2));

        arrayRentPlaces[i][10] = distance;

    }
}

//save traffic regions data

var arrayTraffic = [];

function saveTrafficRegions() {

    var infowindow = new google.maps.InfoWindow({
        content: ""
    });

    var xmlhttp = new XMLHttpRequest();

    var url = "https://data.cityofchicago.org/api/views/t2qc-9pjd/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            //information of the markets 

            for (var i = 0; i < 29; i++) {
                var dataArray = [];
                //latitude - south - 0
                dataArray.push(json.data[i][12]);
                //latitude - north - 1
                dataArray.push(json.data[i][13]);
                //longitude - west - 2
                dataArray.push(json.data[i][10]);
                //longitude - east - 3
                dataArray.push(json.data[i][11]);
                //name- 4
                dataArray.push(json.data[i][8]);
                //description - 5
                dataArray.push(json.data[i][14]);
                //current speed - 6
                dataArray.push(json.data[i][15]);
                //last update - 7
                dataArray.push(json.data[i][16]);

                arrayTraffic.push(dataArray);
            };


        }
    }

}

//draw traffic regions on map

function drawTrafficRegions() {


    var colors = ["red", "darkorange", "yellow", "forestgreen", "lime", "greenyellow"];
    var colorRegion;
    var vel_flag;

    for (var i = 0; i < 29; i++) {

        var vel = parseFloat(arrayTraffic[i][6]);


        if (vel <= 15) {
            colorRegion = colors[0];
            vel_flag = 0.3;
        } else if (vel > 15 && vel <= 20) {
            colorRegion = colors[1];
            vel_flag = 0.5;
        } else if (vel > 20 && vel <= 25) {
            colorRegion = colors[2];
            vel_flag = 0.7;
        } else if (vel > 25 && vel <= 30) {
            colorRegion = colors[3];
            vel_flag = 1.0;
        } else if (vel > 30 && vel <= 35) {
            colorRegion = colors[4];
            vel_flag = 1.4;
        } else if (vel > 35) {
            colorRegion = colors[5];
            vel_flag = 2.0;
        } else {
            alert("region not detected.")
        }


        var regionCoords = [
            {
                lat: parseFloat(arrayTraffic[i][1]),
                lng: parseFloat(arrayTraffic[i][2])
        },
            {
                lat: parseFloat(arrayTraffic[i][1]),
                lng: parseFloat(arrayTraffic[i][3])
        },
            {
                lat: parseFloat(arrayTraffic[i][0]),
                lng: parseFloat(arrayTraffic[i][3])
        },
            {
                lat: parseFloat(arrayTraffic[i][0]),
                lng: parseFloat(arrayTraffic[i][2])
        }
        ];

        // Construct the polygon.
        var region = new google.maps.Polygon({
            paths: regionCoords,
            strokeColor: colorRegion,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: colorRegion,
            fillOpacity: 0.35,

        });
        region.setMap(map);

        // Define the symbol
        var lineSymbol = {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 2,
            strokeColor: "maroon",
            strokeOpacity: 30
        };

        // Create the polyline and add the symbol 
        var line = new google.maps.Polyline({
            path: [{
                lat: parseFloat(arrayTraffic[i][1]),
                lng: parseFloat(arrayTraffic[i][2]) + ((parseFloat(arrayTraffic[i][3]) - parseFloat(arrayTraffic[i][2])) / 2)
            }, {
                lat: parseFloat(arrayTraffic[i][0]),
                lng: parseFloat(arrayTraffic[i][2]) + ((parseFloat(arrayTraffic[i][3]) - parseFloat(arrayTraffic[i][2])) / 2)
            }],
            icons: [{
                icon: lineSymbol,

          }],
            map: map


        });

        animateCircle(line, vel_flag);

    };
}

function animateCircle(line, velocity) {
    var count = 0;
    window.setInterval(function () {
        count = (count + velocity) % 200;

        var icons = line.get('icons');
        icons[0].offset = (count / 2) + '%';
        line.set('icons', icons);
    }, 20);
}

//change text in a button



function changeText(id) {

    var content = document.getElementById(id).innerHTML;

    if (content == "Show Traffic") {
        safetyQuery();

        drawTrafficRegions();
        document.getElementById(id).innerHTML = "Hide Traffic";

    } else {
        safetyQuery();

        document.getElementById(id).innerHTML = "Show Traffic";

    }



}

function determineSpeed(value) {

    switch (value) {
    case "0":

        break;
    case "1":
        return 15;
        break;
    case "2":
        return 20;
        break;
    case "3":
        return 25;
        break;
    case "4":
        return 30;
        break;
    case "5":
        return 35;
        break;
    case "6":
        return 100;
        break;

    default:
        break;

    }

}


function changeText2(id) {
    document.getElementById(id).innerHTML = "Show Traffic";

}

//determine traffic in the area of a rental place

function determineTrafficSpeed(latitude, longitude) {

    for (var i = 0; i < arrayTraffic.length; i++) {

        if (latitude >= parseFloat(arrayTraffic[i][0]) && latitude <= parseFloat(arrayTraffic[i][1]) && longitude >= parseFloat(arrayTraffic[i][2]) && longitude <= parseFloat(arrayTraffic[i][3])) {
            return parseFloat(arrayTraffic[i][6]);
        }
    }


}