
(function () {
    angular
        .module('WAM')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController(userService) {
        var model = this;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        function init() {
            findAllUsers();
        }
        init();
        function createUser(user) {
            console.log(user);

            userService
                .createUser(user)
                .then(findAllUsers);
        }
        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers());
        }
        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function(users) {

                    model.users = users;

                });

        }
    }

})()