// Define the `divvyMapApp` module
var divvyMapApp = angular.module('divvyMapApp', []);

// Define the `DivvyMapAppController` controller on the `divvyMapApp` module
divvyMapApp.controller('divvyMapController', function DivvyMapAppController($scope, $http) {
  	$http({
			method : 'GET',
			url : 'http://localhost:8080/stations'
		}).success(function(data, status, headers, config) {
			$scope.stations = data;
		}).error(function(data, status, headers, config) {
			alert( "failure");
		});
});