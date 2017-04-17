//search a random rental place and get an analysis of it trough a dynamic chart

function findPlace() {


    $("#indicator2").attr("style", "display:block;");


    determineSafety();

    determineNearbyParks();

    determineNearestStation();

    saveDistance();

    saveTrafficRegions();

    //alert(arrayRentPlaces);

    var index = Math.floor(Math.random() * arrayRentPlaces.length);

    var speed = determineTrafficSpeed(arrayRentPlaces[index][0], arrayRentPlaces[index][1]);

    //price
    var price = arrayRentPlaces[index][4];
    var price_score;
    if (price <= 650) {
        price_score = 90;

    } else if (price > 650 && price <= 750) {
        price_score = 80;
    } else if (price > 750 && price <= 850) {
        price_score = 70;
    } else if (price > 850 && price <= 950) {
        price_score = 60;
    } else if (price > 950 && price <= 1050) {
        price_score = 50;
    } else if (price > 1050 && price <= 1350) {
        price_score = 40;
    } else if (price > 1350 && price <= 1450) {
        price_score = 30;
    } else {
        price_score = 20;
    }

    //area
    var area = arrayRentPlaces[index][7];
    var area_score;
    if (area <= 400) {
        area_score = 20;

    } else if (area > 400 && area <= 440) {
        area_score = 30;
    } else if (area > 440 && area <= 480) {
        area_score = 40;
    } else if (area > 480 && area <= 500) {
        area_score = 50;
    } else if (area > 500 && area <= 520) {
        area_score = 60;
    } else if (area > 520 && area <= 540) {
        area_score = 70;
    } else if (area > 540 && area <= 560) {
        area_score = 80;
    } else if (area > 560 && area <= 580) {
        area_score = 90;
    } else {
        area_score = 100;
    }

    //safety (proximity to crimes analysis)

    var safety = arrayRentPlaces[index][9];
    var safety_score;
    if (safety <= 0.005) {
        safety_score = 10;

    } else if (safety > 0.005 && safety <= 0.007) {
        safety_score = 20;
    } else if (safety > 0.007 && safety <= 0.01) {
        safety_score = 40;
    } else if (safety > 0.01 && safety <= 0.015) {
        safety_score = 50;
    } else if (safety > 0.015 && safety <= 0.02) {
        safety_score = 60;
    } else if (safety > 0.02 && safety <= 0.025) {
        safety_score = 70;
    } else if (safety > 0.025 && safety <= 0.03) {
        safety_score = 80;
    } else if (safety > 0.03 && safety <= 0.035) {
        safety_score = 90;
    } else {
        safety_score = 100;
    }

    //distance to U. of illinois
    var distance = arrayRentPlaces[index][10];
    var distance_score;
    if (distance <= 0.01) {
        distance_score = 100;

    } else if (distance > 0.01 && distance <= 0.02) {
        distance_score = 90;
    } else if (distance > 0.02 && distance <= 0.03) {
        distance_score = 80;
    } else if (distance > 0.03 && distance <= 0.04) {
        distance_score = 70;
    } else if (distance > 0.04 && distance <= 0.05) {
        distance_score = 60;
    } else if (distance > 0.06 && distance <= 0.08) {
        distance_score = 50;
    } else if (distance > 0.08 && distance <= 0.1) {
        distance_score = 40;
    } else if (distance > 0.1 && distance <= 0.12) {
        distance_score = 30;
    } else if (distance > 0.12 && distance <= 0.14) {
        distance_score = 20;
    } else {
        distance_score = 10;
    }

    //number of parks close to rental place
    var parks = arrayRentPlaces[index][11];
    var parks_score;
    if (parks <= 1) {
        parks_score = 10;

    } else if (parks > 1 && parks <= 3) {
        parks_score = 20;
    } else if (parks > 3 && parks <= 6) {
        parks_score = 30;
    } else if (parks > 6 && parks <= 10) {
        parks_score = 40;
    } else if (parks > 10 && parks <= 12) {
        parks_score = 50;
    } else if (parks > 12 && parks <= 14) {
        parks_score = 60;
    } else if (parks > 14 && parks <= 16) {
        parks_score = 70;
    } else if (parks > 16 && parks <= 18) {
        parks_score = 80;
    } else if (parks > 18 && parks <= 20) {
        parks_score = 90;
    } else {
        parks_score = 100;
    }

    //distance to nearest police station
    var station = arrayRentPlaces[index][12];
    var station_score;
    if (station <= 0.001) {
        station_score = 100;

    } else if (station > 0.001 && station <= 0.005) {
        station_score = 90;
    } else if (station > 0.005 && station <= 0.01) {
        station_score = 80;
    } else if (station > 0.01 && station <= 0.011) {
        station_score = 70;
    } else if (station > 0.011 && station <= 0.013) {
        station_score = 60;
    } else if (station > 0.013 && station <= 0.15) {
        station_score = 50;
    } else if (station > 0.015 && station <= 0.017) {
        station_score = 40;
    } else if (station > 0.017 && station <= 0.019) {
        station_score = 30;
    } else if (station > 0.019 && station <= 0.021) {
        station_score = 20;
    } else {
        station_score = 10;
    }

    //determine score for traffic speed around that area
    var speed_score;

    if (speed <= 15) {
        speed_score = 10;

    } else if (speed > 15 && speed <= 17) {
        speed_score = 20;
    } else if (speed > 17 && speed <= 19) {
        speed_score = 30;
    } else if (speed > 19 && speed <= 21) {
        speed_score = 40;
    } else if (speed > 21 && speed <= 23) {
        speed_score = 50;
    } else if (speed > 23 && speed <= 25) {
        speed_score = 60;
    } else if (speed > 25 && speed <= 27) {
        speed_score = 70;
    } else if (speed > 27 && speed <= 29) {
        speed_score = 80;
    } else if (speed > 29 && speed <= 33) {
        speed_score = 90;
    } else {
        speed_score = 100;
    }


    var total_score = ((price_score + area_score + safety_score + distance_score + parks_score + station_score + speed_score) / 7).toFixed(1);


    //Give a recommendation to the user, based on the total score

    var rec;

    if (total_score <= 30) {
        rec = "It does not seem like a suitable option for you!";

    } else if (total_score > 30 && total_score <= 40) {
        rec = "You could find sites with much more to offer!";
    } else if (total_score > 40 && total_score <= 50) {
        rec = "You can put it on your list, but you could look for more options!";
    } else if (total_score > 50 && total_score <= 60) {
        rec = "It could be a good choice, if you are not someone fussy!";
    } else if (total_score > 60 && total_score <= 70) {
        rec = "Not bad, it could be the place you're looking for!";
    } else if (total_score > 70 && total_score <= 80) {
        rec = "Is a great proposal, you should contact the site to make a decision!";
    } else if (total_score > 80 && total_score <= 90) {
        rec = "It is definitely a great place to live, you could enjoy your stay in Chicago too much!";
    } else {
        rec = "We don't want to pressure you, but it seems like the perfect place to live!";
    }

    document.getElementById('infosub').innerHTML = "<h1 class='infosub' id='infosub'> Address: <ad>" + arrayRentPlaces[index][3] + "</ad></h1>";

    document.getElementById('infosub1').innerHTML = "<h1 class='infosub' id='infosub'> Property Manager: <ad>" + arrayRentPlaces[index][2] + "</ad></h1>";

    document.getElementById('infosub2').innerHTML = "<h1 class='infosub' id='infosub'> Price: <ad><b> $</b>" + arrayRentPlaces[index][4] + "</ad></h1>";

    document.getElementById('infosub3').innerHTML = "<h1 class='infosub' id='infosub'> Area (Sqft): <ad>" + arrayRentPlaces[index][7] + "</ad></h1>";

    document.getElementById('infosub4').innerHTML = "<h1 class='infosub' id='infosub'> Distance to U. of Illinois: <ad>" + (arrayRentPlaces[index][10] * 100).toFixed(2) + " km" + "</ad></h1>";

    document.getElementById('infosub5').innerHTML = "<h1 class='infosub' id='infosub'> Parks near: <ad>" + arrayRentPlaces[index][11] + "</ad></h1>";

    document.getElementById('infosub6').innerHTML = "<h1 class='infosub' id='infosub'> Distance to nearest P. Station: <ad>" + (arrayRentPlaces[index][12] * 100).toFixed(2) + " km" + "</ad></h1>";

    document.getElementById('infosub7').innerHTML = "<h1 class='infosub' id='infosub'> Current Traffic Speed near: <ad>" + speed + " mph" + "</ad></h1>";

    document.getElementById('infosub8').innerHTML = "<h1 class='infosub' id='infosub'> CONTACT NUMBER: <ad>" + arrayRentPlaces[index][8] + "</ad></h1>";

    document.getElementById('infosub9').innerHTML = "<h1 class='infosub' id='infosub9'>" + rec + "</h1>";

    $("#info").attr("style", "display:block;");




    var bubbleChart = new d3.svg.BubbleChart({
        supportResponsive: true,

        size: 600,

        innerRadius: 600 / 3.5,

        radiusMin: 50,

        data: {
            items: [
                {
                    text: "Price",
                    count: price_score
                },
                {
                    text: "Bedrooms",
                    count: arrayRentPlaces[index][5]
                },
                {
                    text: "Baths",
                    count: arrayRentPlaces[index][6]
                },
                {
                    text: "Square Feet",
                    count: area_score
                },
                {
                    text: "Safety",
                    count: safety_score
                },
                {
                    text: "Distance to U. Illinois",
                    count: distance_score
                },
                {
                    text: "Parks",
                    count: parks_score
                },
                {
                    text: "Police Stations",
                    count: station_score
                }, {
                    text: "Near Traffic",
                    count: speed_score
                },
                {
                    text: "Total Score",
                    count: total_score
                },

      ],
            eval: function (item) {
                return item.count;
            },
            classed: function (item) {
                return item.text.split(" ").join("");
            }
        },
        plugins: [
            {
                name: "central-click",
                options: {
                    text: "(See more detail)",
                    style: {
                        "font-size": "12px",
                        "font-style": "italic",
                        "font-family": "MODERNE SANS",
                        "text-anchor": "middle",
                        "fill": "black"
                    },
                    attr: {
                        dy: "65px"
                    },
                    centralClick: function () {
                        alert("hi!!");
                    }
                }
      },
            {
                name: "lines",
                options: {
                    format: [
                        { // Line #0
                            textField: "count",
                            classed: {
                                count: true
                            },
                            style: {
                                "font-size": "28px",
                                "font-family": "MODERNE SANS",
                                "text-anchor": "middle",
                                fill: "black"
                            },
                            attr: {
                                dy: "0px",
                                x: function (d) {
                                    return d.cx;
                                },
                                y: function (d) {
                                    return d.cy;
                                }
                            }
            },
                        { // Line #1
                            textField: "text",
                            classed: {
                                text: true
                            },
                            style: {
                                "font-size": "12px",
                                "font-family": "MODERNE SANS",
                                "text-anchor": "middle",
                                fill: "black"
                            },
                            attr: {
                                dy: "20px",
                                x: function (d) {
                                    return d.cx;
                                },
                                y: function (d) {
                                    return d.cy;
                                }
                            }
            }
          ],
                    centralFormat: [
                        { // Line #0
                            style: {
                                "font-size": "50px"
                            },
                            attr: {}
            },
                        { // Line #1
                            style: {
                                "font-size": "30px"
                            },
                            attr: {
                                dy: "40px"
                            }
            }
          ]
                }
      }]
    });

    $("#bubble").attr("style", "display:block;");

    location.href = "index.html#info";
}

function changeBut(id) {

    var content = document.getElementById(id).innerHTML;

    if (content == "Search Random Place") {
        findPlace();
        document.getElementById(id).innerHTML = "Restart";

    } else {

        reFresh();

    }



}

function reFresh() {
    location.reload(true);
}