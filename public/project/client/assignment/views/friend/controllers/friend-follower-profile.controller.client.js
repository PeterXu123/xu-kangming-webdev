/**
 * Created by xukan on 6/21/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('friendFollowerProfileController', friendFollowerProfileController);




    function friendFollowerProfileController(currentUser, userService, $location, $routeParams) {
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