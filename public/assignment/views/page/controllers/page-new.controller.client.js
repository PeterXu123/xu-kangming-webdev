(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);




    function pageNewController( $routeParams, pageService, $location) {
        var model = this;
        model.websiteId = $routeParams['websiteId'];
        model.userId = $routeParams['userId'];
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
            page.websiteId = model.websiteId;
            pageService.createPage(page)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');

                })
        }




    }


}) ();