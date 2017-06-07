(function () {
    angular
        .module('Draggable', [])
        .directive('wdDraggable', wdDraggable)


    function wdDraggable(widgetService, $routeParams) {

        function linkFunction(scope, element) {


            var startPos;
            var endPos;


            $(element).sortable({
                    start: function (event, ui) {
                        startPos = ui.item.index();


                    },

                    stop: function (event, ui) {
                        endPos = (ui.item.index());
                        console.log(startPos, endPos);
                        widgetService.sortWidget(startPos, endPos, $routeParams['pageId'])
                            .then(function (response) {

                            })


                    }


                }
            );


        }

        return {
            link: linkFunction
        }
    }
})()
// }
