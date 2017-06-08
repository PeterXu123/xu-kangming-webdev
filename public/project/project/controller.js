(function() {
    angular.module('TMDB', [])
        .controller("searchMovieController", searchMovieController);

    function searchMovieController(searchService) {
        var model = this;



        model.searchMovie = searchMovie;
        model.searchMovieById = searchMovieById;
        // model.searchTv = searchTv;
        // model.searchTvById = searchTvById;


        function searchMovie(name) {
            searchService
                .findMovieByName(name)
                .then(function (data) {
                    console.log(data);
                    model.movies = data.Search;

                })


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
