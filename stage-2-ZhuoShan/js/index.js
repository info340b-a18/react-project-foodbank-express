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
    document.querySelector('#help-message').innerHTML = '';
    let message = $("<p></p>").text('*Click on pins to see more details or submit again.');
    $("#help-message").append(message);
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

//Fetch user's geolocation and nearby foodbank results based on the radius chosen
//by using Google Map API amd Places library.
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

//Update and store user's geolocation.
function updateUserGeo(geoInfo) {
  state.userInfo.geoLocation = {'lat':geoInfo.lat, 'lng':geoInfo.lng};
}

//Fetch nearby food bank information.
function getNearbyFoodbank() {
  let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+state.userInfo.geoLocation.lat+","+state.userInfo.geoLocation.lng+"&radius="+(state.userInfo.radius*1609.344)+"&keyword=foodbank&key=AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE"
  return fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          myJson.results.forEach(element => {
            let url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + element.place_id + "&fields=opening_hours,formatted_phone_number&key=AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE";
            let hours, phone = "";
            return fetch(url)
                  .then(function(response) {
                    return response.json();
                  })
                  .then(function(myJson) {
                    try {
                      hours = myJson.result.opening_hours.weekday_text;
                    } catch(exception) {
                      hours = "";
                    }
                    phone = myJson.result.formatted_phone_number;
                  }).then(function() {
                    state.foodbankList.push({'name':element.name, 'lat':element.geometry.location.lat, 'lng':element.geometry.location.lng, 'place_id':element.place_id, 'address':element.vicinity
                    , 'hours':hours, 'phone':phone});
                    addMarker();
                  });
        });
  });
}

// Add marker on the map by using Google Map API.
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
    let hoursContent = '<b>Opening Hours: </b><br>';
    if (element.hours != '') {
      element.hours.forEach(day => {
        hoursContent = hoursContent + day + '<br>';
      });
    } else {
      hoursContent = '';
    }
    let contentString = '<h1 id="markerHead">'+element.name+'</h1>'+
    '<p id="markerAddress"><b>Address: </b>'+element.address+ 
    '<br><b>Contact: </b>'+element.phone+'<br>';
    contentString = contentString + hoursContent + '</p>';
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

