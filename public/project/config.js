(function () {
    angular.module('TMDB')
        .config(configuration);
    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/templates/home.html',
                controller: 'profileController',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: 'user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: 'user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'vm'
            })
    }
})()