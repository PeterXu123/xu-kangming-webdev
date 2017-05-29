(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);


    function loginController( $location, userService) {
        var model = this;

        model.login = function(username, password) {
            var found = userService.findUserByCredentials(username, password);



                if (found !== null) {
                $location.url('/user/' + found._id);
                    //$scope.message = "welcome" + username;

                }

                    else {
                        model.message = "Username " + username + " is not found";
                }


            };
        }


}) ();