// custom directive for seek bar
// For directives, the callback function (in this case, seekBar) is a factory function
(function (){
    function seekBar($document) {
        /**
        * @function calculatePercent
        * @private
        * @desc Calculates the horizontal percent along the seek bar where the event (passed in from the view as  $event) occured.
        * @param seekBar, event
        */
        var calculatePercent = function (seekBar, event) {
            //pageX is a jQuery-specific event value, which holds the X (or horizontal) coordinate at which the event occurred.
            // offset() of this seekBar is determine from left side of the page to the starting point of the seekbar
            var offsetX = event.pageX - seekBar.offset().left;
            // store wdith of entire seek bar
            var seekBarWidth = seekBar.width();
            //find ratio to determine where the fill and thumb should end up
            var offsetXPercent = offsetX / seekBarWidth;
            //make sure percentage isn't less than 0
            offsetXPercent = Math.max(0, offsetXPercent);
            //make sure percentage doesn't exceed 100%
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent; 
        };
        
        
        return {
            // Url from which directive will load a template
            templateUrl: '/templates/directives/seek_bar.html',
            // Specifies what the template should replace. If true, the template replaces the directive's element. If false, the template replaces the contents of the directive's element.
            replace: true,
            // restricts directive to 'element' declaration style
            restrict: 'E',
            //Specifies that a new scope be created for the directive
            scope: { },
            //Think of it as a function that executes when the directive is instantiated in the view. This is where all logic related to DOM manipulation will go.
            // follow this strict order of arguments
            // using 'scope.' define attributes and methods that the directive(seekBar) can use in it's view(seek_bar.html)
            //The second argument is the jqLite-wrapped element that the directive matches.
            link: function(scope, element, attributes) {
                
                /**
                * @desc currently playing song time or the current volume
                * @public
                * @type {Number}
                */
                scope.value = 0;
                
                
                /**
                * @desc max value of fill. default 100.
                * @public
                * @type {Number}
                */
                scope.max = 100;
                
                
                /**
                * @private
                * @desc Holds the element that matches the directive (<seek-bar>) as a jQuery object so we can call jQuery methods on it.
                */
                var seekBar = $(element);
                
                
                /**
                * @function percentString
                * @private
                * @desc calculate seek bar fill ratio
                */
                var percentString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value/max * 100;
                    return percent + "%";
                };
                
                
                /**
                * @function fillstyle
                * @public
                * @desc set the amount the seek bar should be filled
                */
                scope.fillStyle = function () {
                    return {width: percentString()};
                };
                
                /**
                * @function thumbStyle
                * @public
                * @desc updates the position of the seek bar thumb
                */
                scope.thumbStyle = function () {
                    return {left: percentString()};
                };
                
                /**
                * @function onClickSeekBar
                * @public
                * @desc Updates the seek bar value based on the seek bar's width and the location of the user's click on the seek bar.
                * @param click event
                */
                scope.onClickSeekBar = function (event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                
                
                /**
                * @function trackThumb 
                * @public
                * @desc for when a user drags the seek bar thumb
                */
                scope.trackThumb = function() {
                    //attach mousemove to $(document) to make sure that we can drag the thumb after mousing down, even when the mouse leaves the seek bar. Better user experience
                    // event.nameSpace makes the event more specific by attaching a string to the event after a period
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        // uses $apply to constantly apply the change in value of scope.value as the user drags the seek bar thumb.
                        scope.$apply(function() {
                        scope.value = percent * scope.max;
                        });
                    });

                    
                    //we bind the mouseup event with a .thumb namespace.
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };
    }
    
    
    // register directive with module
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
    
    
})();