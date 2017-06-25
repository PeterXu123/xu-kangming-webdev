(function () {
    angular
        .module('WAM')
        .controller('friendProfileController', friendProfileController);




    function friendProfileController(currentUser, userService, $location, $routeParams) {
        var model = this;
        model.userId = currentUser._id;
        model.friendId = $routeParams['friendId'];
        console.log(model.friendId);
        function init() {
            userService
                .findUserById(model.friendId)
                .then(function(response) {
                    model.friend = response;
                })
        }
        init();














    }


}) ();