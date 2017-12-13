var FabricCanvas = (function () {
    var canvas;
    var canvasState;
    var front = '../Tshirt/media/front.png';
    var back = '../Tshirt/media/back.png';
    var imgArray = new Array();
    var isFlipped;
 
    function createInstance() {

        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('')[0],
        x = 500,
        y = 650;
        
        var canvas =  new fabric.Canvas('customCanvas', {
            preserveObjectStacking: true,
        });
        

        var sizeX = 500, sizeY = 530;
        var cx,cy;                  //The size of the canvas-Element
        var cleft=0;                //Offset to the left border (to center the canvas-element, if there are borders on the left&right)
        if(x/y > sizeX/sizeY){      //x-diff > y-diff   ==> black borders left&right
            console.log("hello");
            cx = (y*sizeX/sizeY);
            cy = y;
            cleft = (x-cx)/2;
        }else{                      //y-diff > x-diff   ==> black borders top&bottom
            cx = x;
            cy = (x*sizeY/sizeX);
        }
        
        canvas.setBackgroundImage(front,canvas.renderAll.bind(canvas));
        canvas.setDimensions({width:cx, height:cy});        
        canvas.renderAll();
        return canvas;
    }
 
    return {
        getCanvas: function () {
            if (!canvas) {
                canvas = createInstance();
            }
            return canvas;
        },
        exportTemplate: function(mode)
        {
            var frontPath = mode + "front.txt";
            var backPath = mode + "back.txt";
            var frontString , backString;
            
            frontString = isFlipped? JSON.stringify(canvasState): JSON.stringify(canvas.toJSON());
            backString =  !isFlipped? JSON.stringify(canvasState): JSON.stringify(canvas.toJSON());

            var a = document.createElement("a");
            var file = new Blob([frontString], {type: 'text/plain'});
            a.href = URL.createObjectURL(file);
            a.download = frontPath;
            a.click();

            file = new Blob([backString], {type: 'text/plain'});
            a.href = URL.createObjectURL(file);
            a.download = backPath;
            a.click();            
        },
        changeCanvasMode: function(mode)
        {
            var imgPath = '';
            canvas.clear();
            canvasState = null;
            switch(mode)
            {
                case "1":
                front = '../Tshirt/media/front.png';
                back = '../Tshirt/media/back.png';
                break;
                case "2":
                front = '../BusinessCard/media/card_front.png';
                back = '../BusinessCard/media/card_back.png';
                break;
                case "3":
                front = '../PaperBag/media/front.png';
                back = '../PaperBag/media/back.png';
                break;
                case "4":
                front = '../Mug/media/coffeemug1.png';
                back = '';
                break;
                case "5":
                front = '../WeddingCard/media/wcard_front.png';
                back = '../WeddingCard/media/wcard_back.png';
                break;
                case "6":
                front = '../WeddingCard/media/wcard2_front.png';
                back = '../WeddingCard/media/wcard2_back.png';
                break;
                case "7":
                front = '../Envelope/media/front.png';
                back = '../Envelope/media/back.png';
                break;
            }
            imgPath = isFlipped? back:front;
            canvas.setBackgroundImage(imgPath,canvas.renderAll.bind(canvas));
            canvas.renderAll();
        },
        deleteObjects: function ()
        {
            var activeGroup = canvas.getActiveGroup();
            if(activeGroup)
            {
                var objectsInAGroup = activeGroup.getObjects();
                canvas.discardActiveGroup(activeGroup);
                objectsInAGroup.forEach(function(element) {
                   canvas.remove(element); 
                });
            }
            else
            {
                canvas.remove(canvas.getActiveObject());
            }
        },
        sendToBack: function ()
        {
            var obj = canvas.getActiveObject();    
            var activeGroup = canvas.getActiveGroup();
            if(activeGroup)
            {
                var objectsInAGroup = activeGroup.getObjects();
                canvas.discardActiveGroup(activeGroup);
                objectsInAGroup.forEach(function(element) {
                    canvas.sendToBack(element);
                });
            }
            else
            {
                canvas.sendToBack(obj);
            }
        },
        bringToFront: function ()
        {
            var obj = canvas.getActiveObject();    
            var activeGroup = canvas.getActiveGroup();
            if(activeGroup)
            {
                var objectsInAGroup = activeGroup.getObjects();
                canvas.discardActiveGroup(activeGroup);
                objectsInAGroup.forEach(function(element) {
                    canvas.bringToFront(element);
                });
            }
            else
            {
                canvas.bringToFront(obj);
            }
        },
        addText: function (txt, fontFamily, x,y, color, fontSize)
        {            
            var canvasTxt = new fabric.Textbox(txt, { 
                fontFamily: fontFamily,
                left: x,
                top: y,
                objecttype: 'text',
                fontSize: fontSize
              });
            canvasTxt.setColor(color);
            canvas.add(canvasTxt);
            return canvasTxt;
        },
        changeFontSize: function(size)
        {
            var txt = canvas.getActiveObject();            
            if(txt)
            {
                txt.fontSize = size;
            }
            canvas.renderAll();
        },
        toImage: function()
        {
            var frontImg, backImg;
            console.log(canvas.getZoom());
            if(isFlipped)
            {
                imgArray[1] = canvas.toDataURL({format: 'png', multiplier: 2});   
            }
            else
            {
                imgArray[0] = canvas.toDataURL({format: 'png', multiplier: 2}); 
            }
            return imgArray;
        },
        editText: function(text)
        {
            var txt = canvas.getActiveObject(); 

            if(text)
            {
                txt.setText(text);
            }
            canvas.renderAll();
        },
        editColor: function(color)
        {
            var txt = canvas.getActiveObject();
            if(color)
            {
                txt.setColor(color);
            }
            canvas.renderAll();
        },
        editWeight: function(weight)
        {
            var txt = canvas.getActiveObject();
            if(weight)
            {
                txt.fontWeight = weight;
            }
            canvas.renderAll();
        },
        editFontFamily: function(fontFamily)
        {
            var txt = canvas.getActiveObject();
            if(fontFamily)
            {
                txt.fontFamily = fontFamily;
            }
            canvas.renderAll();
        },
        underLine: function()
        {
            var txt = canvas.getActiveObject();
            if(txt['textDecoration']==='underline')
            {
                txt.setTextDecoration('');
            }
            else
            {
                txt.setTextDecoration('underline');
            }
            
            canvas.renderAll();
        },
        strikeThrough: function()
        {
            
            var txt = canvas.getActiveObject();
            if(txt['textDecoration']==='line-through')
            {
                txt.setTextDecoration('');
            }
            else
            {
                txt.setTextDecoration("line-through");
            }
            
            canvas.renderAll();
        },
        bold: function()
        {
            var txt = canvas.getActiveObject();
            console.log((txt['fontWeight']==='bold'));
            if(txt['fontWeight']==='bold')
            {
                txt['fontWeight'] = '';
            }
            else
            {
                txt['fontWeight'] = 'bold';
            }
            
            canvas.renderAll();
        },
        italics: function()
        {
            var txt = canvas.getActiveObject();
            if(txt['fontStyle']==='italic')
            {
                txt['fontStyle'] ='';
            }
            else
            {
                txt['fontStyle'] ='italic';
            }
            
            canvas.renderAll();
        },
        moveAround: function(direction)
        {
            var objects = canvas.getActiveGroup();
            var obj = canvas.getActiveObject();
            if(objects)
            {
                switch (direction)
                {                    
                    case "up":
                        objects.setTop(objects.getTop() - 5);
                        break;
                    case "down":
                        objects.setTop(objects.getTop() + 5);
                        break;
                    case "left":
                        objects.setLeft(objects.getLeft() - 5);
                        break;
                    case "right":
                        objects.setLeft(objects.getLeft() + 5);
                        break;
                }
                objects.setCoords();
            }
            else if(obj)
            {
                switch (direction)
                {
                    case "up":
                        obj.setTop(obj.getTop() - 5);
                        break;
                    case "down":
                        obj.setTop(obj.getTop() + 5);
                        break;
                    case "left":
                        obj.setLeft(obj.getLeft() - 5);
                        break;
                    case "right":
                        obj.setLeft(obj.getLeft() + 5);
                        break;
                }
                obj.setCoords();
            }
            canvas.renderAll();
        },
        flip: function(flipped)
        {
            var flip;
            isFlipped = flipped;
            if(canvasState)
            {                
                flip = canvasState;
                canvasState = canvas.toJSON();
                canvas.clear();
                canvas.loadFromJSON(flip, canvas.renderAll.bind(canvas));
            }
            else
            {       
                canvasState = canvas.toJSON();                
                canvas.clear();
                canvas.setBackgroundImage(flipped?back:front,canvas.renderAll.bind(canvas));
                canvas.renderAll();                
            }            
        },
        drawShape: function(shape, color)
        {
            var shapeToBeDrawn;
            switch(shape)
            {
                case "rectangle":
                    shapeToBeDrawn = new fabric.Rect({
                        left: 100,
                        top: 100,
                        fill: '',
                        width: 50,
                        height: 50,
                        fill: color,
                        strokeWidth: 3,
                    });
                    break;
                case "ellipse":
                    shapeToBeDrawn = new fabric.Ellipse({
                        left: 100,
                        top: 100,
                        fill: '',
                        rx: 50,
                        ry: 25,
                        fill: color,
                        strokeWidth: 3,
                    });
                    break;
                case "circle":
                shapeToBeDrawn = new fabric.Circle({
                    left: 100,
                    top: 100,
                    fill: '',
                    radius: 50,
                    fill: color,
                    strokeWidth: 3,
                });
                break;
                case "triangle":
                shapeToBeDrawn =  new fabric.Triangle({
                    width: 20, height: 30, fill: '', left: 100, top: 100,fill: color
                  });
                break;
            }
            canvas.add(shapeToBeDrawn);
        },
       
    };
})();