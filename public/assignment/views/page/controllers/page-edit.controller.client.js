(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);




    function pageEditController( $routeParams, $location,  pageService) {
        var model = this;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams.pageId;
        model.userId = $routeParams['userId'];

        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.pages = pageService.findAllPagesForWebsite(model.websiteId)
                .then(function(pages) {
                    model.pages = pages;
                })
            model.page = pageService.findPageById(model.pageId)
                .then(function(page) {
                    model.page = page;
                })
        }

        init();
        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');

                })
        }
        function updatePage(page) {
            // var page ={
            //     _id : model.pageId,
            //     name : name,
            //     websiteId : model.websiteId,
            //     description : description
            //
            //
            // }
            pageService.updatePage(model.pageId, page)
                .then(function() {
                    model.message = "page updated good";
                    // $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId );
                })

        }
        function deletePage(page) {
            page.websiteId = model.websiteId;
            pageService.deletePage(page)
                .then(function() {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');

                })
        }








    }


}) ();