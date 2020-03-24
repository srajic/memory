import { TNSPlayer } from "nativescript-audio";
export default {
    data() {
        return {
            player: ""
        };
    },
    mounted() {
        this.initPlayer();
    },
    methods: {
        initPlayer() {
            // prosiriti webpack sa { from: { glob: "sounds/**/*" } },
            // { from: { glob: "**/*.mp3" } }
            this.player = new TNSPlayer();
            const playerOptions = {
                audioFile: "~/sounds/pop.ogg",
                loop: false,
                completeCallback: function() {
                    console.log("finished playing");
                },
                errorCallback: function(errorObject) {
                    console.log(JSON.stringify(errorObject));
                },
                infoCallback: function(args) {
                    console.log(JSON.stringify(args));
                }
            };
            this.player
                .initFromFile(playerOptions)
                .then(res => {
                    // this.player.getAudioTrackDuration().then(duration => {
                    //   // iOS: duration is in seconds
                    //   // Android: duration is in milliseconds
                    //   console.log(`song duration:`, duration);
                    // });
                })
                .catch(err => {
                    console.log("something went wrong...", err);
                });
        },

        playPopSound() {
            // this.player.pause();
            this.player.play();
        }
    }
};
