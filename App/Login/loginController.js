angular.module("MafiaApp.login", [
    'ngMaterial',
    'ngRoute'
    ])
.controller('loginController', function($scope, $http, $mdToast, $location, $rootScope) {
        $scope.callBackend = function () {
            $rootScope.userName = $scope.username;
            $http.get('http://localhost:8080/login?name=' + $scope.username).then(function (response) {
                $scope.showStatus = response.data;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent($scope.showStatus.message)
                        .hideDelay(3000)
                )
                if (response.data.success == true) {
                    console.log()
                    $location.path('lobby');
                }
            })
        }
    })