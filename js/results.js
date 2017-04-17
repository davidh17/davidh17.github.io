//behavior for some elements

var fieldContent;

//determine if query is by safety level or price

function showResults() {

    fieldContent = document.getElementById("Ultra").value;



    if (fieldContent == 1) {

        location.href = "safety_query.html#indicator";





    } else if (fieldContent == 2) {


        location.href = "price_query.html#indicator";

    }


}

//display the safest rental places according to the number requested by the user

function showSafety() {

    fieldContent = document.getElementById("Ultra2").value;

    changeText2('but5');

    switch (fieldContent) {
    case "0":
        alert("Please enter the number of rental sites you want to search in the field");

        break;
    case "1":
        initMap();
        showSafestPlaces(5);
        break;
    case "2":
        initMap();
        showSafestPlaces(10);
        break;
    case "3":
        initMap();
        showSafestPlaces(15);
        break;
    case "4":
        initMap();
        showSafestPlaces(20);
        break;
    case "5":
        initMap();
        showSafestPlaces(25);
        break;
    case "6":
        initMap();
        showSafestPlaces(30);
        break;
    case "7":
        initMap();
        showSafestPlaces(40);
        break;

    default:
        break;

    }
}


//determine the rental places in a range of distance to University of Illinois

var arrayDistance = [];

function determineDistance() {


    saveDistance();


    fieldContent = document.getElementById("Ultra2").value;

    fieldContentIn = document.getElementById("Ultra3").value;


    var distanceSearched;

    switch (fieldContentIn) {
    case "0":

        break;
    case "1":
        distanceSearched = 0.005;
        break;
    case "2":
        distanceSearched = 0.01;
        break;
    case "3":
        distanceSearched = 0.015;
        break;
    case "4":
        distanceSearched = 0.02;
        break;
    case "5":
        distanceSearched = 0.025;
        break;
    case "6":
        distanceSearched = 0.03;
        break;
    case "7":
        distanceSearched = 0.04;
        break;
    case "8":
        distanceSearched = 0.05;
        break;
    case "9":
        distanceSearched = 0.06;
        break;
    case "10":
        distanceSearched = 10;
        break;

    default:
        break;

    }


    for (var i = 0; i < 5 * parseInt(fieldContent); i++) {



        if (arrayRentPlaces[i][10] <= distanceSearched) {
            arrayDistance.push(i);
        }
    }

}

//realize a whole query having as reference the criterion of safety and with different filters that user can realize

var flag = true;


function safetyQuery() {


    fieldContentSites = document.getElementById("Ultra2").value;
    fieldContentDistance = document.getElementById("Ultra3").value;
    fieldContentParks = document.getElementById("Ultra5").value;
    fieldContentStations = document.getElementById("Ultra6").value;

    if (fieldContentSites == "0") {
        alert("Please enter the number of rental sites you want to search in the top field");
        return;
    }



    if (fieldContentDistance == "0") {
        alert("Please fill in the required field");
        return;
    }


    changeText2('but5');

    initMap();
    determineDistance();

    if (flag) {
        determineNearbyParks();
        determineNearestStation();
    }

    flag = false;




    var copy = arrayDistance.length;
    fieldContentTraffic = document.getElementById("Ultra4").value;

    var speed;

    if (fieldContentTraffic != "0") {
        var speed = determineSpeed(fieldContentTraffic);
    }

    var infowindow = new google.maps.InfoWindow();

    var marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(41.8708, -87.6505),
        map: map,
        title: 'C.S Dept U. of Illinois',
        icon: "images/univ.png"

    });



    for (var i = 0; i < copy; i++) {

        var index = arrayDistance.pop();

        if (fieldContentTraffic != "0") {
            var area_speed = determineTrafficSpeed(arrayRentPlaces[index][0], arrayRentPlaces[index][1]);

            if (speed == 15) {

                if (area_speed > 15) {
                    continue;
                }

            } else if (speed == 20) {

                if (area_speed <= 15 || area_speed > 20) {
                    continue;
                }
            } else if (speed == 25) {

                if (area_speed <= 20 || area_speed > 25) {
                    continue;
                }
            } else if (speed == 30) {

                if (area_speed <= 25 || area_speed > 30) {
                    continue;
                }
            } else if (speed == 35) {

                if (area_speed <= 30 || area_speed > 35) {
                    continue;
                }
            } else if (speed == 100) {

                if (area_speed <= 35) {
                    continue;
                }
            } else {
                continue;
            }


        }

        if (fieldContentParks != "0") {

            var a;

            var numberParks = determineNumberParks(fieldContentParks);

            if (numberParks >= 5 && numberParks <= 25) {



                if (arrayRentPlaces[i][11] >= numberParks - 5 && arrayRentPlaces[i][11] <= numberParks) {
                    a = true;
                } else {
                    continue;
                }

            } else {
                if (arrayRentPlaces[i][11] > numberParks) {
                    a = true;
                } else {
                    continue;
                }
            }
        }


        if (fieldContentStations != "0") {

            var b;

            var numberStations = determineNumberStations(fieldContentStations);

            if (numberStations >= 0.001 && numberStations <= 0.03) {



                if (arrayRentPlaces[i][12] <= numberStations) {
                    b = true;
                } else {
                    continue;
                }

            }
        }



        function placeMarker(loc) {
            var latLng = new google.maps.LatLng(loc[0], loc[1]);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: "images/apt-sf.png",
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

        placeMarker(arrayRentPlaces[index]);




    }

    arrayDistance = [];


}

//display cheapest rental places on map according to the number requested by the user

function showProfitability() {

    fieldContent = document.getElementById("Ultra2").value;

    changeText2('but5');


    switch (fieldContent) {
    case "0":
        alert("Please enter the number of rental sites you want to search in the field");
        break;
    case "1":
        initMap();
        showCheapestPlaces(5);
        break;
    case "2":
        initMap();
        showCheapestPlaces(10);
        break;
    case "3":
        initMap();
        showCheapestPlaces(15);
        break;
    case "4":
        initMap();
        showCheapestPlaces(20);
        break;
    case "5":
        initMap();
        showCheapestPlaces(25);
        break;
    case "6":
        initMap();
        showCheapestPlaces(30);
        break;
    case "7":
        initMap();
        showCheapestPlaces(40);
        break;

    default:
        break;

    }
}

//realize a whole query having as reference the criterion of profitability (rental price) and with different filters that user can realize

function profitabilityQuery() {

    fieldContentSites = document.getElementById("Ultra2").value;
    fieldContentDistance = document.getElementById("Ultra3").value;
    fieldContentParks = document.getElementById("Ultra5").value;
    fieldContentStations = document.getElementById("Ultra6").value;


    if (fieldContentSites == "0") {
        alert("Please enter the number of rental sites you want to search in the top field");
        return;
    }

    if (fieldContentDistance == "0") {
        alert("Please fill in the required field");
        return;
    }


    changeText2('but5');
    initMap();
    determineDistance();

    if (flag) {
        determineNearbyParks();
        determineNearestStation();
    }
    flag = false;



    var copy = arrayDistance.length;
    fieldContentTraffic = document.getElementById("Ultra4").value;

    var speed;

    if (fieldContentTraffic != "0") {
        var speed = determineSpeed(fieldContentTraffic);
    }

    var infowindow = new google.maps.InfoWindow();

    var marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(41.8708, -87.6505),
        map: map,
        title: 'C.S Dept U. of Illinois',
        icon: "images/univ.png"

    });





    for (var i = 0; i < copy; i++) {

        var index = arrayDistance.pop();

        if (fieldContentTraffic != "0") {
            var area_speed = determineTrafficSpeed(arrayRentPlaces[index][0], arrayRentPlaces[index][1]);

            if (speed == 15) {

                if (area_speed > 15) {
                    continue;
                }

            } else if (speed == 20) {

                if (area_speed <= 15 || area_speed > 20) {
                    continue;
                }
            } else if (speed == 25) {

                if (area_speed <= 20 || area_speed > 25) {
                    continue;
                }
            } else if (speed == 30) {

                if (area_speed <= 25 || area_speed > 30) {
                    continue;
                }
            } else if (speed == 35) {

                if (area_speed <= 30 || area_speed > 35) {
                    continue;
                }
            } else if (speed == 100) {

                if (area_speed <= 35) {
                    continue;
                }
            } else {
                continue;
            }


        }

        if (fieldContentParks != "0") {

            var a;

            var numberParks = determineNumberParks(fieldContentParks);

            if (numberParks >= 5 && numberParks <= 25) {



                if (arrayRentPlaces[i][11] >= numberParks - 5 && arrayRentPlaces[i][11] <= numberParks) {
                    a = true;
                } else {
                    continue;
                }

            } else {
                if (arrayRentPlaces[i][11] > numberParks) {
                    a = true;
                } else {
                    continue;
                }
            }
        }


        if (fieldContentStations != "0") {

            var b;

            var numberStations = determineNumberStations(fieldContentStations);

            if (numberStations >= 0.001 && numberStations <= 0.03) {



                if (arrayRentPlaces[i][12] <= numberStations) {
                    b = true;
                } else {
                    continue;
                }

            }
        }



        function placeMarker(loc) {
            var latLng = new google.maps.LatLng(loc[0], loc[1]);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: "images/apt-pr.png",
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

        placeMarker(arrayRentPlaces[index]);

    }

    arrayDistance = [];


}


//function for refresh the current page

function reFresh() {
    location.reload(true);
}