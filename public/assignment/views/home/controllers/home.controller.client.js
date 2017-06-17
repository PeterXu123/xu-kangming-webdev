(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);

    function homeController(currentUser) {
        var model = this;

        console.log(currentUser);
        model.currentUser = currentUser;

    }

})();
