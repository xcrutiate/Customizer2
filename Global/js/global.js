var canvas = FabricCanvas.getCanvas();

function del()
{   
    FabricCanvas.deleteObjects();
}

function AddText()
{    
    var text = document.getElementById("TextArea");
    FabricCanvas.addText(text.value);
    
}
function underline()
{
    FabricCanvas.underLine();
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
document.getElementById('textColor').onchange = function handleColorPicker(e) {
    FabricCanvas.editColor(e.target.value);
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
