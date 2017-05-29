/**
 * Created by xukan on 5/25/2017.
 */
(function() {
    angular
        .module('WAM')
        .factory('userService', userService);
        function userService(){

            var users = [
                {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
            ];
            var api = {
                findUserById: findUserById,
                findUserByUsername: findUserByUsername,
                findUserByCredentials: findUserByCredentials,
                createUser: createUser,
                updateUser: updateUser,
                deleteUser: deleteUser

            };
            return api;
            function findUserByCredentials(username, password) {
                for(var u in users) {
                    var user = users[u];

                    if (user.username === username &&
                        user.password === password) {
                        return user;
                        break;

                    }

                }
                return null;
            }
            function findUserById(userId) {
                for (var u in users) {
                    return users.find(function (user) {
                        return user._id === userId;
                    })
                }
            }
            function createUser(user) {
                user._id = (new Date()).getTime() + "";
                users.push(user);

            }
            function updateUser(userId, user) {
                var found = findUserByIdById(userId);
                if (found !== null) {
                    found.firstName = user.firstName;
                    found.last = user.lastName;
                    return found
                }
                return null;




            }
            function deleteUser(userId) {
                var user = usrs.find(function (user) {
                    return user._id === userId
                });
                var index = users.indexOf(user);
                users.splice(index, 1);

            }
            function findUserByUsername(username) {
                var user = users.find(function(user) {
                    return user.username === username
                });
                if (typeof user ==='undefined') {
                    return null;
                }
                else {
                    return user;
                }
            }

        }
})();