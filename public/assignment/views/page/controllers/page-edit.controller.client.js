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
            model.pages = pageService.findAllPagesForWebsite(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }

        init();
        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');
        }
        function updatePage(name, description) {
            var page ={
                _id : model.pageId,
                name : name,
                websiteId : model.websiteId,
                description : description


            }
            pageService.updatePage(model.pageId, page);
            $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');

        }
        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }








    }


}) ();