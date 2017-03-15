// Create a Factory Service (SongPlayer) for Bloc Jams
// Note: we'll get 'song' from the Album View when a user clicks the play button. ngRepeat used in album.html will dictate which song to pass into function

(function () {
    function SongPlayer () {
        /**
        * @desc The service returns this object, making its properties and methods public to the rest of the application
        * @type {Object}
        */
        var SongPlayer = {};
        
        
        /**
        * @desc currently playing song
        * @type {Object}
        */
        // when no song is playing
        var currentSong = null;
        
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
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
                currentSong.playing = null;
            }
            
            // create new Buzz object using song's Url
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            // Set the newly chosen song object as the currentSong
            currentSong = song;
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
        * @function SongPlayer.play - public method
        * @desc play method used by controller to play a song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            // if the currently playing song is not equal to the song the user clicks on
            // null !== song clicked
            // or song playing !== song clicked
            if (currentSong !== song) {
                // call setSong and playSong function
                setSong(song);
                playSong(song);
                
            } else if (currentSong === song) {
                if(currentBuzzObject.isPaused()) {
                    currentBuzzObject.play()
                }
            }
        };
        
        
        /**
        * @function SongPlayer.pause - public method
        * @desc pause method used by controller to pause a song. A song must already be playing, when user clicks pause this method is triggered
        * @param {Object} song
        */
        SongPlayer.pause = function (song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);

}) ();