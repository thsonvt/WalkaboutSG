'use strict';

/* Controllers */
/*
By convention, controller names should start with a capital letter and end with "Ctrl".
angular.module('yourAppDep').controller('MyCtrl', function () {
  // ...
});
Remember that controllers can be reused. This seems obvious, but I've caught myself reimplementing features 
in different controllers. For example, consider a user control panel that allows a user to change application 
settings and a dialog box prompting a user to change a setting. Both could share a common controller
*/

(function () {
	var module = angular.module("WalkaboutSG.controllers", ["google-maps", "ngResource", "ui"]);
}());


function MyCtrl1() {

}
function MyCtrl2() {

}	


angular.module('maptesting', ['ui']);

var image = 'http://i.stack.imgur.com/orZ4x.png';

function MapCtrl($scope, $http, UserService) {
    var ll = new google.maps.LatLng(1.293509, 103.85229);
    // var ll;

  // Try HTML5 geolocation
  // if(navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     ll = new google.maps.LatLng(position.coords.latitude,
  //                                      position.coords.longitude);

  //     // var infowindow = new google.maps.InfoWindow({
  //     //   map: map,
  //     //   position: pos,
  //     //   content: 'You are here!'
  //     // });

  //     // map.setCenter(pos);
  //   }, function() {
  //     // handleNoGeolocation(true);
  //   });  
  // } 
  // else {
  //   // Browser doesn't support Geolocation
  //   // handleNoGeolocation(false);
  //   // alert('Browser does not support Geolocation');
  //   ll = new google.maps.LatLng(1.293509, 103.85229);
  // }


    $scope.mapOptions = {
        center: ll,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

     $scope.centerProperty = {
         lat: ll.latitude,
         lng: ll.longitude
     };    

     // the initial zoom level of the map
     $scope.zoomProperty= 14;             

    var markerArr = [];

    $http.get('search.php').success(function(data) {
        
        for (var i = 0; i < data.length; i++) {
            var object = data[i];
            
            var geo = new google.maps.LatLng(object['lat'], object['lng']);
            
            var company = {title: object['title'], desc: object['description'], 
            url: object['uri'], address: object['address'], special_note: object['special_note'],
            hiring_note: object['hiring_note'], open_hours: object['open_hours'], logo: object['logo']};

            var marker = new google.maps.Marker({
                                map: $scope.myMap,
                                position: geo,
                                company: company
                        });

            markerArr.push(marker);
        }
        $scope.myMarkers = markerArr;
    });    

    // $scope.walkaboutNeighborhoods = [
    //     { name: 'Clementi', value: 'Clementi' }, 
    //     { name: 'Tanjong Pagar', value: 'Tanjong Pagar' }, 
    //     { name: 'Raffles Place', value: 'Raffles Place' },
    //     { name: 'Clarke Quay', value: 'Clarke Quay' },
    //     { name: 'China Town', value: 'China Town' },
    //     { name: 'Orchard', value: 'Orchard' },
    //     { name: 'Bugis', value: 'Bugis' }
    // ]; 

    var neighborhoodArr = [];

    $http.get('neighborhood.php').success(function(data) {
        
        for (var i = 0; i < data.length; i++) {
            var object = data[i];
            
            var geo = new google.maps.LatLng(object['lat'], object['lng']);
            
            var neighborhood = {id: object['id'], name: object['name'], count: object['count'], location: geo};

            neighborhoodArr.push(neighborhood);
        }
        $scope.walkaboutNeighborhoods = neighborhoodArr;
    });        

    //Markers should be added after map is loaded
    $scope.onMapIdle = function() {
        $scope.myMarkers = markerArr;     
    };

    $scope.onMapLoad = function() {

        // Try HTML5 geolocation
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);

          
          // http://www.robotwoods.com/dev/misc/bluecircle.png
          // var marker = new google.maps.Marker({
          //         position: pos,
          //         map: map,
          //         icon: image
          //     });  
          // marker.setMap(map);

          var marker = new google.maps.Marker({
                position: pos, 
                map: $scope.myMap, 
                title:'Your are here!',
                icon: image
            });

            $scope.myMap.setCenter(pos);
          }, function() {
            // handleNoGeolocation(true);
          });  
        }         
    };    

    $scope.openMarkerInfo = function(marker) {
      // $scope.currentMarker = marker;
      // $scope.currentMarkerLat = marker.getPosition().lat();
      // $scope.currentMarkerLng = marker.getPosition().lng();
      $scope.company = marker.company;
      $scope.myInfoWindow.open($scope.myMap, marker);
    };   

    $scope.panTo = function(neighborhood) {

        // var image = 'http://i.stack.imgur.com/orZ4x.png';
        var marker = new google.maps.Marker({
                position: neighborhood.location,
                map: $scope.myMap,
                title: neighborhood.name,
                icon: image
            });  
      // var markers = $scope.myMarkers;
      // var markerArr = [];
      // for(var i=0; i<markers.length; i++){
      //   var company = markers[i].company;
      //   if (company.neighborhoodId == neighborhood.id){
      //     markerArr.push(markers[i]);
      //   }
      // }
      $scope.myMap.setZoom(16);
      $scope.zoomProperty=16;
      $scope.myMap.setCenter(neighborhood.location);
    };        

}

function WalkaboutListCtrl($scope,$http, UserService) {
    $http.get('search.php').success(function(data) {
        $scope.walkabouts = data;
    });
}
