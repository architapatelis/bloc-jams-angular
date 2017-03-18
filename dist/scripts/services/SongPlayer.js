// Create a Factory Service (SongPlayer) for Bloc Jams
// Note: we'll get 'song' from the Album View when a user clicks the play button. ngRepeat used in album.html will dictate which song to pass into function

(function () {
    //Inject the Fixtures service into the SongPlayer service. Then use the getAlbum method to store the album information, this will allow us to get index of the song object within the songs array
    function SongPlayer ($rootScope, Fixtures) {
        /**
        * @desc The service returns this object, making its properties and methods public to the rest of the application
        * @type {Object}
        * @private
        */
        var SongPlayer = {};

        
        /**
        * @desc - store current ablum to access index of song in the songs array
        * @type {Object}
        * @private
        */
        var currentAlbum = Fixtures.getAlbum();
                
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        * @private
        */
        var currentBuzzObject = null;
        
        
        /**
        * @function setSong 
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        * @private
        */
        var setSong = function (song) {
            // Stop the currently playing song, if there is one.
            if(currentBuzzObject) {
                // no 'song' argument because setSong already has a song argument that stopSong will use.
                stopSong();
            }
            
            // create new Buzz object using song's Url
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            // use Buzz bind() method to add an event listener to the Buzz sound object – in this case, we listen for a timeupdate event.
            // Add the $apply to the SongPlayer.setSong method so that it starts "applying" the time update once we know which song to play
            currentBuzzObject.bind('timeupdate', function() {
                // add a  $rootScope.$apply event in the SongPlayer service. This creates a custom event that other parts of the Angular application can "listen" to.
                $rootScope.$apply(function() {
                    //use Buzz's  getTime() method to get the current time (in seconds) of the song
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            // Set the newly chosen song object as the currentSong
            SongPlayer.currentSong = song;
        };
                
        
        /**
        * @function playSong
        * @desc call Buzz's own play method on the newly created Buzz object
        * @param {Object} song
        * @private
        */
        var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        */
        var autoPlay = function (song) {
            if (SongPlayer.currentTime === SongPlayer.currentSong.duration) {
                var currentSongIndex = getSongIndex(song);
                currentSongIndex++;
                    if(currentSongIndex <= currentAlbum.songs.length - 2) {
                
                        var song = currentAlbum.songs[currentSongIndex];
                        setSong(song);
                        playSong(song);
                    }
            }
        };
        
        /**
        * @function getSongIndex
        * @desc get index of the song object from the list of songs in the currentAlbum
        * @param {Object} song
        * @private
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        
        /**
        * @desc currently playing song object from list of songs
        * @type {Object}
        * @public
        */
        // when no song is playing. 
        //make it a public attribute so that player bar can access the information of the currently playing song
        SongPlayer.currentSong = null;
        
        
        /**
        * @desc current playback time (in seconds) of currently playing song
        * @type {Number}
        * @public 
        */
        SongPlayer.currentTime = null;


        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song. used in on-change attribute in <seek-bar>
        * @param {Number} time
        * @public function
        */
        SongPlayer.setCurrentTime = function (time) {
            if(currentBuzzObject) {
                // uses Buzz library's setTime method to set the playback position in seconds
                currentBuzzObject.setTime(time);
            }
        };
        
        
        /**
        * @desc current volume of song
        * @type {Number}
        * @public
        */
        SongPlayer.volume = 80;
        
        
        /**
        * @function setVolume
        * @desc set the volume of currently playing song
        * @public
        */
        SongPlayer.setVolume = function (volume) {
            if(currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };
        
        
        /**
        * @function SongPlayer.play 
        * @desc play method used by controller to play current or new song
        * @param {Object} song
        * @public
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
                autoPlay(song);
            } else if (SongPlayer.currentSong === song) {
                if(currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            } 
        };
        
        
        /**
        * @function stopSong 
        * @desc stop currently playing song
        * @param {Object} song
        * @private
        */
        var stopSong = function (song) {
            song = song || SongPlayer.currentSong;
            //stop the currently playing song
            currentBuzzObject.stop();
            // set the value of the currently playing song to null
            song.playing = null;
        };
        
        
        /**
        * @function SongPlayer.pause 
        * @desc pause method used by controller to pause a song. A song must already be playing, when user clicks pause this method is triggered
        * @param {Object} song
        * @public
        */
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        
        /**
        * @function next
        * @ desc use the next button to go to the next song in the list
        * @public
        */
        SongPlayer.next = function() {
            // get index of currently playing song
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
        
            // what should happen when the user is on the first song and clicks the previous button
            if (currentSongIndex === currentAlbum.songs.length) {
                stopSong(song);
            } //If the currentSongIndex is greater than zero
            else {
                //move to the previous song and automatically play it
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        
        /**
        * @function previous 
        * @desc use the previous button to go to the previous song in the list
        * @public
        */
        SongPlayer.previous = function() {
            // get index of currently playing song
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
        
            // what should happen when the user is on the first song and clicks the previous button
            if (currentSongIndex < 0) {
                stopSong(song);
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
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);

}) ();