// Define the `divvyMapApp` module
var divvyMapApp = angular.module('divvyMapApp', ['uiGmapgoogle-maps']);

// Define the `DivvyMapAppController` controller on the `divvyMapApp` module
divvyMapApp.controller('divvyMapController', function DivvyMapAppController($scope, $http) {
  	$scope.map = { center: { latitude: 41.9105, longitude: -87.6531 }, zoom: 13 };
  	$scope.windowOptions = {
            visible: false
        };

    $scope.onClick = function() {
            $scope.windowOptions.visible = !$scope.windowOptions.visible;
        };
	$scope.closeClick = function() {
            $scope.windowOptions.visible = false;
        };
  	$http({
			// Node
			// method : 'PUT',
			// url : 'http://localhost:3000/stations'

			//Rails
			method : "GET",
			url : 'http://localhost:3000/stations'
		}).success(function(data, status, headers, config) {
			$scope.stations = data;
		}).error(function(data, status, headers, config) {
			alert( "failure");
		});
});