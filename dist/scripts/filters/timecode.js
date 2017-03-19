/**
* @function timecode
* @desc Filter functions must return another function which takes at least one argument, the input of the filter – in this case, our input is seconds. Convert seconds into time-reable format (X:XX)
*/
// Note: For Bloc Jams, we'll use the filter in the view only, and therefore won't need to inject it as a dependency anywhere.
(function() {
    function timecode() {
        return function(seconds) {
            // use buzz library to set a 00:00 time format
            return buzz.toTimer(seconds);
        };
    }
    
    
    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();
