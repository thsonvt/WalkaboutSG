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

// function MapCtrl($scope, UserService) {
// 	angular.extend($scope, {
		
// 		// the initial center of the map 
// 		centerProperty: {
// 			lat: 1.293509,
// 			lng: 103.85229
// 		},
		
// 		// the initial zoom level of the map
// 		zoomProperty: 14,
		
// 		// list of markers to put in the map
// 		markersProperty: [ {
// 				latitude: 1.293509,
// 				longitude: 103.85229
// 			}],

//         walkaboutNeighborhoods : [
//             { name: 'Clementi', value: 'Clementi' }, 
//             { name: 'Tanjong Pagar', value: 'Tanjong Pagar' }, 
//             { name: 'Raffles Place', value: 'Raffles Place' },
//             { name: 'Clarke Quay', value: 'Clarke Quay' },
//             { name: 'China Town', value: 'China Town' },
//             { name: 'Orchard', value: 'Orchard' },
//             { name: 'Bugis', value: 'Bugis' }
//         ],			
		
// 		// These 2 properties will be set when clicking on the map
// 		clickedLatitudeProperty: null,	
// 		clickedLongitudeProperty: null,
// 	});        
// }

/////////// WORKING CODE
// function MapCtrl($scope, UserService) {	
		
// 		// the initial center of the map 
// 		$scope.centerProperty = {
// 			lat: 1.293509,
// 			lng: 103.85229
// 		};
		
// 		// the initial zoom level of the map
// 		$scope.zoomProperty= 14;
		
// 		// list of markers to put in the map
// 		$scope.markersProperty= [ {
// 				latitude: 1.293509,
// 				longitude: 103.85229
// 			}];

//         $scope.walkaboutNeighborhoods = [
//             { name: 'Clementi', value: 'Clementi' }, 
//             { name: 'Tanjong Pagar', value: 'Tanjong Pagar' }, 
//             { name: 'Raffles Place', value: 'Raffles Place' },
//             { name: 'Clarke Quay', value: 'Clarke Quay' },
//             { name: 'China Town', value: 'China Town' },
//             { name: 'Orchard', value: 'Orchard' },
//             { name: 'Bugis', value: 'Bugis' }
//         ];		
		
// 		// These 2 properties will be set when clicking on the map
// 		$scope.clickedLatitudeProperty= null;
// 		$scope.clickedLongitudeProperty= null;     
// }

function MapCtrl($scope, $http, UserService) {	

	    var ll = new google.maps.LatLng(1.293509, 103.85229);
		
		// the initial center of the map 
		$scope.centerProperty = {
			lat: 1.293509,
			lng: 103.85229
		};
		
		// the initial zoom level of the map
		$scope.zoomProperty= 14;
		
		// list of markers to put in the map
		// $scope.markersProperty= [ {
		// 		latitude: 1.293509,
		// 		longitude: 103.85229
		// 	}];

		$http.get('search.php').success(function(data) {
	        var geoArr = [];
	        for (var i = 0; i < data.length; i++) {
			    var object = data[i];
			    geoArr.push({latitude: object['lat'], longitude: object['lng']});
			}
			$scope.markersProperty = geoArr;
		 });			

        $scope.walkaboutNeighborhoods = [
            { name: 'Clementi', value: 'Clementi' }, 
            { name: 'Tanjong Pagar', value: 'Tanjong Pagar' }, 
            { name: 'Raffles Place', value: 'Raffles Place' },
            { name: 'Clarke Quay', value: 'Clarke Quay' },
            { name: 'China Town', value: 'China Town' },
            { name: 'Orchard', value: 'Orchard' },
            { name: 'Bugis', value: 'Bugis' }
        ];		
		
		// These 2 properties will be set when clicking on the map
		$scope.clickedLatitudeProperty= null;
		$scope.clickedLongitudeProperty= null;    

	    //Markers should be added after map is loaded
	    $scope.onMapIdle = function() {
	        var marker = new google.maps.Marker({
	            map: $scope.myMap,
	            position: ll
	        });
	        $scope.myMarkers = [marker, ];
	    };

	    $scope.markerClicked = function(m) {
	        window.alert("clicked");
	    };		 
}

function WalkaboutListCtrl($scope,$http, UserService) {
    $http.get('search.php').success(function(data) {
    	for (var i = 0; i < data.length; i++) {
		    var object = data[i];
		    for (var property in object) {
		        alert('item ' + i + ': ' + property + '=' + object[property]);
		    }
		    // If property names are known beforehand, you can also just do e.g.
		    // alert(object.id + ',' + object.Title);
		}

        $scope.walkabouts = data;
    });
}

// function MapCtrl($scope, UserService) {
//     var ll = new google.maps.LatLng(1.293509, 103.85229);
//     $scope.mapOptions = {
//         center: ll,
//         zoom: 15,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     };

// 	$scope.walkaboutNeighborhoods = [
//             { name: 'Clementi', value: 'Clementi' }, 
//             { name: 'Tanjong Pagar', value: 'Tanjong Pagar' }, 
//             { name: 'Raffles Place', value: 'Raffles Place' },
//             { name: 'Clarke Quay', value: 'Clarke Quay' },
//             { name: 'China Town', value: 'China Town' },
//             { name: 'Orchard', value: 'Orchard' },
//             { name: 'Bugis', value: 'Bugis' }
//     ];

//     //Markers should be added after map is loaded
//     $scope.onMapIdle = function() {
//         var marker = new google.maps.Marker({
//             map: $scope.myMap,
//             position: ll
//         });
//         $scope.myMarkers = [marker, ];
//     };

//     $scope.markerClicked = function(m) {
//         window.alert("clicked");
//     };
// }​



