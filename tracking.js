// const testing = false;

const posEl = document.getElementById("position");
const startEl = document.getElementById("start-btn");
const stopEl = document.getElementById("stop-btn");
const contentEL = document.getElementById("content");
const warnEl = document.getElementById("warn");
const geo = navigator.geolocation;

let posLat = Array();
let posLong = Array();
let posList = Array();

if ('geolocation' in navigator) {
// if (testing){
    // warnEl.textContent = "enable";
} else {
    contentEL.classList.add("removed");
    startEl.disabled = true;
    stopEl.disabled = true;
    warnEl.textContent = "feature is not supported";
}

function startTrack(){
    console.log("Starting...")
    geo.watchPosition((position) => {
        doSomething(position.coords.latitude, position.coords.longitude);
      });
}

function stopTrack(){
    console.log("Stopped..")
    navigator.geolocation.clearWatch(geo);
    posList.forEach(element => {
        posEl.innerHTML = element + "<br>";
    });
}

function doSomething(latitude, longitude){
    posLat.push(latitude);
    posLong.push(longitude);

    posList.push(latitude + " " + longitude);
}