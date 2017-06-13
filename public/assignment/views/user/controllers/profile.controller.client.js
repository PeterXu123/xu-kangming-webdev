(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);


    function profileController( $location, $routeParams, userService) {

        var model = this;
        model.userId = $routeParams['userId']

        model.update = update;
        model.deleteUser = deleteUser;



           userService
            .findUserById(model.userId)
               .then(renderUser, userError);
        function renderUser(user) {
            console.log(user);
            model.user = user;
        };
        function userError(error) {
            model.error = "User not found"
        }






        // model.user = userService.findUserById(model.userId).


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