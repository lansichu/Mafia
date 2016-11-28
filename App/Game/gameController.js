angular.module("MafiaApp.game", [
    'ngMaterial',
    'ngRoute'
    ])

.controller('gameController', function($scope, $http, $mdToast, $location, $rootScope, $mdDialog) {
    if($rootScope.userName){

        //do sth

     }else{
        $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(false)
                .title('Cannot enter the Game')
                .textContent('Please make sure that you login first before you enter the Game!')
                .ok("OK I'm gunna login first")
            );
        $location.path('login');
        }
});