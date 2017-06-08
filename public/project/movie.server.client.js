(function() {
    angular
        .module('TMDB')
        .factory('searchService', searchService);
    function searchService($http, $sce) {
        var api = {
            findMovieByName: findMovieByName,
            findMovieById: findMovieById,
            // findTvById: findTvById,
            // findTvByName: findTvByName
        };

        return api;

        function findMovieByName(movieName) {
            // var url = "https://api.themoviedb.org/3/search/movie?api_key=b98a14ef11eb47f3e7515a284f1a6371&language=en-US&query=" +
            //     movieName + "&page=1&include_adult=false";
           var url = "http://www.omdbapi.com/?apikey=8e5e4416&s=" + movieName;


            return $http.jsonp($sce.trustAsResourceUrl(url))
                .then(function (response) {
                    return response.data;
                })


        }
        // function findTvByName(tvName) {
        //     var url = "https://api.themoviedb.org/3/search/tv?api_key=b98a14ef11eb47f3e7515a284f1a6371&language=en-US&query=" +
        //         tvName + "&page=1&include_adult=false";
        //     // var url = "http://www.omdbapi.com/?apikey=8e5e4416&s=" + movieName;
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         })
        //
        //
        // }
        //
        function findMovieById(movieId) {
           //  var url = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=b98a14ef11eb47f3e7515a284f1a6371&language=en-US;"
           var url = "http://www.omdbapi.com/?apikey=8e5e4416&i=" + movieId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })


        }

        // function findTvById(tvId) {
        //     var url = "https://api.themoviedb.org/3/tv/" + tvId + "?api_key=b98a14ef11eb47f3e7515a284f1a6371&language=en-US;"
        //     // var url = "http://www.omdbapi.com/?apikey=8e5e4416&i=" + movieId;
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         })
        //
        //
        // }



    }
})();