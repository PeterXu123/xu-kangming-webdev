(function () {
    angular
        .module('WAM')
        // .directive('wdDraggable', wdDraggable)
        .controller('widgetListController', widgetListController);

    // function wdDraggable(widgetService, $routeParams) {
    //
    //     function linkFunction(scope, element) {
    //
    //
    //         var startPos;
    //         var endPos;
    //
    //
    //         $(element).sortable({
    //                 start: function (event, ui) {
    //                     startPos = ui.item.index();
    //
    //
    //                 },
    //
    //                 stop: function (event, ui) {
    //                     endPos = (ui.item.index());
    //                     console.log(startPos, endPos);
    //                     widgetService.sortWidget(startPos, endPos, $routeParams['pageId'])
    //                         .then(function (response) {
    //
    //                         })
    //
    //
    //                 }
    //
    //
    //             }
    //         );
    //
    //
    //
    //     }
    //
    //     return {
    //         link: linkFunction
    //     }
    // }
    // }




        function widgetListController(currentUser, $sce, $location, $routeParams, widgetService) {
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


            model.trustThisContent = trustThisContent;
            model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
            model.getWidgetUrlForType = getWidgetUrlForType;
            model.editWidget = editWidget;
            function editWidget(widget) {
                if (widget.widgetType === "HEADING") {
                    $location.url('/user/' +  'website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id +'/header')


                }
                if (widget.widgetType === "IMAGE") {
                    $location.url('/user/' +  'website/' + model.websiteId + '/page/' + model.pageId + '/widget/' +widget._id+ '/image');
                }
                if (widget.widgetType === "YOUTUBE") {
                    $location.url('/user/' +  'website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id+'/youtube');
                }
                if (widget.widgetType === "INPUT") {
                    $location.url('/user/' +  'website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id+'/text');
                }
                if (widget.widgetType === "HTML") {
                    $location.url('/user/' +  'website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id+'/html');
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
                console.log(html);
                return $sce.trustAsHtml(html);


            }
            function getWidgetUrlForType(type) {
                return 'views/widget/templates/widget-' + type.toLowerCase() + '.view.client.html';





            }



        }

}) ()
