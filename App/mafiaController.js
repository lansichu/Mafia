angular.module("MafiaApp", ['ngMaterial','ngRoute']).config(function($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl : 'View/loginView.htm',
            controller : 'loginController'
        })
        .when("/lobby", {
            templateUrl : 'View/lobbyView.htm',
            controller : 'lobbyController'
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