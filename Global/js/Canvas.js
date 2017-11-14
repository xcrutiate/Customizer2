$(function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var isDragging = false;

    function handleMouseDown(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        // set the drag flag
        isDragging = true;
    }

    function handleMouseUp(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        // clear the drag flag
        isDragging = false;
    }

    function handleMouseOut(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        // user has left the canvas, so clear the drag flag
        //isDragging=false;
    }

    function handleMouseMove(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        // if the drag flag is set, clear the canvas and draw the image
        if (isDragging) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, canMouseX , canMouseY );
        }
    }

    $("#canvas").mousedown(function (e) { handleMouseDown(e); });
    $("#canvas").mousemove(function (e) { handleMouseMove(e); });
    $("#canvas").mouseup(function (e) { handleMouseUp(e); });
    $("#canvas").mouseout(function (e) { handleMouseOut(e); });
});