// Create a Factory Service (SongPlayer) for Bloc Jams
// Note: we'll get 'song' from the Album View when a user clicks the play button. ngRepeat used in album.html will dictate which song to pass into function

(function () {
    //Inject the Fixtures service into the SongPlayer service. Then use the getAlbum method to store the album information, this will allow us to get index of the song object within the songs array
    function SongPlayer (Fixtures) {
        /**
        * @desc The service returns this object, making its properties and methods public to the rest of the application
        * @type {Object}
        */
        // private attribute
        var SongPlayer = {};
        
        
        /**
        * @desc - private attribute, store current ablum to access index of song in the songs array
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
                
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        // private attribute
        var currentBuzzObject = null;
        
        
        /**
        * @function setSong - private function
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function (song) {
            // Stop the currently playing song, if there is one.
            if(currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            // create new Buzz object using song's Url
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            // Set the newly chosen song object as the currentSong
            SongPlayer.currentSong = song;
        };
        
        
        /**
        * @function playSong - private function
        * @desc call Buzz's own play method on the newly created Buzz object
        * @param {Object} song
        */
        var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @function getSongIndex - private function
        * @desc get index of the song object from the list of songs in the currentAlbum
        @ param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        
        /**
        * @desc currently playing song object from list of songs
        * @type {Object}
        */
        // when no song is playing. 
        //make it a public attribute so that player bar can access the information of the currently playing song
        SongPlayer.currentSong = null;

        
        /**
        * @function SongPlayer.play - public method
        * @desc play method used by controller to play current or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            // assign the value of 'song' or the value of 'SongPlayer.currentSong' to the son variable
            // song = song when we call the method from the song rows
            // song = SongPlayer.currentSong when we call the method from the player bar
            song = song || SongPlayer.currentSong;
            // if the currently playing song is not equal to the song the user clicks on
            // null !== song clicked
            // or song playing !== song clicked
            if (SongPlayer.currentSong !== song) {
                // call setSong and playSong function
                setSong(song);
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                if(currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        
        /**
        * @function SongPlayer.pause - public method
        * @desc pause method used by controller to pause a song. A song must already be playing, when user clicks pause this method is triggered
        * @param {Object} song
        */
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        
        /**
        * @function previous - public function
        * @ desc use the previous button to go to the previous song in the list
        */
        SongPlayer.previous = function() {
            // get index of currently playing song
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
        
            // what should happen when the user is on the first song and clicks the previous button
            if (currentSongIndex < 0) {
                //stop the currently playing song
                currentBuzzObject.stop();
                // set the value of the currently playing song to the first song
                SongPlayer.currentSong.playing = null;
            
            } //If the currentSongIndex is greater than zero
            else {
                //move to the previous song and automatically play it
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        
        return SongPlayer;
    };
    
    
    
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);

}) ();