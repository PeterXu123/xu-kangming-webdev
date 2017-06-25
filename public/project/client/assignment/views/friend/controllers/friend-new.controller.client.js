(function () {
    angular
        .module('WAM')
        .controller('friendNewController', friendNewController);




    function friendNewController(currentUser, userService, $location) {
        var model = this;
        model.userId = currentUser._id;
        model.addFriend = addFriend;

        function addFriend(friendName) {
            userService
                .findUserByUsername(friendName)
                .then(function(friend) {
                    console.log(friend);

                    if(!friend) {
                        model.error = "this user doesn't exist";
                        return;
                    }


                    else if (currentUser.followings.map(function(e) {
                        return e._id;
                        }).indexOf(friend._id) > -1) {
                        model.error ="this user you have followed";
                        return;

                    }
                    else if(friend._id === model.userId) {
                        model.error = "cannot add yourself";
                        return;
                    }
                    else {
                        userService
                            .addFollowing(friend._id,  model.userId, currentUser.username, friend.username)
                            .then(function() {
                                $location.url("/user/friend");
                        })
                    }


                })
        }













    }


}) ();