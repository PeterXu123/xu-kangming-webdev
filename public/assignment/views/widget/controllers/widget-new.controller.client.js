(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

        function widgetNewController($sce, $location, $routeParams, widgetService) {
            var model = this;
            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];

           function init() {
               model.widgets = widgetService.findAllWidgetsById(model.pageId);
           }
           init();

            model.createVideoWidget = createVideoWidget;
            model.createImageWidget = createImageWidget;
            model.createHeadingWidget = createHeadingWidget;
            model.trustThisContent = trustThisContent;
            model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
            model.getWidgetUrlForType = getWidgetUrlForType;
            model.editWidget = editWidget;
            function createHeadingWidget(widget) {
                var widget = {
                    widgetType : "HEADING",
                    text : model.headText,
                size : model.headSize
            }

                widgetService.createWidget(model.pageId, widget);
                console.log("fdfd");
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')
            }
            function createImageWidget(widget) {
                var widget = {
                    widgetType : "IMAGE",

                    width : "100%",
                    url: model.imageUrl
                }


                widgetService.createWidget(model.pageId, widget);
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')

            }
            function createVideoWidget(widget) {
                var widget = {widgetType : "YOUTUBE",

                    width : "100%",
                    url: model.videoUrl}

                widgetService.createWidget(model.pageId, widget);
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')

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
            function editWidget() {
                // if (type==='HEADING') {
                //     $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/editHeading');
                // }
                // if (type==='IMAGE') {
                //     $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/editImage');
                // }
                // if (type==='YOUTUBE') {
                //     $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/editYoutube');
                // }
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/edit');

            }



        }

}) ()
