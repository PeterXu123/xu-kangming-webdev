(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);

    function homeController(currentUser, searchService, $sce, userService, $location) {
        var model = this;

        console.log(currentUser);
        model.currentUser = currentUser;
        model.logout = logout;

        // model.findRecentMovie = findRecentMovie;

        function init() {
            searchService.findRecentMovie()
                .then(function(data) {
                    model.movies = data.results;
                })
        }
        init();
        function logout() {
            userService.logout()
                .then(function() {
                    $location.url('/login');
                })
        }






        //
        // function findRecentMovie() {
        //     var url = "https://api.themoviedb.org/3/movie/popular?api_key=b98a14ef11eb47f3e7515a284f1a6371&language=en-US&page=1";
        //     searchService
        //         .findRecentMovie()
        //         .then(function(data) {
        //             console.log(data);
        //             model.recentMovies = data;
        //         })
        //     return $sce.trustAsResourceUrl(url);
        //
        // }







    }

})();
