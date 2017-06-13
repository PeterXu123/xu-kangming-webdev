/**
 * Created by xukan on 5/25/2017.
 */
(function() {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);
        function websiteService($http){
            var websites = [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ];
            var api = {
                createWebsite: createWebsite,
                findAllWebsitesForUser: findAllWebsitesForUser,
                findWebsiteById: findWebsiteById,
                updateWebsite: updateWebsite,
                deleteWebsite: deleteWebsite

            };
            return api;
            function createWebsite(website) {
                var userId = website.developerId;

                var url = "/api/user/" + userId + "/website"  ;
                return $http.post(url, website)
                    .then(function (response) {
                        return response.data;
                    })

            }
            function updateWebsite(websiteId, website) {
               var url = "/api/website/" + websiteId;
               console.log("here1");

               return $http.put(url, website)
                   .then(function(response) {
                       return response.data;
                   });


            }
            function deleteWebsite(website) {
                var userId = website.developerId;
                var websiteId = website._id;


               var url = "/api/user/" + userId + "/website/" + websiteId;

               return $http.delete(url)
                   .then(function(response){
                       return response.data;
                })
            }
            function findWebsiteById(websiteId) {
                var url = "/api/website/" + websiteId;
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    })
            }

            function findAllWebsitesForUser(userId) {
                var url ="/api/user/" + userId + "/website";
                return  $http.get(url)
                    .then(function (response) {
                        return response.data
                    });

            }






        }
})();