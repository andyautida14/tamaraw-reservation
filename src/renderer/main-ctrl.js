'use strict';

angular.module("app")
.controller("main", function($scope, $log, Tour) {
	Tour.all
	.then(function(tours) {
		$scope.tours = tours;
	})
	.catch(function(reason) {
		$log.error(reason);
	});
});