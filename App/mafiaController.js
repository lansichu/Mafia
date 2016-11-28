angular.module("MafiaApp", [
    'ngMaterial',
    'ngRoute', 
    'MafiaApp.login', 
    'MafiaApp.lobby',
    'MafiaApp.role',
    'MafiaApp.game'
    ])

.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : 'Login/loginView.htm',
        })
        .when("/lobby", {
            templateUrl : 'Lobby/lobbyView.htm',
        })
        .when("/role", {
            templateUrl : "Role/roleView.htm",
        })
         .when("/game", {
            templateUrl : "Game/gameView.htm",
        })
        .otherwise("/");
})

.run(function($rootScope, $route, $location, $window){
    $rootScope.$on('$locationChangeStart', function() {
        $rootScope.actualLocation = $location.path();
    });

    $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
        if($rootScope.actualLocation === newLocation) {
            window.history.forward();
        }
    });

    $window.addEventListener('beforeunload', function() {
        console.log("blabla");
    });
});
