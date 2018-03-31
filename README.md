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
//Buttons and similar elements are drawn in CORNER mode, text alginment can be changed

//Area prints a rect where specified. Useful for backgrounds
gui.createArea("area_name",//element label
			0,//x position
			0,//y position
			600,//width
			600,//height
			p.color(100),//p5 color
			callback_function);//callback function

//Button
gui.createButton("button_name",//element label
			"Press me",//text value
			10,//x position
			10,//y position
			200,//width
			30,//height
			p.color(100,0,0),//p5 color
			callback_function,//callback function
			p.color(255));//textcolor
      
//Interactive slider
gui.createSlider("slider_name",//element label
		  10,//initial value (number)
			10,//x position
			50,//y position
			400,//width
			10,//height
			p.color(100,0,0),//p5 color
			callback_function,//callback function
			0,//minimum value
			20);//maximum value
      
//Toggle creates a button that can be either on or off
gui.createToggle("toggle_name",//element label
			true, //state, true or false
			"Press me",//label
			10,//x position
			100,//y position
			200,//width
			30,//height
			p.color(100,0,0),//p5 color
			callback_function,//callback function
			p.color(255);//text p5 color
      
//Radio creates several options in the form of buttons. Only one can be pressed
gui.createRadio("radio_name",//element label
			2, //initial value
			[1,2,3],//available values
			["One","Two","Three"],//labels
			10,//x position
			150,//y position
			500,//width
			30,//height
			p.color(100,0,0),//p5 color
			callback_function,//callback function
			p.color(255));//text p5 color
      
//Text just prints text
gui.createText("text_name",//element label
			"Text to display goes here",//initial value
			10,//x position
			200,//y position
			10,//height will determine text size
			p.color(0),//text p5 color
			callback_function,//callback function
			[p.CENTER,p.TOP],//TEXT ALIGN p5 values
			p.NORMAL);//text style p5
      
//To enable the drawing and interactivity of the elements, you should add the following methods to the usual p5 functions:

p.draw = function() {
  gui.mouseIsPressed(p.mouseIsPressed,p.mouseX,p.mouseY);
  gui.mouseOver(p.mouseX,p.mouseY);
  gui.draw();
  //your code
}
        
p.mousePressed = function() {
  gui.mousePressed(p.mouseX,p.mouseY);
  //your code
}

p.mouseReleased = function() {
  gui.mouseReleased();
  //your code
}

let gui_elements = gui.getGuiElts(); //returns the object to find elements by key


```

## TODO
- Simplify element creation?
- Make interface clearer
