angular.module("MafiaApp.role", [
    'ngMaterial',
    'ngRoute'
])

    .controller('roleController', function($scope, $mdDialog, $location, $http, $rootScope) {
        $scope.picture = "https://radio.adelaide.edu.au/wp-content/uploads/2016/03/mafia.jpg";
        var clicked = false;
        $scope.roleStatus = "Show Role"
        $scope.showRole = function () {
            if (!clicked) {
                $scope.roleStatus = "Hide Role"
                $scope.picture = "http://previews.123rf.com/images/artenot/artenot1204/artenot120400769/13429224-funny-cartoon-farmer-Stock-Vector-peasant.jpg";
            } else {
                $scope.roleStatus = "Show Role"
                $scope.picture = "https://radio.adelaide.edu.au/wp-content/uploads/2016/03/mafia.jpg";
            }
            clicked = !clicked;
        }
    });

