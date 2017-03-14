// anonymous closure
// $stateProvider: to configure the state behavior
// $locationProvider: to configure how the application handles URL path in the browser
(function () {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode ({
                // to disable hashbang(!#) in URL. So we get a clean URL
                enabled: true,
                // so that we don't need a <base href=""> tag in html. preventing $location error
                requireBase: false
        });
        
        // $stateProvider.state(stateName, stateConfig)
        // e.g. stateName is landing and stateConfig is an object that defines specific properties of the state
        // localhost:3000/
        $stateProvider
            // ui-view directive in global index.html will load template associated with the landing state
            .state('landing', {
                url: '/',
                // Using UI router register/instantiate a controller. Therefore, don't need to set ng-controller on DOM element
                // 'controller as' syntax to handel nested scope
                controller: 'LandingCtrl as landing',
                templateUrl: '/templates/landing.html'
            })
            // localhost:3000/album
            // ui-view directive in the global file will load album template
            .state('album', {
                url: '/album',
                controller: 'AlbumCtrl as album',
                templateUrl: '/templates/album.html'     
            })
            
            .state('collection', {
                url: '/collection',
                controller: 'CollectionCtrl as collection',
                templateUrl: '/templates/collection.html'
        });
    }
    
// After we add an external module's script source, we can inject the module into the application by adding it to dependency array.
angular
    .module('blocJams', ['ui.router'])
    .config(config);
    
})();