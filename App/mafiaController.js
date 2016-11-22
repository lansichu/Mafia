angular.module("MafiaApp", [
    'ngMaterial',
    'ngRoute', 
    'MafiaApp.login', 
    'MafiaApp.lobby'
    ])

.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : 'Login/loginView.htm',
        })
        .when("/lobby", {
            templateUrl : 'Lobby/lobbyView.htm',
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
