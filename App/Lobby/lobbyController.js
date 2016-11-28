angular.module("MafiaApp.lobby", [
    'ngMaterial',
    'ngRoute'
    ])

.controller('lobbyController', function($scope, $mdDialog, $location, $http, $rootScope) {
   if($rootScope.userName){
        $scope.isDisabled = true;
        $rootScope.isInLobby = true;
        $rootScope.admin = false;

        $http.get('lobby').then(function (response) {
            $scope.userList = response.data;

            if($scope.userList.length < 2)
                $scope.isDisabled = false;
            else
                $scope.isDisabled = false;

            $scope.$applyAsync();
        });

        socket.on('new player', function(username){
            console.log(username);
            $scope.userList.push({name: username});
            $scope.$applyAsync();
        });

        socket.on('game started', function(){
            $location.path('role');
        });

         $scope.startGame = function(){
            $rootScope.admin = true;

             if ($scope.userList.length < 5) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Cannot start game yet')
                    .textContent('Need at least 5 players to play.')
                    .ok("OK I'm gunna wait for more players")
                );
             } else {
                 $http.get('startGame').then(function (response) {
                    socket.emit('start game', null);
                 });
             }
        }

        $scope.showConfirm = function(ev){
            var confirm = $mdDialog.confirm()
                .title('Leave the game')
                .textContent('Do you really want to exit the game?')
                .targetEvent(ev)
                .ok('Leave now')
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
    }else{
        $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(false)
                .title('Cannot enter the Lobby')
                .textContent('Please make sure that you login first before you enter the lobby!')
                .ok("OK I'm gunna login first")
            );
        $location.path('login');
    }
})