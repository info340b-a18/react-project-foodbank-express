'use strict';

//This variable represents the current state of the program
//It keeps track of current user information and scheduled tasks
let state = {
  userInfo: {},
  scheduleList: [],
};


//Add an event listener to the 'submit' button
//When the button is clicked, the userInfo in the state will be updated.
let submitUserInfo = document.querySelector('#submit-button');
submitUserInfo.addEventListener('click', function() {
  let addressInput = document.querySelector('#address-input').value;
  let city = document.querySelector('#city-input').value;
  let addressState = document.querySelector('#state-input').value;
  let date = document.querySelector('#date-input').value;
  let time = document.querySelector('#time-input').value;
  if (addressInput == "" || city == "" || addressState == "" || date == "" || time == "") {
    renderError(new Error("Fill in all fields!"));
  } else {
    document.querySelector('#error-display').innerHTML = '';
    console.log('clik');
    state.userInfo = {'address':addressInput, 'city':city, 'state':addressState, 
    'date':date, 'time':time};
    getUserGeoLocation(addressInput);
  }
});

//Error handling method.
//Will display error message if called
function renderError(error) {
  document.querySelector('#error-display').innerHTML = '';
  console.log('render');
  let errorMessage = $("<p></p>").text(error.message);
  errorMessage.addClass("alert alert-danger");
  $("#error-display").append(errorMessage);
}

//Initialize map display and load Seattle's map in the webpage
let map = new google.maps.Map(document.getElementById('app-map'), {
    zoom:11,
    center:{lat:47.6062, lng:-122.3321}
});

function getUserGeoLocation(address) {
  let addressArray = address.split(" ");
  let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressArray[0] + "+" + ",+Seattle,+WA&key=AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE";
  let position = 58;
  let curPosition = position+(addressArray[0].length)+1;
  for(let i = 1; i < addressArray.length-1; i++) {
    url = [url.slice(0, curPosition), addressArray[i]+"+", url.slice(curPosition)].join("");
    curPosition = curPosition+(addressArray[i].length)+1;
    position = curPosition;
  }
  url = [url.slice(0, position), addressArray[addressArray.length-1], url.slice(position)].join("");
  state.userInfo.url = url;
  return fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          //document.querySelector('#error-display').innerHTML = '';
          console.log(JSON.stringify(myJson));
          console.log('fetch');
          updateUserGeo(myJson.results[0].geometry.location);
        })
        .catch(renderError(new Error("Input valid address!")));
}
//let request = {}
function updateUserGeo(geoInfo) {
  state.userInfo.geoLocation = {'lat':geoInfo.lat, 'lng':geoInfo.lng};
}
//Toggle between showing and hiding the navigation menu links 
//when the user clicks on the hamburger menu / bar icon 
function mobileMenu() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

