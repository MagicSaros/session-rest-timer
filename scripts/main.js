class TimeConvert {
    static secondsToMinutesAsString(value) {
        let minutes = Math.floor(value / 60);
        let seconds = value % 60;
        return (minutes >= 10 ? +minutes : "0" + +minutes) + ":" + (seconds >= 10 ? +seconds : "0" + +seconds);
    }

    static minutesToSeconds(value) {
        let seconds = +value.split(':')[0] * 60 + +value.split(':')[1];
        return parseInt(seconds);
    }
}

var app = new Vue({
    el: '#app',
    data () {
        return {
            remainingTime: TimeConvert.secondsToMinutesAsString(0),
            sessionTime: 0,
            restTime: 0,
            inputSessionTimeMinutes: null,
            inputSessionTimeSeconds: null,
            inputRestTimeMinutes: null,
            inputRestTimeSeconds: null,
            isSessionStarted: false,
            isRestStarted: false,
            isSettingsDisplayed: true,
            isAlertDisplayed: false,
            isBackgroundDisplayed: false,
            sessionID: null,
            restID: null
        }
    },
    methods: {
        startSession () {
            if (this.sessionTime > 0) {
                let seconds = this.sessionTime;
                this.remainingTime = TimeConvert.secondsToMinutesAsString(seconds);
                this.isSessionStarted = true;
                this.isRestStarted = false;
                this.isAlertDisplayed = false;
                this.isBackgroundDisplayed = false;
                this.stopEndSessionAudio();
                this.sessionID = setInterval(() => {
                    seconds--;
                    this.remainingTime = TimeConvert.secondsToMinutesAsString(seconds);
                    if (seconds == 0) {
                        this.remainingTime = TimeConvert.secondsToMinutesAsString(seconds);
                        clearInterval(this.sessionID);
                        this.isSessionStarted = false;
                        this.isAlertDisplayed = true;
                        this.isBackgroundDisplayed = true;
                        this.playEndSessionAudio();
                    }
                }, 1000);
            }
        },
        
        startRest () {
            if (this.restTime > 0) {
                let seconds = this.restTime;
                this.remainingTime = TimeConvert.secondsToMinutesAsString(seconds);
                this.isRestStarted = true;
                this.isSessionStarted = false;
                this.isAlertDisplayed = false;
                this.isBackgroundDisplayed = false;
                this.stopEndRestAudio();
                this.restID = setInterval(() => {
                    seconds--;
                    this.remainingTime = TimeConvert.secondsToMinutesAsString(seconds);
                    if (seconds == 0) {
                        this.remainingTime = TimeConvert.secondsToMinutesAsString(seconds);
                        clearInterval(this.restID);
                        this.isRestStarted = false;
                        this.isAlertDisplayed = true;
                        this.isBackgroundDisplayed = true;
                        this.playEndRestAudio();
                    }
                }, 1000);
            }
        },
        
        hideButtons () {
            this.isAlertDisplayed = false;
            this.isBackgroundDisplayed = false;
            this.remainingTime = TimeConvert.secondsToMinutesAsString(this.sessionTime);
        },
        
        submitTime () {
            if (this.inputSessionTimeMinutes == null) this.inputSessionTimeMinutes = 0;
            if (this.inputSessionTimeSeconds == null) this.inputSessionTimeSeconds = 0;
            if (this.inputRestTimeMinutes == null) this.inputRestTimeMinutes = 0;
            if (this.inputRestTimeSeconds == null) this.inputRestTimeSeconds = 0;
            if (isFinite(this.inputSessionTimeMinutes) && isFinite(this.inputSessionTimeSeconds) && isFinite(this.inputRestTimeMinutes) && isFinite(this.inputRestTimeSeconds)) {
                this.sessionTime = parseInt(this.inputSessionTimeMinutes) * 60 + parseInt(this.inputSessionTimeSeconds);
                this.restTime = parseInt(this.inputRestTimeMinutes) * 60 + parseInt(this.inputRestTimeSeconds);
                if (!this.isSessionStarted) {
                    this.remainingTime = TimeConvert.secondsToMinutesAsString(this.sessionTime);
                }
            }
        },

        reset () {
            clearInterval(this.sessionID);
            clearInterval(this.restID);
            this.isSessionStarted = false;
            this.isRestStarted = false;
            this.remainingTime = TimeConvert.secondsToMinutesAsString(0);
        },

        playEndSessionAudio () {
            document.getElementById('endSession').play();
        },

        stopEndSessionAudio () {
            document.getElementById('endSession').pause();
        },

        playEndRestAudio () {
            document.getElementById('endRest').play();
        },

        stopEndRestAudio () {
            document.getElementById('endRest').pause();
        }
    }
});
