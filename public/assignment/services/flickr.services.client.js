/**
 * Created by xukan on 6/12/2017.
 */
(function() {
    angular
        .module("WAM")
        .service('flickrService', flickrService);

    function flickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "1d08f8ae9476138220c639e2cffe4acf";
        var secret = "d865bd68c9c01d47";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();