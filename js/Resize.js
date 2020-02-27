$(window).resize(matchWindowSize);
    
function matchWindowSize() {

    const windowWidth  = $(window).width();
    const windowHeight = $(window).height();
    const containerWidth  = 1280
    const containerHeight = 852;

    if( windowWidth < containerWidth || windowHeight < containerHeight ) {
        // Window is smaller
        let percentW = (windowWidth * 100 / containerWidth);
        let percentH = (windowHeight * 100 / containerHeight);
        let percent  = percentW < percentH ? percentW : percentH;

        $("#mainContainer").css("transform", "scale("+(percent/100)+")");

        // Re-Position 
        var pos = $("#mainContainer").position();
        $("#mainContainer").css("margin-left", "-"+pos.left+"px");
        $("#mainContainer").css("margin-top", "-"+pos.top+"px");

        // Re-Position on X-Axis
        let newWidth = containerWidth/100 * percent;
        if( windowWidth > newWidth ) {
            let posX = Math.round( -(pos.left) + ((windowWidth-newWidth)/2) );
            $("#mainContainer").css("margin-left", posX+"px");
        }

        if( windowWidth > containerWidth ) {
            // Lets center horizontal
            let posX = Math.round( (windowWidth-containerWidth)/2 );
            $("#mainContainer").css("margin-left", posX+"px");
        }
    }
    else {
        $("#mainContainer").css("transform", "scale(1)");
        $("#mainContainer").css("margin-left", "auto");
        $("#mainContainer").css("margin-right", "auto");
        $("#mainContainer").css("margin-top", "20px");
    }
}