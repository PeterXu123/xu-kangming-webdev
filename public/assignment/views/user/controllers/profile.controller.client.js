(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);


    function profileController( $location, $routeParams, userService) {

        var model = this;
        model.userId = $routeParams['userId']

        model.update = update;



        model.user = userService.findUserById(model.userId);

        function update (firstName, lastName) {

            var userold = userService.findUserById(userId);
            var usernew = {
                _id: userId,
                username: userold.username,
                password: userold.password,
                firstName: firstName,
                lastName: lastName



            };

            userService.updateUser(userId, usernew);




                $location.url('/user/' + model.user._id );








        };


    }



}) ();