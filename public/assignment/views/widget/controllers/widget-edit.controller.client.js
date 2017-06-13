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
                widgetService.findAllWidgetsById(model.pageId)
                    .then(function(response) {
                        model.widgets = response;
                    });
              widgetService.findWidgetById(model.widgetId)
                  .then(function(response) {
                      model.widget = response;
                  })
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
            model.updateHtmlWidget=updateHtmlWidget;
            model.updateTextWidget=updateTextWidget;

            model.deleteWidget = deleteWidget;
            function deleteWidget(widget) {
                var widget1 = {};


                widget1.pageId = model.pageId;
                widget1.widgetId = model.widgetId;

                widgetService.deleteWidget(widget1)
                    .then(function() {
                        $location.url('/user/' + model.userId + '/website/' +
                            model.websiteId + '/page/' + model.pageId + '/widget');

                    })

            }
            function updateHtmlWidget(widget) {
                var widget1 = {
                    _id : model.widgetId,
                    widgetType: "HTML",
                    text: model.widget.text



                }
                widgetService.updateWidget(model.widgetId, widget1)
                    .then(function() {
                        $location.url('/user/' + model.userId +
                            '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');

                    })



            }
            function updateTextWidget(widget) {
                var text = {
                    _id : model.widgetId,
                    widgetType: "INPUT",
                    placeholder: model.widget.placeholder,
                    formatted: model.widget.formatted,
                    text: model.widget.text
                }


                widgetService.updateWidget(model.widgetId, text)
                    .then(function() {


                        $location.url('/user/' + model.userId +
                            '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');

                    }
                    , function(err) {
                        console.log(err);
                        })



            }
            function updateVideoWidget(widgetUrl) {
                var widget = {
                    _id : model.widgetId,
                    url : widgetUrl,
                    widgetType: "YOUTUBE",
                    width: "100%",
                    pageId: model.pageId


                }
                widgetService.updateWidget(model.widgetId, widget)
                    .then(function() {
                        $location.url('/user/' + model.userId +
                            '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');

                    })

            }

            function updateImageWidget(widgetUrl) {
                var widget = {
                    _id : model.widgetId,
                    url : widgetUrl,
                    widgetType: "IMAGE",
                    width: "100%",
                    pageId: model.pageId


                }
                widgetService.updateWidget(model.widgetId, widget)
                    .then(function() {
                        $location.url('/user/' + model.userId +
                            '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');

                    })

            }
            function updateHeadingWidget(widget) {

                var widget ={_id : model.widgetId,
                    widgetType : "HEADING",
                    text: model.widget.text,
                    pageId: model.pageId,
                    size: model.widget.size


            }


                widgetService.updateWidget(model.widgetId, widget)
                    .then(function(response) {
                        model.widgets = response;
                        console.log("123321");
                        console.log(model.widgets);


                        $location.url('/user/' + model.userId +
                            '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');


                    })

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
