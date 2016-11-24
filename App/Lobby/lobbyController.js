angular.module("MafiaApp.lobby", [
    'ngMaterial',
    'ngRoute'
    ])

.controller('lobbyController', function($scope, $mdDialog, $location, $http, $rootScope) {
   
    $scope.isDisabled = true;
    $rootScope.isInLobby = true;

    $http.get('lobby').then(function (response) {
        $scope.userList = response.data;

        if($scope.userList.length < 2)
            $scope.isDisabled = false;
        else
            $scope.isDisabled = true;

        $scope.$applyAsync();
    });

    socket.on('new player', function(username){
        console.log(username);
        $scope.userList.push({name: username});
        $scope.$applyAsync();
    });

    //TODO: Randomly generate quotes per user
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


    //$scope.refreshPlayers = function(){
    //    $http.get('lobby').then(function (response) {
    //        $scope.userList = response.data;
    //        $scope.$applyAsync();
    //
    //        $http.get('isGameStarted').then(function (response) {
    //            console.log(response);
    //            console.log(response.data);
    //            console.log(response.data[0].started);
    //
    //
    //            if(response.data[0].started){
    //                alert("Go to the Game!");
    //            }
    //        });
    //
    //    });
    //}

    //$interval(function() {
    //    if($rootScope.isInLobby)
    //        $scope.refreshPlayers();
    //}, 5000);

     $scope.startGame = function(){
         if ($scope.userList.length < 5) {
             alert("Need at least 5 players to play.")
         } else {
             $location.path('role');
             $http.get('startGame').then(function (response) {
                 console.log(response);
             });
         }
    }

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
                    $rootScope.isInLobby = false;
                    $location.path('login');
                }else{
                    alert("Player could not be deleted");
                }
            })
        }, function() {});
    };
})