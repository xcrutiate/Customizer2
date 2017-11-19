var FabricCanvas = (function () {
    var canvas;
    var canvasState;
 
    function createInstance() {
        var canvas =  new fabric.Canvas('canvas', {
            preserveObjectStacking: true,
        });
        canvas.setBackgroundImage('../Tshirt/media/front.png',canvas.renderAll.bind(canvas));
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
        flip: function()
        {
            var flip;
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
                canvas.setBackgroundImage('../Tshirt/media/back.png',canvas.renderAll.bind(canvas));
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