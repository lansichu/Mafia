angular.module("MafiaApp.lobby", [
    'ngMaterial',
    'ngRoute'
    ])

.controller('lobbyController', function($scope, $mdDialog, $location, $http, $rootScope, $interval) {
   
    $http.get('lobby').then(function (response) {
        $scope.userList = response.data;

        if($scope.userList.length < 2)
            $scope.cannotStartGame = false;
        else
            $scope.cannotStartGame = true;

        $scope.$applyAsync();
    });

    //TODO: Ramdonly generate quotes per user
    //$scope.quotes = [
    //    {
    //        value: "You suck"
    //    },
    //    {
    //        value: "I rock"
    //    },
    //    {
    //        value: "I want you"
    //    }];
    //
    //$scope.randomQuote = $scope.quotes[Math.floor(Math.random() * $scope.quotes.length)];


    $scope.refreshPlayers = function(){
        $http.get('lobby').then(function (response) {
            $scope.userList = response.data;
            $scope.$applyAsync();
            console.log("Refresh");
            $interval(function() {$scope.refreshPlayers()}, 5000);

            //TODO: Stop on leaving the page
        });
    }

    $interval(function() {$scope.refreshPlayers()}, 5000);

    $scope.showConfirm = function(ev){
        var confirm = $mdDialog.confirm()
            .title('Would you like to exit the game?')
            .textContent('Mafia has destroyed you.')
            .ariaLabel('Decision Time')
            .targetEvent(ev)
            .ok('Get me out of here.')
            .cancel('Keep me in!');

        $mdDialog.show(confirm).then(function() {
            $http.get('leaveLobby?name=' + $rootScope.userName).then(function (response) {
                if (response.data.ok == 1 && response.data.n ==1 ) {
                    $location.path('login');
                }else{
                    alert("Player could not be deleted");
                }
            })
        }, function() {});
    };
});
