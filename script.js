
// Variables

var i = 0;                    // (height / column)
var j = 0;                    // (width / row)

//var tile;
//var currentId;
//let img;
//let x;
//let y;
//let z;

window.onload = function () {
setGame();
}

const clearBoard = document.getElementById("button");
clearBoard.addEventListener("click", pageReload);
function pageReload () {
    location.reload();                 // source: https://stackoverflow.com/questions/64387214/how-can-i-reset-a-particular-element-without-reloading-page-on-clicking-button
}

function setGame() {                   // set up the grid for the game board in html 8x8 = 64 tiles    // source: https://youtu.be/ej8SatOj3V4?si=oUI5sU4glZS1rNoO
    for(i = 0; i < 8; i++) {                                // i goes from 0 to 7, stops at 8 (height / column)
        for(j = 0; j < 8; j++) {                            // j goes from 0 to 7, stops at 8 (width / row)
            var tile = document.createElement("div");            // "0-63" <div> tags created in javascript
            tile.id = i + "-" + j;                               // ...with id to know which tile is clicked on
            //tile.id.toString();
            tile.addEventListener("click", selectTile);
            document.getElementById("gameboard").append(tile);   // append shows elements and strings rather than appendChild that only shows elements
            if (i % 2 !== j % 2) {                               // <--- source: https://stackoverflow.com/questions/16684004/simple-javascript-chess-board
                tile.style.backgroundColor = "coral";
            } else {
                tile.style.backgroundColor = "rgb(227, 227, 199)";
            }
            tile.innerText = tile.id;                            // prints the id of the tile
        }
    }
    
    function selectTile(event) {                                    // target is the element that triggered the event (e.g., the user clicked on)
        var currentId = event.target.id;                        // event.target.id gives the id attribute. // source: https://stackoverflow.com/questions/48239/getting-the-id-of-the-element-that-fired-an-event
        document.getElementById("info").innerText = currentId;
        let img = document.createElement("img");
        img.src = "https://www.svgrepo.com/show/321255/queen-crown.svg";
        document.getElementById(currentId).append(img);
        img.style.width = "55px";
        this.removeEventListener("click", selectTile);  // for no multiplication | source: https://stackoverflow.com/questions/4402287/how-can-i-remove-a-javascript-event-listener
        
        for(i = 0; i < 8; i++) {
            for(j = 0; j < 8; j++) {
                if (currentId == i + "-" + j) {
                    let x = i;
                    let y = j;
                    let z = document.getElementById(i + "-" + j);

                    function show_Moves() {
                        z = document.getElementById(x + "-" + y);
                        z.style.backgroundColor = "cyan";
                        z.style.opacity = "50%";
                        z.removeEventListener("click", selectTile);
                    }
                    
                    for(x = 0; x < 8; x++) {                         // (height / column) TopBottom
                        show_Moves();
                    }
                    x = i; // resets value
                    for(y = 0; y < 8; y++) {                         // (width / row) LeftRight
                        show_Moves();
                    }
                    y = j; // resets value
                    while ((x !== 8) || (y !== 8)) {                // to RightBottom  // if x|y = 7, stops at 7, without giving it color
                        show_Moves();
                        x++;
                        y++;
                    }
                    x = i; // reset
                    y = j; // reset
                    while ((x !== -1) || (y !== -1)) {              // to LeftTop // if x|y = 0, stops at 0, without giving it color
                        show_Moves();
                        x--;
                        y--;
                    }
                    x = i;
                    y = j;
                    while ((x !== -1) || (y !== 8)) {              // to RightTop
                        show_Moves();
                        x--;
                        y++;
                    }
                    x = i;
                    y = j;
                    while ((x !== 8) || (y !== -1)) {              // to LeftBottom
                        show_Moves();
                        x++;
                        y--;
                    }
                    x = i;
                    y = j;
                }
            }
        }
    }
}