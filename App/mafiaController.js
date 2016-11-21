angular.module("MafiaApp", ['ngMaterial','ngRoute']).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : 'Login/loginView.htm',
            //controller : 'Login/loginController'
        })
        .when("/lobby", {
            templateUrl : 'Lobby/lobbyView.htm',
            //controller : 'Lobby/lobbyController'
        })
        .otherwise("/");
})
   .controller('loginController', function($scope, $http, $mdToast, $location, $rootScope) {
       $scope.callBackend = function () {
           console.log($scope.username);
           $http.get('http://localhost:8080/login?name=' + $scope.username).then(function (response) {
               $scope.showStatus = response.data;
               $mdToast.show(
                   $mdToast.simple()
                       .textContent($scope.showStatus.message)
                       .hideDelay(3000)
               )
               if (response.data.success == true) {
                   console.log()
                   $location.path('lobby');
               }
           })
       }
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

