var canvas =  new fabric.Canvas('canvas', {
    preserveObjectStacking: true,
});
canvas.setBackgroundImage('../Tshirt/media/front.png',canvas.renderAll.bind(canvas));
canvas.renderAll();

function del()
{
    canvas.remove(canvas.getActiveObject());
}

function AddText()
{    
    var text = document.getElementById("TextArea");
    console.log(text.value);
    var canvasTxt = new fabric.IText(text.value, { 
        fontFamily: 'arial black',
        left: 100,
        top: 100,
        objecttype: 'text'
      });
    canvas.add(canvasTxt);
}

function sendToBack()
{
    var obj = canvas.getActiveObject();
    canvas.sendToBack(obj);
}

function bringForward()
{
    var obj = canvas.getActiveObject();
    canvas.bringToFront(obj);
}

document.getElementById('file').onchange = function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) { console.log('fdsf');
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
            canvas.add(image);
        }        
    }
    reader.readAsDataURL(e.target.files[0]);
}