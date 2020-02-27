// Globals
var tileWidth   = 270;
var tileHeight  = 270;
var numberTiles = 9;
var animationSpeed = 200;
var isPlaying      = false;

var orderPositions = new Array();
var orderPositionsConst = new Array();
var clickSound     = new Audio("../sound/ClickSound.mp3");
clickSound.volume  = 0.4;
clickSound.load();

/*
* Initializes the puzzle container with all containing puzzle tiles inside.
*/
function initPuzzleContainer() {
    
    for( var i=0; i<numberTiles; i++ ) {
        
        var top  = 0;
        var left = 0;
        var ne   = i; 
        
        // Get the Tile positions
        if( ne >= 0 && ne <= 2 ) {
            // Tiles 1 - 3
            left = tileWidth * ne;
            top  = 0;
        }
        else if( ne >= 3 && ne <= 5 ) {
            // Tiles 4 - 6
            ne = ne-3;
            left = tileWidth * ne;
            top  = tileHeight;
        }
        else if( i >= 6 && i <= 8 ) {
            // Tiles 7 - 9
            ne = ne-6;
            left = tileWidth * ne;
            top  = tileHeight * 2;
        }

        var orderPositionPoint = new Object();
        orderPositionPoint.x = left;
        orderPositionPoint.y = top;

        orderPositions.push( orderPositionPoint );
        orderPositionsConst.push( orderPositionPoint );

        var element = "";

        if( i == 6 ) {
            // Its the transparent tile, it doesn't have a background
            element = '<div id="tile'+ i +'" class="tile" style="left:'+ left +'px; top:'+ top +'px;"></div>';
            $("#puzzleContainer").append( element );
            $("#tile"+i).data( "orderPositionPoint", orderPositionPoint ); 
        }
        else {
            element = '<div id="tile'+ i +'" class="tile" style="left:'+ left +'px; top:'+ top +'px; background: url(./css/img/puzzleslices_'+ i +'.jpg) no-repeat left top;"></div>';
            $("#puzzleContainer").append( element );
            $("#tile"+i).data( "orderPositionPoint", orderPositionPoint ); 
            $("#tile"+i).click( {}, tileClick ); 
        }
        
    }
}

/*
* Click handler for each tile in the container.
*/
function tileClick( event ) {
    if( !isPlaying ) return;

    var curTile   = event.currentTarget.id;

    var curX   = parseInt($( "#" + curTile ).css( "left" ));
    var curY   = parseInt($( "#" + curTile ).css( "top" ));
    var tPoint = getNeighborTilePoint( curX, curY );

    if( tPoint != null ) {
        // Swop the Tile Points
        $( "#tile6").css( "left", curX);
        $( "#tile6").css( "top", curY);
        $( "#" + curTile ).animate( {top: tPoint.y, left: tPoint.x}, animationSpeed, 'swing', animationComplete );
		
        clickSound.play();
    }
}

/*
* Click handler for the start-button.
*/
function startButtonClick( event ) {
    isPlaying = true;
    $("#startButton").css("display","none");
    Clock.startClock();
}

/*
* Click handler for the shuffle-button.
*/
function shuffleButtonClick( event ) {
    $("#startButton").css("display","block");
    $("#winScreen").css("display","none");
    $("#looseScreen").css("display","none");
    shufflePuzzleTiles();
    Clock.resetClock();
    Blink.stopBlinking();
}

/*
* Animation complete function for the tiles inside the container.
*/
function animationComplete() {
    checkPuzzleTileOrder();
}

/*
* Timeout function for the clock's time out.
*/
function clockTimeOutFunction() {
    isPlaying = false;
    $("#looseScreen").css("display","block");
    Blink.startBlinking();
    setStartPuzzleTileOrder();
}

/*
* Function called when the puzzle has finished.
* Sets everything back for a new game start.
*/
function puzzleFinished() {
    isPlaying = false;
    Clock.stopClock();
    Blink.startBlinking();
    $("#winTimeSpan").text( Clock.getFormattedStopTime() );
    $("#winScreen").css("display", "block");
}

/*
* Shuffle function. Shuffles the position's of the tiles to 
* mix them up inside the container.
*/
function shufflePuzzleTiles() {
    orderPositions.sort( randomize );
    orderPositions.sort( randomize );

    for( var i=0; i<numberTiles; i++ ) {
        var point = orderPositions[i];
        $( "#tile" + i ).animate( {top: point.y, left: point.x}, 500, 'swing' );
    }
    
    function randomize ( a, b ) {
        return ( Math.random() > 0.5 ) ? 1 : -1;
    }
}

/*
* Checks whether the transparent tile is a neighbor of the clicked one and returns 
* the current x/y point of the transparent tile.
*/
function getNeighborTilePoint( cx, cy) {
    // Tile 6 is the transparent tile.
    var tx = parseInt( $("#tile6").css( "left" ) ); 
    var ty = parseInt( $("#tile6").css( "top" ) ); 

    var point = {x:tx, y:ty};

    // The left one
    if( tx == cx - tileWidth && ty == cy ) {
        return point;
    }
    // The right one
    if( tx == cx + tileWidth && ty == cy ) {
        return point;
    }
    // The top one
    if( tx == cx && ty == cy - tileHeight ) {
        return point;
    }
    // The bottom one
    if( tx == cx && ty == cy + tileHeight ) {
        return point;
    }

    return null;
}

/*
* Checks the order sequence of the puzzle tiles. When all tiles are in correct
* order, the puzzleFinished function gets executed to finish the game.
*/
function checkPuzzleTileOrder() {
    for( var i=0; i<numberTiles; i++ ) {
        if( hasInitPosition( $( "#tile" + i ) ) == false ) {
            return;
        }
    }

    puzzleFinished();

    function hasInitPosition( tile ) {
        var x = tile.data( "orderPositionPoint" ).x;
        var y = tile.data( "orderPositionPoint" ).y; 
        if( parseInt(tile.css("top")) == y && parseInt(tile.css("left")) == x ) {
            return true;
        }
        return false;
    }
}

/*
* Sets the correct order back to the puzzle tiles in the container.
*/
function setStartPuzzleTileOrder() {
    for( var i=0; i<numberTiles; i++ ) {
        var point = orderPositionsConst[i];
        $( "#tile" + i ).animate( {top: point.y, left: point.x}, 1000, 'swing' );
    }
}

initPuzzleContainer();
Clock.init();
Clock.setTimeOutFunction( clockTimeOutFunction );

Blink.init();
Blink.startBlinking();
