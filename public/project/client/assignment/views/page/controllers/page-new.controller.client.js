(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);




    function pageNewController(currentUser, $routeParams, pageService, $location) {
        var model = this;
        model.websiteId = $routeParams['websiteId'];
        model.userId = currentUser._id;
        model.createPage = createPage;

        function init() {
            pageService.findAllPagesForWebsite(model.websiteId)
                .then(renderPages);
        }

        init();
        function renderPages(pages) {
            model.pages = pages;
        }


        function createPage(page) {
            if ( typeof page ==='undefined') {
                model.error = "Can't add this page";
                return
            }
            page.websiteId = model.websiteId;
            pageService.createPage(page)
                .then(function() {
                    $location.url('/user/'+'website/' + model.websiteId + '/page');

                })
        }




    }


}) ();