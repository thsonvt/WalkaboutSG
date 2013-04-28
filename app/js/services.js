'use strict';

/* Services */

/*
angular.module('yourAppDep').service('MyCtrl', function () {
  // ...
});
*/

var Afa = {};
Afa.Observable = function()
{
    this._listeners = {};
}

Afa.Observable.prototype =
{
    on: function(eventName, callback)
    {
        if (!this._listeners[eventName])
        {
            this._listeners[eventName] = [];
        }

        this._listeners[eventName].push(callback);
    }
}


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('WalkaboutSG.services', []).
  // value('version', '0.1');
  	factory('UserService', function(){
    	return Afa.Observable({});
	});

// angular.service('Walkabout', function ($resource) {
//     return $resource('api/walkabouts/:id', {}, {
//         update: {method:'PUT'}
//     });
// });

// angular.service('Walkabout', function ($resource) {
//     return $resource('api/walkabouts/:id', {}, {
//         update: {method:'PUT'}
//     });
// });