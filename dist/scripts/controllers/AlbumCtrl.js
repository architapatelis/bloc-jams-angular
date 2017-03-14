// Album Controller 
(function() {
    // inject custom service (Fixtures) as function argument
    function AlbumCtrl(Fixtures, SongPlayer) {
        // call getAlbum() method defined in Fixtures service
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
        }
    
    angular
        .module('blocJams')
        // add Fixtures as a dependency. Therefore service becomes available to the controller 
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
    
})();