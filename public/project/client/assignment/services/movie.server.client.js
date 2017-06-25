(function() {
    angular
        .module('WAM')
        .factory('searchService', searchService);
    function searchService($http, $sce) {
        var api = {
            findMovieByName: findMovieByName,
            findMovieById: findMovieById,
            findRecentMovie: findRecentMovie,
            findImageById: findImageById,
            findCommentForMovie: findCommentForMovie,
            addCommentToMovie: addCommentToMovie,
            addLikeToMovie: addLikeToMovie
            // findTvById: findTvById,
            // findTvByName: findTvByName
        };

        return api;

        function addLikeToMovie(username, movieId) {
            var url ="/api/project/movie/addLike/" + movieId;
            return $http.post(url, {username: username})
                .then(function(response) {
                    return response.data;
                })
        }

        function addCommentToMovie(username, content, movieId) {
            var url = "/api/project/movie/addComment/" + movieId;
            return $http.post(url, {username: username, content: content})
                .then(function(response) {
                    return response.data;
                })

        }

        function findCommentForMovie(movieId, movieTitle) {
            console.log(movieId);
            console.log(movieTitle);
            var url = "/api/project/movie/comment/";
            var title = {title: movieTitle, movieId: movieId};
            return $http.post(url, title)
                .then(function (response) {

                    return response.data;
                },
                function(err) {

                    console.log(err);
                })
        }

        function findImageById(movieId) {
            var url = "https://api.themoviedb.org/3/movie/" + movieId+ "/image?api_key=b98a14ef11eb47f3e7515a284f1a6371&language=en-US";
            return $http.jsonp($sce.trustAsResourceUrl(url))
                .then(function (response) {
                    return response.data;
                })

        }

        function findRecentMovie() {
            var url = "https://api.themoviedb.org/3/movie/popular?api_key=b98a14ef11eb47f3e7515a284f1a6371&language=en-US&page=1";
            return $http.jsonp($sce.trustAsResourceUrl(url))
                .then(function (response) {
                    return response.data;
                })


        }

        function findMovieByName(movieName) {
            // var url = "https://api.themoviedb.org/3/search/movie?api_key=b98a14ef11eb47f3e7515a284f1a6371&language=en-US&query=" +
            //     movieName + "&page=1&include_adult=false";
           var url = "https://www.omdbapi.com/?apikey=8e5e4416&s=" + movieName;


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
           var url = "https://www.omdbapi.com/?apikey=8e5e4416&i=" + movieId;
            return $http.jsonp($sce.trustAsResourceUrl(url))
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