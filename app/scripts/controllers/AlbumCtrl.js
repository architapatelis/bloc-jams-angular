(function() {
    // inject custom service (Fixtures) as function argument
    function AlbumCtrl(Fixtures) {
        // call getAlbum() method defined in Fixtures service
        this.albumData = Fixtures.getAlbum();
        }
    
    angular
        .module('blocJams')
        // add Fixtures as a dependency. Therefore service becomes available to the controller 
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
    
})();