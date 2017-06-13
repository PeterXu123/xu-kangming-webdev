(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId= $routeParams.websiteId;

        // event handlers
        model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService.findAllWebsitesForUser(model.userId)
                .then(function(websites) {
                    model.websites = websites;
                });
           websiteService.findWebsiteById(model.websiteId)
               .then(function (website) {
                   model.website = website;
               })
        }
        init();

        // implementation
        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService.createWebsite(website)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                })

        }
        function updateWebsite(website) {




            websiteService.updateWebsite(model.websiteId, website)
                .then(function() {
                    model.message = "Website updated good";
                })


        }
        function deleteWebsite(website) {
            website.developerId = model.userId;
            websiteService.deleteWebsite(website)
                .then(function() {
                    $location.url('/user/' + model.userId + '/website');
                })

        }
    }
})();