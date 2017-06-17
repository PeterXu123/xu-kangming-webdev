(function () {
    angular.module('WAM')
            .config(configuration);
    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/home.html',
                controller: 'homeController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                resolve: {
                    currentUser: checkAdmin
                }

            })
            .when('/admin/users', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }

            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website/:websiteId', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website/:websiteId/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website/:websiteId/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website/:websiteId/page/:pageId', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            // widget routing
            .when('/user/website/:websiteId/page/:pageId/widget', {
                    templateUrl: 'views/widget/templates/widget-list.view.client.html',
                    controller: 'widgetListController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )



            .when('/user/website/:websiteId/page/:pageId/widget/new/video', {
                    templateUrl: 'views/widget/templates/widget-youtube-new.view.client.html',
                    controller: 'widgetNewController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )
            .when('/user/website/:websiteId/page/:pageId/widget/new/image', {
                    templateUrl: 'views/widget/templates/widget-image-new.view.client.html',
                    controller: 'widgetNewController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )
            .when('/user/website/:websiteId/page/:pageId/widget/new/header', {
                    templateUrl: 'views/widget/templates/widget-heading-new.view.client.html',
                    controller: 'widgetNewController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )
            .when('/user/website/:websiteId/page/:pageId/widget/new/text', {
                    templateUrl: 'views/widget/templates/widget-input-new.view.client.html',
                    controller: 'widgetNewController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )


            .when('/user/website/:websiteId/page/:pageId/widget/:widgetId/header', {
                    templateUrl: 'views/widget/templates/widget-heading-edit.view.client.html',
                    controller: 'widgetEditController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )
            .when('/user/website/:websiteId/page/:pageId/widget/:widgetId/image', {
                    templateUrl: 'views/widget/templates/widget-image-edit.view.client.html',
                    controller: 'widgetEditController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )

            .when('/user/website/:websiteId/page/:pageId/widget/:widgetId/youtube', {
                    templateUrl: 'views/widget/templates/widget-youtube-edit.view.client.html',
                    controller: 'widgetEditController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )
            .when('/user/website/:websiteId/page/:pageId/widget/:widgetId/text', {
                    templateUrl: 'views/widget/templates/widget-input-edit.view.client.html',
                    controller: 'widgetEditController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )
            .when('/user/website/:websiteId/page/:pageId/widget/new/text', {
                    templateUrl: 'views/widget/templates/widget-input-new.view.client.html',
                    controller: 'widgetNewController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )
            .when('/user/website/:websiteId/page/:pageId/widget/new/html', {
                    templateUrl: 'views/widget/templates/widget-html-new.view.client.html',
                    controller: 'widgetNewController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )
            .when('/user/website/:websiteId/page/:pageId/widget/:widgetId/html', {
                    templateUrl: 'views/widget/templates/widget-html-edit.view.client.html',
                    controller: 'widgetEditController',
                    controllerAs: 'model',
                    resolve: {
                        currentUser: checkLoggedIn
                }
                }
            )


            .when('/user/website/:websiteId/page/:pageId/widget/:widgetId/search', {
                    templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                    controller: 'flickrController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )
            .when('/user/website/:websiteId/page/:pageId/widget/search/new', {
                    templateUrl: 'views/widget/templates/widget-flickr-search.new.view.client.html',
                    controller: 'flickrController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )
            .when('/user/website/:websiteId/page/:pageId/widget/new', {
                    templateUrl: 'views/widget/templates/widget-chooser.html',
                    controller: 'widgetNewController',
                    controllerAs: 'model',
                    resolve: {
                    currentUser: checkLoggedIn
                }
                }
            )





    }
    function checkLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        userService.checkLoggedIn()
            .then(function(currentUser) {

                if(currentUser == '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            })
        return deferred.promise;
    }

        function checkCurrentUser($q, $location, userService) {
            var deferred = $q.defer();
            userService.checkLoggedIn()
                .then(function(currentUser) {

                    if(currentUser == '0') {
                        deferred.resolve({});

                    } else {
                        deferred.resolve(currentUser);
                    }
                })
            return deferred.promise;
        }

        function checkAdmin($q, $location, userService) {
            var deferred = $q.defer();
            userService.checkAdmin()
                .then(function(currentUser) {

                    if(currentUser == '0') {
                        deferred.resolve({});
                        $location.url('/');

                    } else {
                        deferred.resolve(currentUser);
                    }
                })
            return deferred.promise;
        }
}
)();