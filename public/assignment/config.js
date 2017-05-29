(function () {
    angular.module('WAM')
            .config(configuration);
    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/profile', {
                templateUrl:'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'model'
            })
            // widget routing
            .when('/user/:userId/website/:websiteId/page/:pageId/widget', {
                    templateUrl: 'views/widget/templates/widget-list.view.client.html',
                    controller: 'widgetListController',
                    controllerAs: 'model'
                }
            )

            .when('/user/:userId/website/:websiteId/page/:pageId/widget/new', {
                    templateUrl: 'views/widget/templates/widget-chooser.html',
                    controller: 'widgetListController',
                    controllerAs: 'model'
                }
            )

            .when('/user/:userId/website/:websiteId/page/:pageId/widget/new/video', {
                    templateUrl: 'views/widget/templates/widget-youtube-new.view.client.html',
                    controller: 'widgetNewController',
                    controllerAs: 'model'
                }
            )
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/new/image', {
                    templateUrl: 'views/widget/templates/widget-image-new.view.client.html',
                    controller: 'widgetNewController',
                    controllerAs: 'model'
                }
            )
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/new/header', {
                    templateUrl: 'views/widget/templates/widget-heading-new.view.client.html',
                    controller: 'widgetNewController',
                    controllerAs: 'model'
                }
            )


            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/header', {
                    templateUrl: 'views/widget/templates/widget-heading-edit.view.client.html',
                    controller: 'widgetEditController',
                    controllerAs: 'model'
                }
            )
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/image', {
                    templateUrl: 'views/widget/templates/widget-image-edit.view.client.html',
                    controller: 'widgetEditController',
                    controllerAs: 'model'
                }
            )

            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/youtube', {
                    templateUrl: 'views/widget/templates/widget-youtube-edit.view.client.html',
                    controller: 'widgetEditController',
                    controllerAs: 'model'
                }
            )





    }
}
)();