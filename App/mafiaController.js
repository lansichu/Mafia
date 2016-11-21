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
})