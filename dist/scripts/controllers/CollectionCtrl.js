// controller for the collection page
// bind data from the albumPicasso object (in fixtures.js) to the collection template

(function() {
    function CollectionCtrl(Fixtures) {
        // setup empty array
        this.albums = Fixtures.getCollection(12);
    }
    
    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
    
})();