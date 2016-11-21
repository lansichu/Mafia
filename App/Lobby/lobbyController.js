angular.module("MafiaApp.lobby", [
    'ngMaterial',
    'ngRoute'
    ])

.controller('lobbyController', function($scope, $mdDialog, $location, $http) {
    $scope.status = '  ';
    $scope.customFullscreen = false;
            console.log("That's the lobby!");
    $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to exit the game?')
            .textContent('Mafia has destroyed you.')
            .ariaLabel('Decision Time')
            .targetEvent(ev)
            .ok('Get me out of here.')
            .cancel('Keep me in!');


        $mdDialog.show(confirm).then(function() {
            $http.get('leaveLobby?name=' + $scope.username).then(function (response) {
                if (response.ok == 1 && response.n ==1 ) {
                    $location.path('login');
                } else {
                    alert("player could not be deleted");
                    console.log("player could not be deleted");
                }
            })
        }, function() {
            console.log("stay");

        });

    };
    });
