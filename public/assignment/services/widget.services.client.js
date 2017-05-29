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
    function widgetService(){
        var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" }

            ]
        ;
        var api = {
            createWidget: createWidget,
            findAllWidgetsById: findAllWidgetsById,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget

        };
        return api;
        function createWidget(pageId, widget) {

            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;

            console.log(widget)
            widgets.push(widget);

        }
        function updateWidget(widgetId, widget) {
            var found = findWidgetById(widgetId);
            if (found !== null) {
               found = widget;
                return found
            }
            return null;
        }
        function deleteWidget(widgetId) {
            var widget = widgets.find(function (widget) {
                return widget._id === widgetId;
            });
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
        }
        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }

        function findAllWidgetsById(pageId) {
            var resultSet = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    // websites[w].created = new Date();
                    // websites[w].updated = new Date();
                    resultSet.push(widgets[w]);
                }
            }
            return resultSet;
        }






    }
})();