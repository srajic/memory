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
            if (!this.audioFile) {
                return;
            }
            this.player = new TNSPlayer();
            const playerOptions = {
                audioFile: this.audioFile,
                loop: this.loopAudio || false,
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
              
                })
                .catch(err => {
                    console.log("something went wrong...", err);
                });
        },

        playSound() {
            // this.player.pause();
            if (this.audioDisabled) {
                return;
            }
            this.player.play();
        }
    }
};
