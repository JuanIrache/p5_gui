# p5_gui
Experimental Graphical User Interface for P5js sketches

- Used for creating this SRT log viewer: http://tailorandwayne.com/dji-srt-viewer/

This was created for a specific project, so the interface and capabilities are very dependant on what was needed on that project. Hopefully it can be expanded and improved to fit other needs. Please let me know if you do something with it.

For it to work with P5js, your sketch should be in instance mode: https://github.com/processing/p5.js/wiki/Global-and-instance-mode

## Installation

Using npm:
```shell
$ npm install p5gui
```

## Usage
```js
//Load module
let gui = require('p5gui');

//setup basic parameters
gui.setup(p,//p5js instance
  2,//shadow distance
  .5);//shadow alpha in HSB mode

//then we can start creating elements. Here we assume p is the p5js instance:

//Button
gui.createButton("button_name",
			"Press me",//text value
			xPos,//x position
			yPos,//y position
			width,//width
			height,//height
			p.color(100,0,0),//p5 color
			callback_function,//callback function
			p.color(255));//textcolor
      
//Interactive slider
gui.createSlider("slider_name",
		  10,//initial value (number)
			xPos,//x position
			yPos,//y position
			width,//width
			height,//height
			p.color(100,0,0),//p5 color
			callback_function,//callback function
			0,//minimum value
			20);//maximum value
      
//Toggle creates a button that can be either on or off
gui.createToggle("toggle_name",
			true, //state, true or false
			"Press me",//label
			xPos,//x position
			yPos,//y position
			width,//width
			height,//height
			p.color(100,0,0),//p5 color
			callback_function,//callback function
			p.color(255);//text p5 color
      
//Radio creates several options in the form of buttons. Only one can be pressed
gui.createRadio("radio_name",
			2, //initial value
			[1,2,3],//available values
			["One","Two","Three"],//labels
			xPos,//x position
			yPos,//y position
			width,//width
			height,//height
			p.color(100,0,0),//p5 color
			callback_function,//callback function
			p.color(255));//text p5 color
      
//Text just prints text
gui.createText("text_name",
			"Text to display goes here",//initial value
			xPos,//x position
			yPos,//y position
			height,//height will determine text size
			p.color(0),//text p5 color
			callback_function,//callback function
			[p.CENTER,p.TOP],//TEXT ALIGN p5 values
			p.NORMAL);//text style p5
      
//Area prints a rect where specified. Useful for backgrounds
gui.createArea("area_name",
			xPos,//x position
			yPos,//y position
			width,//width
			height,//height
			p.color(100),//p5 color
			callback_function);//callback function
      
//To enable the drawing and interactivity of the elements, you should add the following methods to the usual p5 functions:

p.draw = function() {
  gui.mouseIsPressed(p.mouseIsPressed,p.mouseX,p.mouseY);
  gui_elts.mouseOver(p.mouseX,p.mouseY);
  gui.draw();
  //your code
}
        
p.mousePressed = function() {
  gui_elts.mousePressed(p.mouseX,p.mouseY);
  //your code
}

p.mouseReleased = function() {
  gui_elts.mouseReleased();
  //your code
}


```

## TODO
- Simplify element creation?
- Make interface clearer
