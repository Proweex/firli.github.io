// forms
const namaMotor_in = document.getElementById("nama_motor");
const kmNumber_in = document.getElementById("km_number");

// buttons
const showBtn = document.getElementById("showBtn");
const input_dataBtn = document.getElementById("input_dataBtn");
const delete_allBtn = document.getElementById("delete_allBtn");

// divs
const kosong = document.getElementById("kosong");
const list_motor = document.getElementById("list_motor");

// data
var toStringify = [];
var motorList = JSON.parse(localStorage.getItem("motors"));

// List all available motor data
showMotorList();

showBtn.addEventListener("click", function() {
    console.log("show button");
    hide_id("cookie_prompt");
    show_id("kosong");

    // call to save to storage
    saveToStorage(namaMotor_in.value, kmNumber_in.value);

    //call to show to element list_motor
    addToElement(namaMotor_in.value, kmNumber_in.value);
    
    // empty form
    namaMotor_in.value = '';
    kmNumber_in.value = '';
});

input_dataBtn.addEventListener("click", function () {
    console.log("input data button");

    hide_id("kosong");
    show_id("cookie_prompt");
})


delete_allBtn.addEventListener("click", function () {
    console.log("delete all button");

    localStorage.clear();
    list_motor.textContent = '';
    showMotorList();
});


// functions

function show_id(el){
    // let = el;
    document.getElementById(el).classList.add("show");
    document.getElementById(el).classList.remove("hide");
}

function hide_id(el){
    // let = el;
    document.getElementById(el).classList.add("hide");
    document.getElementById(el).classList.remove("show");
}

function showMotorList() {
      
    motorList = JSON.parse(localStorage.getItem("motors"));
    
    // clear field
    // list_motor.textContent='';

    for (item in motorList) {
        list_motor.innerHTML += `<li> ${motorList[item][0]} : ${motorList[item][1]} km </li>`;
        //      console.log(`${key} : ${value}`);
        // console.log(motorList[item]);
    }
    console.log("showMotorList");
}

function saveToStorage(key, value){

    for (i in motorList) {
        toStringify.push(motorList[i]);
    }
    toStringify.push([key,value]);

    localStorage.setItem("motors", JSON.stringify(toStringify));

    console.log("saveToStorage");
}

function addToElement(motor, km) {
    list_motor.innerHTML += `<li> ${motor} : ${km} km </li>`;

    console.log("addToElemen");
}