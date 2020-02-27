var Clock = {

    timeOutFunction:null,
	
	// Time in milliseconds (60000 = 1 Minute)
    MAX_TIME:240000,
	
    startTimeString:"",
    startTime:0,
    stopTime:0,
    intervalId:0,

    setTimeOutFunction:function( tFunc ) {
        this.timeOutFunction = tFunc;
    },

    init:function() {
        this.timerFunction   = this.timerFunction.bind(this);
        this.startTimeString = this.getFormattedTime( this.MAX_TIME );
        $("#timeCount").text(this.startTimeString);
    },

    startClock:function() {
        var date       = new Date();
        this.startTime = date.getTime();
        this.stopTime  = 0;
        this.intervalId = setInterval( this.timerFunction, 50 );
    },

    stopClock:function() {
        this.stopTime = this.getClockTime();
		clearInterval(this.intervalId);
    },

    
    resetClock:function() {
        $("#timeCount").text(this.startTimeString);
        $("#eggClock").css("background", "url(./css/img/Clock1.png) no-repeat left top");
        clearInterval(this.intervalId);
    },

    getClockTime:function() {
        var date = new Date();
        return date.getTime() - this.startTime;
    },

    getFormattedStopTime:function() {
        return this.getFormattedTime( this.stopTime );
    },

    timerFunction:function() {
        var curTime = this.getClockTime();
        if( curTime >= this.MAX_TIME ) {
            // Time is over.
            this.stopClock();
            this.setTimeDisplay( 0, this.MAX_TIME );
            this.timeOutFunction();
        }
        else this.setTimeDisplay( this.MAX_TIME - curTime, curTime );
    },

    setTimeDisplay:function( remainingTime, currentTime ) {
        $("#timeCount").text( this.getFormattedTime( remainingTime ) );

        let ni = 5; // Number Clock-Images -1
        let t  = currentTime / 1000;
        let timeGap = Math.round((this.MAX_TIME/1000)/ni);

        if( t >= 0  && t < timeGap )  $("#eggClock").css("background", "url(./css/img/Clock1.png) no-repeat left top");
        if( t >= timeGap  && t < timeGap*2 )  $("#eggClock").css("background", "url(./css/img/Clock2.png) no-repeat left top");
        if( t >= timeGap*2  && t < (timeGap*3)-1 )  $("#eggClock").css("background", "url(./css/img/Clock3.png) no-repeat left top");
        if( t >= timeGap*3  && t < (timeGap*4)-1 )  $("#eggClock").css("background", "url(./css/img/Clock4.png) no-repeat left top");
        if( t >= timeGap*4  && t < (timeGap*5)-1 )  $("#eggClock").css("background", "url(./css/img/Clock5.png) no-repeat left top");
        if( t >= (timeGap*5)-1 )  $("#eggClock").css("background", "url(./css/img/Clock6.png) no-repeat left top");
    },
	
    getFormattedTime:function( timeInMS ) {
        var std,min,sec;
        var timestr = "0:00";
        
        if( timeInMS >= 0 ) {
            // First we have to round up the milliseconds to a full second value
            var seconds = Math.ceil( timeInMS/1000 );
            timeInMS = seconds * 1000;
            
            std = ( timeInMS/60 )/60/1000;
            std = Math.floor( std ); // = hours
            
            min = ( (timeInMS/60)/1000 )%60;
            min = Math.floor( min ); // = minutes
            
            min += std*60;
            
            timestr = ""+min;
            
            sec = (timeInMS/1000)%60;
            sec = Math.floor( sec ); // = seconds
            (sec<10) ? timestr += ":0"+sec : timestr += ":"+sec;
        }
        
        return timestr;
    }
};