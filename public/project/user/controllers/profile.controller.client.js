(function () {
    angular
        .module('TMDB')
        .controller('profileController', profileController);


    function profileController(currentUser, $location, $routeParams, userService) {

        var model = this;
        model.userId = currentUser._id;//$routeParams['userId']

        model.update = update;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.unregister = unregister;



           // userService
           //  .findUserById(model.userId)
           //     .then(renderUser, userError);
        function init() {
            renderUser(currentUser);
        }
        init();
        function renderUser(user) {
            console.log(user);
            model.user = user;
        };
        function userError(error) {
            model.error = "User not found"
        }
        function unregister() {
            userService
                .unregister()
                .then(function () {
                    $location.url('/');
                })
        }






        // model.user = userService.findUserById(model.userId).

        function logout() {
            userService.logout()
                .then(function() {
                    $location.url('/login');
                })
        }
        function deleteUser(user) {

            userService.deleteUser(user)
                .then(function() {
                    $location.url('/');
                },
                function() {
                    model.error = "unable to unregister you"
                });


        }

        function update (user) {
            userService.updateUser(user._id, user)
                .then(function() {
                    model.message = "User updated good";
                })














        };


    }



}) ();