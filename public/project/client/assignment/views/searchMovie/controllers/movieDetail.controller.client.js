(function() {
    angular.module('WAM')
        .controller("movieDetailController", movieDetailController);

    function movieDetailController(searchService, $sce, currentUser, $routeParams) {
        var model = this;
        model.currentUser = currentUser;
        console.log(model.currentUser);
        model.movieId = $routeParams['movieId'];



        model.searchMovie = searchMovie;
        model.searchMovieById = searchMovieById;
        model.searchCommentForMovie = searchCommentForMovie;
        model.searchLikeForMovie = searchLikeForMovie;
        model.addCommentToMovie = addCommentToMovie;
        model.addLikeToMovie = addLikeToMovie;

        // model.searchTv = searchTv;
        // model.searchTvById = searchTvById;
        searchService
            .findMovieById(model.movieId)
            .then(function(response) {
                model.movie = response;

            })

        function searchLikeForMovie(movieId, movieTitle) {
            searchService
                .findCommentForMovie(movieId, movieTitle)
                .then(function (movie) {
                    model.likes = movie.like;
                })
        }

        function searchCommentForMovie(movieId, movieTitle) {
            console.log(movieId);
            console.log(movieTitle);
            searchService
                    .findCommentForMovie(movieId, movieTitle)
                    .then(function(movie) {
                        model.comments = movie.comment;
                    })

        }

        function addLikeToMovie() {
            searchService
                .addLikeToMovie(currentUser.username, model.movieId)
                .then(function(response) {
                    model.message= "like has been added";
                })
        }




        function addCommentToMovie(content) {
            searchService
                .addCommentToMovie(currentUser.username, content, model.movieId)
                .then(function(response) {
                    model.message = "comment has been added";

                })

        }


        function searchMovie(name) {
            var url = "http://www.omdbapi.com/?apikey=8e5e4416&s=" + name;
            searchService
                .findMovieByName(name)
                .then(function (data) {
                    console.log(data);
                    model.movies = data.Search;

                })
            return $sce.trustAsResourceUrl(url);


        }
        // function searchTv(name) {
        //     searchService
        //         .findTvByName(name)
        //         .then(function (data) {
        //             console.log(data);
        //             model.content = data;
        //
        //         })
        //
        //
        // }
        // function searchTvById(id) {
        //     searchService
        //         .findTvById(id)
        //         .then(function (data) {
        //             console.log(data);
        //             model.homepage = data.homepage;
        //             model.content = data;
        //             //60735-the-flash
        //
        //
        //         })
        //
        //
        // }
        function searchMovieById(id) {
            searchService
                .findMovieById(id)
                .then(function (data) {
                    model.movie = data;

                })


        }








    }
})();
