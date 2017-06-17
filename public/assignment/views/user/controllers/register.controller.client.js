(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);




    function registerController( $location, userService) {
        var model = this;
        // event handlers
        model.register = register;

        // implementation
        function register (username, password, password2) {
            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }
            if (password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }


            userService.findUserByUsername(username)
                .then(function () {
                        model.error = "sorry, that username is taken";
                    },
                    function () {
                        var newUser = {

                            username: username,
                            password: password
                        };
                        userService.register(newUser)
                            .then(function (response) {
                                $location.url('/profile');
                            })








                });

            // if (found !== null) {
            //     model.error = "username is not available"
            //
            // }
            // else {
            //     var user = {
            //
            //         username: username,
            //         password: password
            //     };
            //     //model.message = user;
            //     userService.createUser(user)
            //         .then(function (user) {
            //             $location.url('/user/' + user._id );
            //         })


        }}


}) ();