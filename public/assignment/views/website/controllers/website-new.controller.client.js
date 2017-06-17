(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController(currentUser, $routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = currentUser._id;





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
            console.log(website);
            if ( typeof website ==='undefined') {
                model.error = "Can't add this website";
                return
            }
            // console.log(website)
            website.developerId = model.userId;

            websiteService.createWebsite(website)
                .then(function () {
                    $location.url('/user/website');
                })
        }
    }
})();