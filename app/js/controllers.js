'use strict';

/* Controllers */


(function () {
	var module = angular.module("WalkaboutSG.controllers", ["google-maps"]);
}());

function MyCtrl1() {

}
function MyCtrl2() {

}	
function MapCtrl($scope) {
	
	angular.extend($scope, {
		
		/** the initial center of the map */
		centerProperty: {
			lat: 1.293509,
			lng: 103.85229
		},
		
		/** the initial zoom level of the map */
		zoomProperty: 14,
		
		/** list of markers to put in the map */
		markersProperty: [ {
				latitude: 1.293509,
				longitude: 103.85229
			}],

        walkaboutNeighborhoods : [
            { name: 'Clementi', value: 'Clementi' }, 
            { name: 'Tanjong Pagar', value: 'Tanjong Pagar' }, 
            { name: 'Raffles Place', value: 'Raffles Place' },
            { name: 'Clarke Quay', value: 'Clarke Quay' },
            { name: 'China Town', value: 'China Town' },
            { name: 'Orchard', value: 'Orchard' },
            { name: 'Bugis', value: 'Bugis' }
        ],			
		
		// These 2 properties will be set when clicking on the map
		clickedLatitudeProperty: null,	
		clickedLongitudeProperty: null,
	});
}