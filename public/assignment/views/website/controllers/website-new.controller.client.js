(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId= $routeParams.websiteId;




        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
        }
        init();
        function renderWebsites(websites) {
            model.websites = websites;
        }

        // implementation
        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService.createWebsite(website)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                })
        }
    }
})();