// const testing = false;

const posEl = document.getElementById("position");
const startEl = document.getElementById("start-btn");
const stopEl = document.getElementById("stop-btn");
const contentEL = document.getElementById("content");
const warnEl = document.getElementById("warn");
const statEL = document.getElementById("status");

const geoID = navigator.geolocation;


let posLat = Array();
let posLong = Array();
let posList = Array();

let stopTracking = true;

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
    geoID.watchPosition((position) => { 
        doSomething(position.coords.latitude, position.coords.longitude);
    });
}

function stopTrack(){
    console.log("Stopped..")
    startEl.disabled = false;
    stopEl.disabled = true;

    stopTracking = true;
    navigator.geolocation.clearWatch(geoID);
    statEL.textContent = "";
}

function doSomething(latitude, longitude){
    console.log("Tracking")
    posLat.push(latitude);
    posLong.push(longitude);
    statEL.textContent = "Tracking";
    posEl.innerHTML += latitude + " " + longitude + "<br>";
}