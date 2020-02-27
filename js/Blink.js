var Blink = {

    intervalId:0,

    init:function() {
        this.timerFunction = this.timerFunction.bind(this);
    },

    startBlinking:function() {
        this.intervalId = setInterval( this.timerFunction, 600 );
    },

    stopBlinking:function() {
        clearInterval(this.intervalId);
        $("#shuffleButton").removeClass("shuffleButtonOver");
    },

    timerFunction:function() {
        $("#shuffleButton").toggleClass( "shuffleButtonOver" );
    }
}