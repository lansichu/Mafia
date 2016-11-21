angular.module("MafiaApp.lobby", [
    'ngMaterial',
    'ngRoute'
    ])
.controller('lobbyController', function($scope, $rootScope) {
            console.log($rootScope);
    })