angular.module("MafiaApp", ['ngMaterial']).controller('loginController', function($scope, $http, $mdToast) {
    $scope.callBackend = function () {
        console.log($scope.username);
        $http.get('http://localhost:3001/login?name=' + $scope.username).then(function (response) {
            $scope.showStatus = response.data;
            $mdToast.show(
                $mdToast.simple()
                    .textContent($scope.showStatus)
                    .hideDelay(3000)
            )
            if (response.data.success == true) {
                $location.path('/lobby');
            }
        })
    }
})

