'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('HomeCtrl', function ($scope, filtersFact, uiGmapGoogleMapApi) {
    $scope.map = { center: { latitude: -35.6090313, longitude: -68.8358146 }, zoom: 4 };
    uiGmapGoogleMapApi.then(function (maps) {
      debugger
    })
    filtersFact.regions().then(function successCallback(response) {
      $scope.regions =  response.data
      }, function errorCallback(response) {
        console.log("error")
        $scope.regions = []
      });

    $scope.getCommunes = function () {
      $scope.commune_id = ""
      filtersFact.communes($scope.region_id).then(function successCallback(response) {
          $scope.communes =  response.data
        }, function errorCallback(response) {
          console.log("error")
          $scope.communes = []
        });
    }

    $scope.getMiningWastes = function () {
      filtersFact.miningWastes($scope.region_id, $scope.commune_id).then(function successCallback(response){
        $scope.mining_wastes = response.data
      }, function errorCallback (response) {
        console.log("error")
        $scope.mining_wastes = []
      });
    }

    $scope.mapFitBounds = function (argument) {
      debugger
      var bounds = new maps.LatLngBounds();
      for (var i in markers) // your marker list here
          bounds.extend(markers[i].position) // your marker position, must be a LatLng instance

      map.fitBounds(bounds);
    }

  });
