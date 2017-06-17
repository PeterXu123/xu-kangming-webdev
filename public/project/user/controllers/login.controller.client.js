(function () {
    angular
        .module('TMDB')
        .controller('loginController', loginController);


    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {
            // var found = userService.findUserByCredentials(username, password);
            userService
                //.findUserByCredentials(username, password)
                .login(username, password)
                .then(function (found) {

                    $location.url('/profile');
                },
                    function(found) {



                        model.message = "sorry, " + username + " not found. please try again!";
                    });

        }
    }
})();