(function() {
    angular.module('WAM')
        .controller("movieDetailController", movieDetailController);

    function movieDetailController(searchService, $sce, currentUser, $routeParams, userService) {
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
                model.title = response.Title;
                console.log(response);


            })
        searchService
            .findCommentForMovie(model.movieId, model.title)
            .then(function (movie) {
                model.likes = movie.like;
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
            console.log(model.likes);
            if (model.likes.indexOf(currentUser.username) > -1) {
                model.error = "you have liked it";
                return;
            }
            searchService
                .addLikeToMovie(currentUser.username, model.movieId)
                .then(function(response) {
                    model.message= "like has been added";
                })
            userService
                .addLike(currentUser._id, model.movieId, model.movie.Title)
                .then(function(response) {

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
