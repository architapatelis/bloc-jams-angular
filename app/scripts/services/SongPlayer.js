// Create a Factory Service (SongPlayer) for Bloc Jams
// The service returns SongPlayer object, making its properties and methods public to the rest of the application

(function () {
    function SongPlayer () {
        var SongPlayer = {};
        
        // when no song is playing
        var currentSong = null;
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        // private function within SongPlayer service
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
        
        
        // create public play() method
        // we'll get 'song' from the Album View when a user clicks the play button. ngRepeat used in Album View template will dictate which song to pass into function
        SongPlayer.play = function(song) {
            // if the currently playing song is not equal to the song the user clicks on
            // null !== song clicked
            // or song playing !== song clicked
            if (currentSong !== song) {
                // call setSong function
                setSong(song);
                // call Buzz's own play method on the newly created Buzz object
                currentBuzzObject.play();
                song.playing = true;
                
            } else if (currentSong == song) {
                if(currentBuzzObject.isPaused()) {
                    currentBuzzObject.play()
                }
            }
        };
        
        // create public pause() method
        // a song must already be playing, when user clicks pause this method is triggered
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