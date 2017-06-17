(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

        function widgetNewController(currentUser, $sce, $location, $routeParams, widgetService) {
            var model = this;
            model.userId = currentUser._id;
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];

           function init() {
               widgetService.findAllWidgetsById(model.pageId)
                   .then(function(response) {
                       model.widgets = response;
                   })
           }
           init();

            model.createVideoWidget = createVideoWidget;
            model.createImageWidget = createImageWidget;
            model.createHeadingWidget = createHeadingWidget;
            model.createTextWidget = createTextWidget;
            model.createHtmlWidget = createHtmlWidget;
            model.trustThisContent = trustThisContent;
            model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
            model.getWidgetUrlForType = getWidgetUrlForType;
            model.editWidget = editWidget;
            function createTextWidget(widget) {
                var widget = {
                    widgetType : "INPUT",
                    _page: model.pageId,
                    placeholder: model.widget.placeholder,
                    formatted: model.widget.formatted,
                    text: model.widget.text,
                    rows: model.widget.rows


                }
                widgetService.createWidget(model.pageId, widget)
                    .then(function(response){
                        console.log(response)
                        $location.url('/user/' +  'website/' + model.websiteId + '/page/' + model.pageId + '/widget')
                    })

            }
            function createHtmlWidget(widget) {
                var widget1 = {

                    widgetType: "HTML",
                    text: model.widget.text,
                    _page: model.pageId



                }
                widgetService.createWidget(model.pageId, widget1)
                    .then(function(response){
                        console.log(response)
                        $location.url('/user/' +  'website/' + model.websiteId + '/page/' + model.pageId + '/widget')
                    })

            }

            function createHeadingWidget(text, size) {
                var widget = {
                    widgetType : "HEADING",
                    text : text,
                    size : size,
                    _page : model.pageId
            }

                widgetService.createWidget(model.pageId, widget)
                    .then(function(response){
                        console.log(response)
                        $location.url('/user/' + 'website/' + model.websiteId + '/page/' + model.pageId + '/widget')
                    })
                // console.log("fdfd");

            }
            function createImageWidget(widget) {
                var widget = {
                    widgetType : "IMAGE",
                    _page : model.pageId,
                    width : "100%",
                    url: model.imageUrl
                }


                widgetService.createWidget(model.pageId, widget)
                    .then(function() {
                        $location.url('/user/' + 'website/' + model.websiteId + '/page/' + model.pageId + '/widget')

                    })

            }

            function createVideoWidget(widget) {
                var widget = {widgetType : "YOUTUBE",
                    _page : model.pageId,

                    width : "100%",
                    url: model.videoUrl}

                widgetService.createWidget(model.pageId, widget)
                    .then(function() {
                        $location.url('/user/'  + 'website/' + model.websiteId + '/page/' + model.pageId + '/widget');

                    })

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
                    $location.url('/user/' + 'website/' + model.websiteId + '/page/' + model.pageId + '/widget/edit');

            }



        }

}) ()
