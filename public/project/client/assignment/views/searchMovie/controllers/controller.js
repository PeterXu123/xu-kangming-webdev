(function() {
    angular.module('WAM')
        .controller("searchMovieController", searchMovieController);

    function searchMovieController(searchService, $sce, currentUser) {
        var model = this;
         model.currentUser = currentUser;
        console.log(model.currentUser);


        model.searchMovie = searchMovie;
        model.searchMovieById = searchMovieById;

        // model.searchTv = searchTv;
        // model.searchTvById = searchTvById;


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
