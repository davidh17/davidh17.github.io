//behavior for some elements

var fieldContent;

function showResults() {

    fieldContent = document.getElementById("Ultra").value;



    if (fieldContent == 1) {

        location.href = "safety_query.html#indicator";





    } else if (fieldContent == 2) {


        location.href = "price_query.html#map";

    }


}

function showSafety() {

    fieldContent = document.getElementById("Ultra2").value;

    changeText2('but5');

    //initMap();
    // alert(fieldContent);

    switch (fieldContent) {
    case "0":

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

var arrayDistance = [];

//determine the rental places in a range of distance to University of Illinois
function determineDistance() {

    saveRentPlaces();

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
        distanceSearched = 0.06001;
        break;

    default:
        break;

    }


    for (var i = 0; i < 5 * parseInt(fieldContent); i++) {

        if (distanceSearched >= 0.005 && distanceSearched <= 0.06) {


            if (arrayRentPlaces[i][10] <= distanceSearched) {
                arrayDistance.push(i);
            }
        } else {

            if (arrayRentPlaces[i][10] > distanceSearched) {
                arrayDistance.push(i);
            }
        }
    }

}


function safetyQuery() {

    fieldContentDistance = document.getElementById("Ultra3").value;

    if (fieldContentDistance == "0") {
        showSafety();
        return;
    }


    changeText2('but5');

    determineDistance();
    initMap();

    var copy = arrayDistance.length;
    fieldContentTraffic = document.getElementById("Ultra4").value;

    var speed;

    if (fieldContentTraffic != "0") {
        var speed = determineSpeed(fieldContentTraffic);
    }

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

        var myLatLng = {
            lat: arrayRentPlaces[index][0],
            lng: arrayRentPlaces[index][1]

        };



        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: arrayRentPlaces[index][3],
            icon: 'images/apt-sf.png'

        });

    }

    arrayDistance = [];


}

function showProfitability() {

    fieldContent = document.getElementById("Ultra2").value;

    changeText2('but5');


    switch (fieldContent) {
    case "0":

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


function profitabilityQuery() {

    fieldContentDistance = document.getElementById("Ultra3").value;

    if (fieldContentDistance == "0") {
        showProfitability();
        return;
    }


    changeText2('but5');

    determineDistance();

    initMap();

    var copy = arrayDistance.length;
    fieldContentTraffic = document.getElementById("Ultra4").value;

    var speed;

    if (fieldContentTraffic != "0") {
        var speed = determineSpeed(fieldContentTraffic);
    }

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

        var myLatLng = {
            lat: arrayRentPlaces[index][0],
            lng: arrayRentPlaces[index][1]

        };



        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: arrayRentPlaces[index][3],
            icon: 'images/apt-pr.png'

        });

    }

    arrayDistance = [];


}