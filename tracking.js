// const testing = false;
const testingEl1 = document.getElementById("testingPush");
const testingEl2 = document.getElementById("testingSkip");

const posEl = document.getElementById("position");
const startEl = document.getElementById("start-btn");
const stopEl = document.getElementById("stop-btn");
const contentEL = document.getElementById("content");
const warnEl = document.getElementById("warn");
const statEL = document.getElementById("status");
const distanceEL = document.getElementById("distance");

let watchID, distanceTravel;
let stopTracking = true;
let posLat = Array();
let posLong =  Array();

// let test2 = new Array(1,2);
// let test3 = new Array("purple", "blue", "red");
// console.log(test2.at(-2)+"---"+test3.at(-2));

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
        doSomething(position.coords.latitude, position.coords.longitude);
    });
}

function stopTrack(){
    console.log("Stopped..")
    startEl.disabled = false;
    stopEl.disabled = true;

    stopTracking = true;
    navigator.geolocation.clearWatch(watchID);
    watchID = null;
    statEL.textContent = "";
    distanceEL.textContent = "distance";

    //testing start ==================================================
    testingEl1.classList.add("removed");
    testingEl2.classList.add("removed");
    //testing end ==================================================
}

function doSomething(latitude, longitude){
    console.log("Tracking")

    if (posLat.at(-1) != latitude || posLong.at(-1) != longitude){ 
        posLat.push(latitude);
        posLong.push(longitude);

        //testing start ==================================================
        console.log("pushed");
        
        testingEl1.classList.remove("removed")
    
        testingEl2.classList.add("removed");
        
        //testing end ====================================================

        
        // console.log(posLat + "----" + posLong);
        distanceTravel += distance(posLat.at(-2), posLong.at(-2), posLat.at(-1), posLong.at(-1))
        distanceEL.textContent = distanceTravel;
        
    }else{
        //testing start ==================================================
        console.log("skipped");
        
        testingEl2.classList.remove("removed");
        testingEl1.classList.add("removed");
        
        //testing end ====================================================
    }

    statEL.textContent = "Tracking";
    // posEl.innerHTML += latitude + " " + longitude + "<br>";
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