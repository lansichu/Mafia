angular.module("MafiaApp", ['ngMaterial','ngRoute']).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : 'Login/loginView.htm',
            controller : 'Login/loginController'
        })
        .when("/lobby", {
            templateUrl : 'Lobby/lobbyView.htm',
            controller : 'Lobby/lobbyController'
        })
})
    .controller('loginController', function($scope, $http, $mdToast, $location) {
        $scope.callBackend = function () {
            console.log($scope.username);
            $http.get('http://localhost:3001/login?name=' + $scope.username).then(function (response) {
                $scope.showStatus = response.data;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent($scope.showStatus.message)
                        .hideDelay(3000)
                )
                if (response.data.success == true) {
                    console.log()
                    $location.path('/lobby');
                }
            })
        }
    })

    //.controller('lobbyController', function($scope, $http, $location) {
    //    $scope.goBack = function () {
    //        $http.get('http://localhost:3001/').then(function (response) {
    //            $scope.showStatus = response.data;
    //                $location.path('/lobby');
    //        })
    //    }
    //})