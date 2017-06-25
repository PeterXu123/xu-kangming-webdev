/**
 * Created by xukan on 5/28/2017.
 */
/**
 * Created by xukan on 5/25/2017.
 */
(function() {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService($http){

        var api = {
            createWidget: createWidget,
            findAllWidgetsById: findAllWidgetsById,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidget: sortWidget

        };
        return api;
        function sortWidget(index1, index2, pageId) {
            console.log(index1);
            var url = "/api/project/page/" + pageId + "/widget?initial=" +
                index1 + "&final=" + index2;
            return $http.put(url, {first:index1, second:index2})
                .then(function(response) {
                    return response.data;
                })


        }

        function createWidget(pageId, widget) {
            console.log(widget);
            var url = "/api/project/page/" + pageId + "/widget";
            return $http.post(url, widget)
                .then(function(response) {
                    console.log(response.data);
                    return response.data;
                })

            // widget._id = (new Date()).getTime() + "";
            // widget.pageId = pageId;
            //
            //
            // widgets.push(widget);

        }
        function updateWidget(widgetId, widget) {


            var url = "/api/project/widget/" + widgetId;
            console.log(widget)
            return  $http.put(url, widget)
                .then(function(response) {
                    console.log("goal");
                    console.log(response.data);
                    return response.data;
                },
                function(err) {
                    console.log(err);
                })
            // var found = findWidgetById(widgetId);
            // if (found !== null) {
            //    found = widget;
            //     return found
            // }
            // return null;
        }
        function deleteWidget(widget) {
            var pageId = widget.pageId;
            var widgetId = widget.widgetId;
            console.log(widgetId);
            var url = "/api/project/page/"+ pageId +"/widget/" + widgetId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                })
            // var widget = widgets.find(function (widget) {
            //     return widget._id === widgetId;
            // });
            // var index = widgets.indexOf(widget);
            // widgets.splice(index, 1);
        }
        function findWidgetById(widgetId) {
            var url = "/api/project/widget/" + widgetId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
            // return widgets.find(function (widget) {
            //     return widget._id === widgetId;
            // });
        }

        function findAllWidgetsById(pageId) {
            var url = "/api/project/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
            // var resultSet = [];
            // for(var w in widgets) {
            //     if(widgets[w].pageId === pageId) {
            //         // websites[w].created = new Date();
            //         // websites[w].updated = new Date();
            //         resultSet.push(widgets[w]);
            //     }
            // }
            // return resultSet;
        }






    }
})();