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

.run(function($rootScope, $route, $location){

    $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.actualLocation = $location.path();
    });

    $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
        if($rootScope.actualLocation === newLocation) {
            window.history.forward();
            //alert('Why did you use history back?');
        }
    });
});
