/**
 * Created by xukan on 5/25/2017.
 */
(function() {
    angular
        .module('WAM')
        .factory('userService', userService);
        function userService($http){

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

                var url = "/api/user?username="+username+"&password=" + password;
                return $http.get(url)
                    .then(function(response) {
                        return response.data;
                    })


            }
            function findUserByUsername(username) {
                var url = "/api/user?username=" + username;
                return $http
                    .get(url)
                    .then(function(response) {
                        return response.data;
                    })

            }
            function findUserById(userId) {
                var url = "/api/user/" + userId;
               return $http.get(url)
                   .then(function(response) {
                       return response.data;
                   })
                   // .then(function (response) {
                   //     return response.data;
                   // })

                // for (var u in users) {
                //     return users.find(function (user) {
                //         return user._id === userId;
                //     })
                // }
            }
            function createUser(user) {
                var url = "/api/user/";
                return $http.post(url, user)
                    .then(function (response) {
                        return response.data;
                    })
                // user._id = (new Date()).getTime() + "";
                // users.push(user);

            }
            function updateUser(userId, user) {
                var url = "/api/user/" + userId;
                return $http.put(url, user)
                    .then(function (response) {
                        return response.data;
                    });





            }
            function deleteUser(userId) {

                var url = "/api/user/" + userId;
                return $http.delete(url)
                    .then(function (response) {
                        return response.data;
                    })


            }


        }
})();