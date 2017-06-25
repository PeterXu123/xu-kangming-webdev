(function () {
    angular
        .module('WAM')
        .controller('friendListController', friendListController);




    function friendListController(currentUser, $routeParams, userService) {
        var model = this;
        model.userId = currentUser._id;
        model.cancelFollowing = cancelFollowing;


        function init() {
            userService
                .findUserById(model.userId)
                .then(renderFollowers);
            userService
                .findUserById(model.userId)
                .then(renderFollowings);

        }

        init();

        function cancelFollowing(userId, followingId, followingname) {
            userService
                .cancelFollowing(userId, followingId, currentUser.username, followingname)
                .then(function() {
                        model.message = "You have unfollowed this user";
                        return;
                    }
                )
        }

        function renderFollowers(user) {
            console.log(user)
            model.followers = user.followers;


        }
        function renderFollowings(user) {

            model.followings = user.followings;

        }










    }


}) ();