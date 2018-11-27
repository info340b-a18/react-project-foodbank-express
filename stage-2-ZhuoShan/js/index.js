'use strict';

//This variable represents the current state of the program
//It keeps track of current user information and scheduled tasks
let state = {
  userInfo: {},
  foodbankList: [],
};


//Add an event listener to the 'submit' button
//When the button is clicked, the userInfo in the state will be updated.
let submitUserInfo = document.querySelector('#submit-button');
submitUserInfo.addEventListener('click', function() {
  let addressInput = document.querySelector('#address-input').value;
  let radius = document.querySelector('#radius-input').value;
  if (addressInput == "" || radius == "") {
    renderError(new Error("Fill in all fields!"));
  } else {
    document.querySelector('#error-display').innerHTML = '';
    state.userInfo = {'address':addressInput, 'radius':radius};
    getUserAndBankLocation(addressInput);
  }
});

//Error handling method.
//Will display error message if called
function renderError(error) {
  document.querySelector('#error-display').innerHTML = '';
  let errorMessage = $("<p></p>").text(error.message);
  errorMessage.addClass("alert alert-danger");
  $("#error-display").append(errorMessage);
}

//Initialize map display and load Seattle's map in the webpage
let map = new google.maps.Map(document.getElementById('app-map'), {
    zoom:8,
    center:{lat:47.6062, lng:-122.3321}
});

function getUserAndBankLocation(address) {
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
          updateUserGeo(myJson.results[0].geometry.location);
          getNearbyFoodbank();
        });
        
}
//let request = {}
function updateUserGeo(geoInfo) {
  state.userInfo.geoLocation = {'lat':geoInfo.lat, 'lng':geoInfo.lng};
}

function getNearbyFoodbank() {
  let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+state.userInfo.geoLocation.lat+","+state.userInfo.geoLocation.lng+"&radius="+(state.userInfo.radius*1609.344)+"&keyword=foodbank&key=AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE"
  return fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          //document.querySelector('#error-display').innerHTML = '';
          //console.log(JSON.stringify(myJson));
          //updateUserGeo(myJson.results[0].geometry.location);
          myJson.results.forEach(element => {
            state.foodbankList.push({'name':element.name, 'lat':element.geometry.location.lat, 'lng':element.geometry.location.lng, 'place_id':element.place_id, 'address':element.vicinity});
            addMarker();
          });
        });

}

function addMarker() {
  let newMap = new google.maps.Map(document.getElementById('app-map'), {
    zoom:12,
    center:{lat:state.userInfo.geoLocation.lat, lng:state.userInfo.geoLocation.lng},
  });
  let marker = new google.maps.Marker({
    position:{lat:state.userInfo.geoLocation.lat, lng:state.userInfo.geoLocation.lng},
    icon: "img/blueDot.png",
    map:newMap
  });
  state.foodbankList.forEach(element => {
    let marker = new google.maps.Marker({
      position:{lat:element.lat, lng:element.lng}, 
      map:newMap
    });
    let contentString = '<h1 id="markerHead">'+element.name+'</h1>'+
    '<p id="markerAddress"><b>Address</b>'+element.address+'<p>';
    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
    });
  
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

