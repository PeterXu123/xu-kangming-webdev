/**
 * Created by xukan on 5/25/2017.
 */
(function() {
    angular
        .module('WAM')
        .factory('pageService', pageService);
        function pageService($http){
            var pages = [

                    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }


            ];
            var api = {
                createPage: createPage,
                findAllPagesForWebsite: findAllPagesForWebsite,
                findPageById: findPageById,
                updatePage: updatePage,
                deletePage: deletePage

            };
            return api;
            function createPage(page) {
                var websiteId = page.websiteId;
                var url = "/api/website/" + websiteId + "/page"  ;
                return $http.post(url, page)
                    .then(function (response) {
                        return response.data;
                    })

                // page._id = (new Date()).getTime() + "";
                // page.created = new Date();
                // page.updated = new Date();
                // pages.push(page);
            }
            function updatePage(pageId, page) {
                var url = "/api/page/" + pageId;

                return $http.put(url, page)
                    .then(function(response) {
                        return response.data;
                    });

                // var found = findPageById(pageId);
               // if (found !== null) {
               //     found.description = page.description;
               //     found.name = page.name;
               //     return found
               // }
               // return null;



            }
            function deletePage(page) {
               var pageId = page._id;
                var websiteId = page.websiteId;
                var url = "/api/website/" + websiteId + "/page/" + pageId;

                return $http.delete(url)
                    .then(function(response){
                        return response.data;
                    })
                // var page = pages.find(function (page) {
                //     return page._id === pageId;
                // });
                // var index = pages.indexOf(page);
                // pages.splice(index, 1);
            }
            function findPageById(pageId) {
                var url = "/api/page/" + pageId;
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    })
            }

            function findAllPagesForWebsite(websiteId) {
                var url ="/api/website/" + websiteId + "/page";
                return  $http.get(url)
                    .then(function (response) {
                        return response.data
                    });


                // var resultSet = [];
                // for(var w in pages) {
                //     if(pages[w].websiteId === websiteId) {
                //         // websites[w].created = new Date();
                //         // websites[w].updated = new Date();
                //         resultSet.push(pages[w]);
                //     }
                // }
                // return resultSet;
            }






        }
})();