'use strict';

/* Directives */

/*
Use an app-specific prefix for directives. This is useful for avoiding collisions with 3rd party components. 
On the subject of 3rd party components, there's a growing community site called ngmodules that looks promising.

For example, if your app is called "The Best Todo List App Ever," you might prefix your directives with "btla."

angular.module('yourAppDep').directive('btlaControlPanel', function () {
  // ...
});
*/

angular.module('WalkaboutSG.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
