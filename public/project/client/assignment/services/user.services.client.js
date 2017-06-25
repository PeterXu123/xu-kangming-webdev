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
                findAllUsers: findAllUsers,
                login: login,
                checkLoggedIn: checkLoggedIn,
                checkAdmin: checkAdmin,
                unregister: unregister,
                logout: logout,
                register: register,
                createUser: createUser,
                updateUser: updateUser,
                deleteUser: deleteUser,
                addFollowing: addFollowing,
                addLike: addLike,
                cancelFollowing: cancelFollowing,




            };
            return api;
            function addLike(userId, imdbId, movieName) {
                var url = "/api/project/addLike";
                var object = {userId: userId, imdbId: imdbId, movieName: movieName};
                return $http.post(url, object)
                    .then(function(response) {
                        return response.data;
                    })
            }

            function cancelFollowing(userId, followingId, username, followingname) {
                var url = "/api/project/cancelFollowing";
                var object = {userId: userId, followingId: followingId, username: username, followingname: followingname};
                return $http.post(url, object)
                    .then(function(response) {
                        console.log(response);
                        return response.data;
                    })
            }


            function addFollowing(followingId, userId, username, followingname) {
                console.log(followingId);
                console.log(userId);
                var url = "/api/project/followings";
                var object= {followingId: followingId, userId: userId, username: username, followingname: followingname};
                console.log("hey bb");
                return $http.post(url, object)
                    .then(function(response) {
                        console.log(response.data);
                        return response.data;

                    },
                        function(err) {
                        console.log(err);
                        }
                        )
            }

            // function findAllFollowersForUser(userId) {
            //     var url = "/api/project/followers/user" + userId;
            //     return $http.get(url)
            //         .then(function (response) {
            //             return response.data;
            //         })
            // }
            // function findAllFollowingsForUser(userId) {
            //     var url = "/api/project/followings/user" + userId;
            //     return $http.get(url)
            //         .then(function (response) {
            //             return response.data;
            //         })
            // }

            function register(user) {

                var url = "/api/project/register";
                return $http.post(url, user)
                    .then(function(response) {
                        return response.data;
                    })
            }
            function logout() {
                var url = "/api/project/logout";
                return $http.post(url)
                    .then(function(response) {
                        return response.data;
                    })
            }
            function checkLoggedIn() {
                var url = "/api/project/checkLoggedIn";
                return $http.get(url)
                    .then(function(response) {
                        return response.data;
                    })

            }
            function unregister() {
                var url = "/api/project/unregister";
                return $http.post(url)
                    .then(function (response) {
                        return response.data;
                    })

            }


            function checkAdmin() {
                var url = "/api/project/checkAdmin";
                return $http.get(url)
                    .then(function(response) {
                        return response.data;
                    })

            }
            function login(username, password) {
                var url = "/api/project/login";
                var credentials = {
                    username: username,
                    password: password
                };
                return $http.post(url, credentials)
                    .then(function(response) {
                        return response.data;
                    })

            }
            function findUserByCredentials(username, password) {

                var url = "/api/project/user?username="+username+"&password=" + password;
                return $http.get(url)
                    .then(function(response) {
                        return response.data;
                    })


            }
            function findUserByUsername(username) {
                var url = "/api/project/user?username=" + username;
                console.log("lll");
                return $http
                    .get(url)
                    .then(function(response) {
                        return response.data;
                    })

            }
            function findAllUsers() {

                var url = "/api/project/user";
                return $http.get(url)
                    .then(function(response) {



                        return (response.data);
                    })

            }
            function findUserById(userId) {
                var url = "/api/project/user/" + userId;
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

                var url = "/api/project/user/";
                return $http.post(url, user)
                    .then(function (response) {
                        console.log("Hey")
                        return response.data;
                    })
                // user._id = (new Date()).getTime() + "";
                // users.push(user);

            }
            function updateUser(userId, user) {
                var url = "/api/project/user/" + userId;
                return $http.put(url, user)
                    .then(function (response) {
                        return response.data;
                    });





            }
            function deleteUser(userId) {

                var url = "/api/project/user/" + userId;
                return $http.delete(url)
                    .then(function (response) {
                        return response.data;
                    })


            }


        }
})();