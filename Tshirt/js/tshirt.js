

function init()
{
    console.log("Initializing form");
    var tshirtBoard = new TshirtBoard();
    tshirtBoard.initializeCanvas();
}

import drawBoard from "../../Global/js/global.js";

class TshirtBoard extends drawBoard
{
    constructor()
    {
        super();
    }
    initializeCanvas ()
    {
        console.log("Initializing canvas");
        var ctx = this.canvas.getContext("2d");
        var img = document.getElementById("tshirt");
        ctx.drawImage(img,10,10);
    }
}



