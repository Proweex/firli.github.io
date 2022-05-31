// const testing = false;
// const testingEl1 = document.getElementById("testing1");
// const testingEl2 = document.getElementById("testing2");
// const latTest1 = -7.797068;
// const longTest1 = 110.370529;
// const latTest2 = -7.796000;
// const longTest2 = 110.370000;

const posEl = document.getElementById("position");
const startEl = document.getElementById("start-btn");
const stopEl = document.getElementById("stop-btn");
const contentEL = document.getElementById("content");
const warnEl = document.getElementById("warn");
const statEL = document.getElementById("status");
const distanceEL = document.getElementById("distance");

let watchID;
let distanceTravel = 0;
let stopTracking = true;
let posLat = Array();
let posLong =  Array();

let test2 = 2;
// let test3 = new Array("purple", "blue", "red");
// console.log(test2.at(-2)+"---"+test3.at(-2));
// test2 += distance(latTest1, longTest1, latTest2, longTest2);
// console.log(test2);

if ('geolocation' in navigator) {
// if (testing){
    stopEl.disabled = true;
} else {
    contentEL.classList.add("removed");
    startEl.disabled = true;
    stopEl.disabled = true;
    warnEl.textContent = "Browser does not support the Geolocation API";
}

function startTrack(){
    console.log("Starting...");
    startEl.disabled = true;
    stopEl.disabled = false;

    stopTracking = false;
    watchID = navigator.geolocation.watchPosition((position) => { 
        success(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
    }, showError);
}

function stopTrack(){
    console.log("Stopped..")
    startEl.disabled = false;
    stopEl.disabled = true;

    stopTracking = true;
    navigator.geolocation.clearWatch(watchID);
    watchID = null;
    statEL.textContent = "";
    distanceEL.textContent = distanceTravel + " km";
}

function success(latitude, longitude, accuracy){
    console.log("Tracking")

    if (posLat.at(-1) != latitude || posLong.at(-1) != longitude){ 
        posLat.push(latitude);
        posLong.push(longitude);
        
        // console.log(posLat + "----" + posLong);
        if (posLat.length > 5){
            distanceTravel += distance(posLat.at(-5), posLong.at(-5), posLat.at(-1), posLong.at(-1))
            // distanceEL.textContent = distanceTravel;
        }
        
    }

    statEL.textContent = "Tracking";
    distanceEL.textContent = distanceTravel + " km";
    posEl.innerHTML += `X - ${latitude} ${longitude} ${accuracy} m <br>`;
    navigator.geolocation.getCurrentPosition(successs, error, options);
    // console.log(posLat);
}

// code by https://stackoverflow.com/a/21623206
function distance(lat1, lon1, lat2, lon2) {
    var p = Math.PI;    //0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

// code by https://stackoverflow.com/a/14862073
function showError(error){
    contentEL.classList.add("removed");
    startEl.disabled = true;
    stopEl.disabled = true;
    switch(error.code) {
        case error.PERMISSION_DENIED:
            statEL.textContent = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            statEL.textContent = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            statEL.textContent = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            statEL.textContent = "An unknown error occurred."
            break;
      }
}

// testing ===================================
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function successs(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    posEl.innerHTML += `O - ${crd.latitude} ${crd.longitude} ${crd.accuracy} m<br>`;
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

// navigator.geolocation.getCurrentPosition(success, error, options);
// testing end ===================================