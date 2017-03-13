// controller for the collection page
// bind data from the albumPicasso object (in fixtures.js) to the collection template
(function () {
    function CollectionCtrl() {
        // setup empty array
        this.albums = [];
        for (var i = 0; i < 12; i++) {
            // create 12 copies of source (albumPicasso)
            this.albums.push(angular.copy(albumPicasso));
        }
    }
    
    angular
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
})();