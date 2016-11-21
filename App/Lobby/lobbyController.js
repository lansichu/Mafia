angular.module("MafiaApp.lobby", [
    'ngMaterial',
    'ngRoute'
    ])
.controller('lobbyController', function($scope, $mdDialog, $location) {
    $scope.status = '  ';
    $scope.customFullscreen = false;
            console.log("That's the lobby!");
    $scope.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to exit the game?')
            .textContent('Mafia has destroyed you.')
            .ariaLabel('Decision Time')
            .targetEvent(ev)
            .ok('Get me out of here.')
            .cancel('Keep me in!');


        $mdDialog.show(confirm).then(function() {
            $location.path('login');
        }, function() {
            console.log("stay");

        });

    };
    });


