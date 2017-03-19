// Note: The LandingCtrl controller for Bloc Jams is registered for the  landing.html template.
// use 'this' instead of $scope to initialize the $scope object
// attach property to 'this'
// $scope properties contain the model/data, that the view will present
(function() {
    function LandingCtrl() {
        this.heroTitle = "Turn the Music Up!";
    }
    
    angular
        // don't need dependencies array here because we retrieve already defined module from app.js.
        .module('blocJams')
        // two parameters. Name and callback function
        // second parameter can also be an array that injects dependencies, the callback function would last item in array
        // name capitalized (object constructors).
        // call .controller() on an module. 
        .controller('LandingCtrl', LandingCtrl);
})();