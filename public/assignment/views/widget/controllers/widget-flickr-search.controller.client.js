/**
 * Created by xukan on 6/12/2017.
 */
(function() {
    angular
        .module('WAM')
        .controller('flickrController', flickrController);
    function flickrController(currentUser, $routeParams, $location, flickrService,
    widgetService) {

        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        model.selectPhoto1 = selectPhoto1;


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widgetService
                .findWidgetById(model.widgetId)
                .then(
                    function (response) {
                        selectUpdate(response, url)
                    },
                    function (error) {
                        console.log("1223255")
                        model.error = error.data;
                    }
                );


        }
        function selectPhoto1(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var pageId= model.pageId;
            console.log("hello here");

            //
            // widgetService
            //     .findWidgetById(model.widgetId)
                // .then(
                //     function (response) {
                //         selectAdd(response, url)
                //     },
                //     function (error) {
                //         console.log("1223255")
                //         model.error = error.data;
                //     }
                // );
                // .then
            var widget = {
                widgetType : "IMAGE",
                pageId : model.pageId,
                width : "100%",
                url: ''
            }
            widget.url = url;


            widgetService.createWidget(model.pageId, widget)
                .then(function() {
                    $location.url('/user/' + 'website/' + model.websiteId + '/page/' + model.pageId + '/widget')

                })


        }

        function selectUpdate(response, url) {
            var widget = response;
            widget.url = url;
            widgetService
                .updateWidget(model.widgetId, widget)
                .then(function (response) {
                    console.log("chui a chuia ")
                    $location.url("/user/"  + "website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id + '/image');
                })
        }
        function selectAdd(response, url) {
            var widget = response;
            widget.url = url;
            widgetService
                .createWidget(model.pageId, model.widget)
                .then(function (response) {
                    console.log("chui a chuia1 ")
                    $location.url("/user/" +  "website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id + '/new/image');
                })
        }

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function (response) {

                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }
    }






})();