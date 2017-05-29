(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

        function widgetEditController($sce, $location, $routeParams, widgetService) {
            var model = this;
            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];
            model.widgetId = $routeParams['widgetId'];

           function init() {
               model.widgets = widgetService.findAllWidgetsById(model.pageId);
               model.widget = widgetService.findWidgetById(model.widgetId);
           }
           init();

            // model.createVideoWidget = createVideoWidget;
            // model.createImageWidget = createImageWidget;
            // model.createHeadingWidget = createHeadingWidget;
            model.trustThisContent = trustThisContent;
            model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
            model.getWidgetUrlForType = getWidgetUrlForType;
            model.updateHeadingWidget=updateHeadingWidget;
            model.updateImageWidget=updateImageWidget;
            model.updateVideoWidget=updateVideoWidget;
            model.deleteWidget = deleteWidget;
            function deleteWidget(widget) {
                widgetService.deleteWidget(model.widgetId);
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');

            }

            function updateVideoWidget(widgetUrl) {
                var widget = {
                    _id : model.widgetId,
                    url : widgetUrl,
                    widgetType: "YOUTUBE",
                    width: "100%"


                }
                widgetService.updateWidget(model.widgetId, widget)
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')

            }

            function updateImageWidget(widgetUrl) {
                var widget = {
                    _id : model.widgetId,
                    url : widgetUrl,
                    widgetType: "IMAGE",
                    width: "100%"


                }
                widgetService.updateWidget(model.widgetId, widget)
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')

            }
            function updateHeadingWidget(widgettext, widgetsize) {
                var widget ={_id : model.widgetId,
                    widgetType : "HEADING",
                    text: widgettext,
                    pageId: model.pageId,
                    size: widgetsize


            }


                widgetService.updateWidget(model.widgetId, widget)
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')

            }



            // function createHeadingWidget(widget) {
            //     var widget = {
            //         widgetType : "HEADING",
            //         text : model.headText,
            //     size : model.headSize
            // }
            //
            //     widgetService.createWidget(model.pageId, widget);
            //     console.log("fdfd");
            //     $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')
            // }
            // function createImageWidget(widget) {
            //     var widget = {
            //         widgetType : "IMAGE",
            //
            //         width : "100%",
            //         url: model.imageUrl
            //     }
            //
            //
            //     widgetService.createWidget(model.pageId, widget);
            //     $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')
            //
            // }
            // function createVideoWidget(widget) {
            //     var widget = {widgetType : "YOUTUBE",
            //
            //         width : "100%",
            //         url: model.videoUrl}
            //
            //     widgetService.createWidget(model.pageId, widget);
            //     $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')
            //
            // }
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
