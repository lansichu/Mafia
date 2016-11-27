angular.module("MafiaApp.login", [
    'ngMaterial',
    'ngRoute'
    ])

.controller('loginController', function($scope, $http, $mdToast, $location, $rootScope, $mdDialog) {

    $scope.resetGame = function(){
        $http.get('reset').then(function (response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(response.data.resetMessage)
                    .hideDelay(3000)
            )
        })
    }

    $scope.callBackend = function () {
        if($scope.username){
            $rootScope.userName = $scope.username;
            $http.get('login?name=' + $scope.username).then(function (response) {
                $scope.showStatus = response.data;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent($scope.showStatus.message)
                        .hideDelay(3000)
                )

                if (response.data.success == true) {
                    console.log();
                    $location.path('lobby');
                    socket.emit('player', $scope.username);
                }
            })
        }else{
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Invalid name')
                .textContent('Please choose a name with 4 to 10 characters!')
                .ok("OK I'm gunna choose another name")
            );
        }
    }
});