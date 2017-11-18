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
        addText: function (txt, fontFamily, x,y, color)
        {            
            var canvasTxt = new fabric.IText(txt, { 
                fontFamily: 'times new roman',
                left: 100,
                top: 100,
                objecttype: 'text'
              });
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
        }
       
    };
})();