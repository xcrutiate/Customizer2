var canvas = FabricCanvas.getCanvas();
var panning = false;
var panningOn = false;

function del()
{   
    FabricCanvas.deleteObjects();
}

function changeCanvasMode()
{
    FabricCanvas.changeCanvasMode(document.getElementById('mode').value);
}
function changeFontSize()
{
    FabricCanvas.changeFontSize(document.getElementById('fontSize').value);
}

function AddText()
{    
    var text = document.getElementById("TextArea");
    var color = document.getElementById("textColor");
    var fontFamily = document.getElementById("fontFamily");
    var fontSize = document.getElementById("fontSize");
    
    FabricCanvas.addText(text.value,fontFamily.value,100,100,color.value, fontSize.value);
    
}
function underline()
{
    FabricCanvas.underLine();
}
function strikeThrough()
{
    FabricCanvas.strikeThrough();
}
function bold()
{
    FabricCanvas.bold();
}
function italics()
{
    FabricCanvas.italics();
}

function sendToBack()
{
    FabricCanvas.sendToBack();
}
function bringForward()
{   
    FabricCanvas.bringToFront();
}
function flip()
{
    FabricCanvas.flip();
}
function editFontFamily()
{
    FabricCanvas.editFontFamily(fontFamily.value);
}
function togglePanMode()
{
    panningOn = !panningOn;
}
function colorChange()
{
    var textColor = document.getElementById('textColor');
    FabricCanvas.editColor(textColor.value);
}
function drawShape()
{
    var shape = document.getElementById('shape');
    var color = document.getElementById('shapeColor');
    FabricCanvas.drawShape(shape.value,color.value);
}
document.getElementById('file').onchange = function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) { 
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {            
            var image = new fabric.Image(imgObj);
            image.set({
                left: 10,
                top: 10,
                angle: 0,
                padding: 0,
                cornersize: 0
            });
            var aspectRatio = image.height/image.width;
            var newHeight =  aspectRatio * 200;
            image.set({
                width: 200,
                height: newHeight
            });
            canvas.add(image);
        }        
    }
    reader.readAsDataURL(e.target.files[0]);
}

document.onkeydown = function(e)
{
     
    switch(e.keyCode)
    {
        case 46: FabricCanvas.deleteObjects();
            break;
        case 37:            
            FabricCanvas.moveAround("left");
            break; 
        case 38: FabricCanvas.moveAround("up");
            break; 
        case 39: FabricCanvas.moveAround("right");
            break; 
        case 40: FabricCanvas.moveAround("down");
            break; 

    }
}
$(function(){
    $('#zoomIn').click(function(){
        canvas.setZoom(canvas.getZoom() * 1.1 ) ;
    }) ;

    $('#zoomOut').click(function(){
        canvas.setZoom(canvas.getZoom() / 1.1 ) ;
    }) ;
});

//Canvas Event Handlers
canvas.on('mouse:up', function (e) {
    panning = false;
});
canvas.on('mouse:down', function (e) {
    panning = true;
});
canvas.on('mouse:move', function (e) {
    if (panning && e && e.e && panningOn) {
        var units = 10;
        var delta = new fabric.Point(e.e.movementX, e.e.movementY);
        canvas.relativePan(delta);
        canvas.selection = false;
    }
    if(!panningOn)
    {
        canvas.selection = true;
    }
});