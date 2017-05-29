(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

        function widgetListController($sce, $location, $routeParams, widgetService) {
            var model = this;
            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];
           function init() {
               model.widgets = widgetService.findAllWidgetsById(model.pageId);

           }
           init();


            model.trustThisContent = trustThisContent;
            model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
            model.getWidgetUrlForType = getWidgetUrlForType;
            model.editWidget = editWidget;
            function editWidget(widget) {
                if (widget.widgetType === "HEADING") {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id +'/header');
                }
                if (widget.widgetType === "IMAGE") {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' +widget._id+ '/image');
                }
                if (widget.widgetType === "YOUTUBE") {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id+'/youtube');
                }


            }
            function getYouTubeEmbedUrl(youTubeLink) {
                var embedUrl = 'https://www.youtube.com/embed/';
                var youTubeLinkParts = youTubeLink.split('/');
                var id = youTubeLinkParts[youTubeLinkParts.length - 1];
                embedUrl += id;
                return $sce.trustAsResourceUrl(embedUrl);
            }
            function trustThisContent(html) {
                return $sce.trustAsHtml(html);


            }
            function getWidgetUrlForType(type) {
                return 'views/widget/templates/widget-' + type.toLowerCase() + '.view.client.html';
            }



        }

}) ()
