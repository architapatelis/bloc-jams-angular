/**
* @function timecode
* @desc Filter functions must return another function which takes at least one argument, the input of the filter – in this case, our input is seconds. Convert seconds into time-reable format (X:XX)
*/
// Note: For Bloc Jams, we'll use the filter in the view only, and therefore won't need to inject it as a dependency anywhere.
(function () {
    function timecode() {
        return function(seconds) {
            
            //The parseFloat() function parses a string and returns the number as a number. Note: first character in the specified string must be a number.
            var seconds = Number.parseFloat(seconds);
            
            // when the view first loads, however, time appears as "NaN:NaN". "NaN" means "not a number". We need to change that to '-:--'
            if (Number.isNaN(seconds)) {
                return '-:--';
            }
            
            var output = buzz.toTimer(seconds);
        
            return output;
        };
    }
    
    
    angular
        .module('blocJams')
        .filter('timecode', timecode);
}) ();
