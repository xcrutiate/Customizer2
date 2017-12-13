var canvas = FabricCanvas.getCanvas();
var panning = false;
var panningOn = false;

var isFlipped = false;
function del()
{   
    FabricCanvas.deleteObjects();
}

function changeCanvasMode(mode)
{
    if(!mode)
    {
        mode = document.getElementById('mode').value;
    }
    console.log(mode);
    FabricCanvas.changeCanvasMode(mode);
}
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
function exportImage()
{
    var name = "front.png";
    if(isFlipped)
        name = "back.png";

    var link = document.createElement("a");
    var imgData = canvas.toDataURL({    format: 'png',
      multiplier: 4});
    var strDataURI = imgData.substr(22, imgData.length);
    var blob = dataURLtoBlob(imgData);
    var objurl = URL.createObjectURL(blob);
    
    link.download = name;

    link.href = objurl;

   link.click();
}

function changeFontSize()
{
    FabricCanvas.changeFontSize(document.getElementById('fontSize').value);
}
function exportTemplate()
{
    FabricCanvas.exportTemplate(document.getElementById('mode').value);
}
function AddText(text)
{    
    if(!text)
        var text = document.getElementById("TextArea").value;
    var color = document.getElementById("textColor");
    var fontFamily = document.getElementById("fontFamily");
    var fontSize = document.getElementById("fontSize");
    
    FabricCanvas.addText(text,fontFamily.value,100,100,color.value, fontSize.value);
    
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
    isFlipped = !isFlipped;
    FabricCanvas.flip(isFlipped);
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
function refreshPreview()
{
    var frontImg = document.getElementById('front');
    var backImg = document.getElementById('back');
    var a =  FabricCanvas.toImage();
    console.log(a);
    frontImg.src = a[0];
    backImg.src = a[1];
}
function drawShape(shape, color)
{
    if(!shape&&!color)
    {
        var shape = document.getElementById('shape').value;
        var color = document.getElementById('shapeColor').value;        
    }
    FabricCanvas.drawShape(shape,document.getElementById("textColor").value);
}
function putImage(src)
{
    console.log(src);
    var imgObj = new Image();
    imgObj.src = src;
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
            var imageList = document.getElementById('imageCarousel');

            imageList.innerHTML = imageList.innerHTML+ "<div class='col-md-4'><img class='elemimgs' src='" + imgObj.src +"' onclick='putImage(\""+ imgObj.src +"\")' ></div>";
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
    $('#mode').change(function()
    {
        
    });
     
    
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
