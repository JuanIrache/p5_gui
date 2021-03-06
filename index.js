function P5GUIElements() {
  let p;
  let shadowDist;
  let shadowOp;
  let elts = {};

  function GUIElement(v, xPos, yPos, w, h, cl, cb, z) {
    //very basic button to derive other GUI elements from
    this.value = v || 0;
    this.x = xPos || 0;
    this.y = yPos || 0;
    this.width = w || 100;
    this.height = h || 5;
    this.color = cl || p.color(0, 50, 50);
    this.callback = cb || null;
    this.clicked = false;
    this.removeClick = false;
    this.mouseIsOver = false;
    this.z = z || 0;
  }

  GUIElement.prototype.getValue = function() {
    return this.value;
  };

  GUIElement.prototype.setValue = function(val) {
    this.value = val;
  };

  GUIElement.prototype.draw = function() {
    p.rectMode(p.CORNER);
    p.colorMode(p.HSB);
    p.noStroke();
    p.fill(0, shadowOp);
    p.rect(this.x + shadowDist, this.y + shadowDist, this.width, this.height);
    let mainCol = this.color;
    if (this.mouseIsOver) {
      mainCol = p.color(
        p.hue(this.color),
        p.saturation(this.color) * 0.7,
        p.brightness(this.color)
      );
    }
    p.push();
    if (this.clicked) {
      p.translate(shadowDist, shadowDist);
    }
    p.fill(mainCol);
    p.rect(this.x, this.y, this.width, this.height);
    p.pop();
  };

  GUIElement.prototype.mousePressed = function(mx, my, cb) {
    let callback = cb || this.callback;
    if (
      mx >= this.x &&
      mx <= this.x + this.width &&
      my >= this.y &&
      my <= this.y + this.height
    ) {
      this.clicked = true;
      if (callback) {
        callback(this.value);
        return true;
      }
    }
  };

  GUIElement.prototype.mouseOver = function(mx, my, cb) {
    if (
      mx >= this.x &&
      mx <= this.x + this.width &&
      my >= this.y &&
      my <= this.y + this.height
    ) {
      this.mouseIsOver = true;
      if (cb) {
        let callback = cb;
        callback(this.value);
      }
      return true;
    }
    this.mouseIsOver = false;
    return false;
  };

  GUIElement.prototype.mouseReleased = function() {
    this.clicked = false;
  };

  GUIElement.prototype.mouseIsPressed = function(mp, mx, my, cb) {
    //unclick always if mouse not pressed
    if (!mp || this.removeClick) this.clicked = false;
    this.removeClick = false;
  };

  GUIElement.prototype.unClick = function() {
    //unclick after a short delay
    this.removeClick = true;
  };

  GUIElement.prototype.drawButtonLike = function(
    x,
    y,
    width,
    height,
    color,
    text,
    textCol,
    pressed,
    mouseOver
  ) {
    //mouseOver optional, for radios
    p.noStroke();
    p.fill(0, shadowOp);
    p.rect(x + shadowDist, y + shadowDist, width, height);
    let mainCol = this.color;
    if (this.mouseIsOver || mouseOver) {
      mainCol = p.color(
        p.hue(this.color),
        p.saturation(this.color) * 0.7,
        p.brightness(this.color)
      );
    }
    p.push();
    if (pressed) {
      p.translate(shadowDist, shadowDist);
    }
    p.fill(mainCol);
    p.rect(x, y, width, height);
    p.fill(textCol);
    p.textStyle(p.BOLD);
    p.textAlign(p.CENTER, p.CENTER);
    let textSize = height * 0.8;
    p.textSize(textSize);
    while (p.textWidth(text) > width - shadowDist * 2) {
      //
      textSize *= 0.9;
      p.textSize(textSize);
    }
    p.text(text, x + width / 2, y + height / 2);
    p.pop();
  };

  GUIElement.prototype.setClick = function(click) {
    this.clicked = click == true; //local mouse cordinates
  };

  ////////////////////////////////////////////////////////////////////////////SLIDER
  function Slider(v, xPos, yPos, w, h, cl, cb, mi, ma, z) {
    GUIElement.call(this, v, xPos, yPos, w, h, cl, cb, z);
    this.min = mi;
    this.max = ma;
  }

  Slider.prototype = Object.create(GUIElement.prototype);
  Slider.prototype.constructor = Slider;

  Slider.prototype.draw = function() {
    p.rectMode(p.CORNER);
    p.colorMode(p.HSB);
    p.noStroke();
    p.fill(0, shadowOp);
    p.rect(this.x + shadowDist, this.y + shadowDist, this.width, this.height);
    let baseCol = p.color(
      p.hue(this.color),
      p.saturation(this.color) / 2,
      p.brightness(this.color)
    );
    let mainCol = this.color;
    if (this.mouseIsOver) {
      baseCol = p.color(
        p.hue(this.color),
        (p.saturation(this.color) * 0.7) / 2,
        p.brightness(this.color)
      );
      mainCol = p.color(
        p.hue(this.color),
        p.saturation(this.color) * 0.7,
        p.brightness(this.color)
      );
    }
    p.fill(baseCol);
    p.rect(this.x, this.y, this.width, this.height);
    p.fill(mainCol);
    p.rect(
      this.x,
      this.y,
      this.width * (this.value / (this.max - this.min)),
      this.height
    );
  };

  Slider.prototype.mousePressed = function(mx, my, cb) {
    let callback = cb || this.callback;
    if (
      mx >= this.x &&
      mx <= this.x + this.width &&
      my >= this.y &&
      my <= this.y + this.height
    ) {
      this.clicked = true;
      let pos = p.map(mx, this.x, this.x + this.width, this.min, this.max);
      this.value = Math.min(Math.max(Math.round(pos), this.min), this.max);
      if (callback) {
        callback(this.value);
        return true;
      }
    }
  };

  Slider.prototype.mouseIsPressed = function(mp, mx, my, cb) {
    if (!mp) {
      this.clicked = false;
    } else {
      if (this.clicked) {
        let callback = cb || this.callback;
        let pos = p.map(mx, this.x, this.x + this.width, this.min, this.max);
        this.value = Math.min(Math.max(Math.round(pos), this.min), this.max);
        callback(this.value);
      }
    }
  };

  Slider.prototype.mouseOver = function(mx, my, cb) {
    if (
      mx >= this.x &&
      mx <= this.x + this.width &&
      my >= this.y &&
      my <= this.y + this.height
    ) {
      this.mouseIsOver = true;
      if (cb) {
        let callback = cb;
        let pos = p.map(mx, this.x, this.x + this.width, this.min, this.max);
        let val = Math.min(Math.max(Math.round(pos), this.min), this.max);
        callback(val);
      }
      return true;
    }
    this.mouseIsOver = false;
    return false;
  };

  Slider.prototype.setValue = function(c) {
    if (c <= this.max && c >= this.min) {
      this.value = c;
    }
  };

  ////////////////////////////////////////////////////////////////TOGGLE
  function Toggle(v, t, xPos, yPos, w, h, cl, cb, tc, z, ot) {
    GUIElement.call(this, v, xPos, yPos, w, h, cl, cb, z);
    this.text = t || '';
    this.textCol = tc || p.color(100);
    this.offText = ot;
  }

  Toggle.prototype = Object.create(GUIElement.prototype);
  Toggle.prototype.constructor = Toggle;

  Toggle.prototype.draw = function() {
    p.rectMode(p.CORNER);
    p.colorMode(p.HSB);
    let text = this.text;
    if (!this.value && !this.clicked && this.offText != null)
      text = this.offText;
    this.drawButtonLike(
      this.x,
      this.y,
      this.width,
      this.height,
      this.color,
      text,
      this.textCol,
      this.value || this.clicked
    );
  };

  Toggle.prototype.mousePressed = function(mx, my, cb) {
    if (
      mx >= this.x &&
      mx <= this.x + this.width &&
      my >= this.y &&
      my <= this.y + this.height
    ) {
      let callback = cb || this.callback;
      this.value = !this.value;
      if (callback) {
        callback(this.value);
        return true;
      }
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////RADIO
  function Radio(v, vs, ts, xPos, yPos, w, h, cl, cb, tc, z) {
    GUIElement.call(this, v, xPos, yPos, w, h, cl, cb, z);
    this.values = vs;
    this.texts = ts;
    this.textCol = tc || p.color(100);
    this.mouseOverOne = -1;
  }

  Radio.prototype = Object.create(GUIElement.prototype);
  Radio.prototype.constructor = Radio;

  Radio.prototype.draw = function() {
    p.rectMode(p.CORNER);
    p.colorMode(p.HSB);
    this.values.forEach((val, i, arr) => {
      let relativeX = this.x + (this.width / arr.length) * i;
      let relativeWIdth = this.width / arr.length - shadowDist * 2; //
      this.drawButtonLike(
        relativeX,
        this.y,
        relativeWIdth,
        this.height,
        this.color,
        this.texts[i],
        this.textCol,
        this.value == this.values[i],
        this.mouseOverOne === i
      );
    });
  };

  Radio.prototype.mousePressed = function(mx, my, cb) {
    this.values.forEach((val, i, arr) => {
      let relativeX = this.x + (this.width / arr.length) * i;
      let relativeWIdth = this.width / arr.length - shadowDist * 2;
      if (
        mx >= relativeX &&
        mx <= relativeX + relativeWIdth &&
        my >= this.y &&
        my <= this.y + this.height
      ) {
        let callback = cb || this.callback;
        this.value = this.values[i];
        if (callback) {
          callback(this.value);
          return true;
        }
      }
    });
  };

  Radio.prototype.mouseOver = function(mx, my, cb) {
    //complex mouseover
    let any = -1;
    this.values.forEach((val, i, arr) => {
      let relativeX = this.x + (this.width / arr.length) * i;
      let relativeWIdth = this.width / arr.length - shadowDist * 2;
      if (
        mx >= relativeX &&
        mx <= relativeX + relativeWIdth &&
        my >= this.y &&
        my <= this.y + this.height
      ) {
        any = i;

        if (cb) {
          let callback = cb;
          callback(this.value);
        }
      }
    });
    this.mouseOverOne = any;
    return any !== -1;
  };

  ///////////////////////////////////////////////////////////////BUTTON
  function Button(v, xPos, yPos, w, h, cl, cb, tc, z) {
    GUIElement.call(this, v, xPos, yPos, w, h, cl, cb, z);
    this.textCol = tc || p.color(100);
  }

  Button.prototype = Object.create(GUIElement.prototype);
  Button.prototype.constructor = Button;

  Button.prototype.draw = function() {
    p.rectMode(p.CORNER);
    p.colorMode(p.HSB);
    this.drawButtonLike(
      this.x,
      this.y,
      this.width,
      this.height,
      this.color,
      this.value,
      this.textCol,
      this.clicked
    );
  };

  Button.prototype.mousePressed = function(mx, my, cb) {
    if (
      mx >= this.x &&
      mx <= this.x + this.width &&
      my >= this.y &&
      my <= this.y + this.height
    ) {
      this.clicked = true;
      let callback = cb || this.callback;
      if (callback) {
        callback();
        return true;
      }
    }
  };

  ////////////////////////////////////////////////////////////////////AREA
  function Area(xPos, yPos, w, h, cl, cb, z) {
    GUIElement.call(this, null, xPos, yPos, w, h, cl, cb, z);
  }

  Area.prototype = Object.create(GUIElement.prototype);
  Area.prototype.constructor = Area;

  Area.prototype.draw = function() {
    //optional background color
    p.rectMode(p.CORNER);
    p.colorMode(p.HSB);
    p.noStroke();
    p.fill(this.color);
    p.rect(this.x, this.y, this.width, this.height);
  };

  Area.prototype.mousePressed = function(mx, my, cb) {
    if (
      mx >= this.x &&
      mx <= this.x + this.width &&
      my >= this.y &&
      my <= this.y + this.height
    ) {
      let callback = cb || this.callback;
      if (callback) {
        callback(mx - this.x, my - this.y);
        return true;
      }
    }
  };

  Area.prototype.mouseOver = function(mx, my, cb) {
    if (
      mx >= this.x &&
      mx <= this.x + this.width &&
      my >= this.y &&
      my <= this.y + this.height
    ) {
      this.mouseIsOver = true;
      if (cb) {
        let callback = cb;
        callback(mx - this.x, my - this.y);
      }
      return true;
    }
    this.mouseIsOver = false;
    return false;
  };

  Area.prototype.mouseIsPressed = function(mp, mx, my, cb) {
    if (!mp) {
      this.clicked = false;
    } else {
      if (this.clicked) {
        let callback = cb || this.callback;
        callback(mx - this.x, my - this.y, true); //local mouse cordinates with tolerance to accuracy
      }
    }
  };

  //////////////////////////////////////////////////TEXT
  function Text(v, xPos, yPos, h, cl, cb, ta, ts, z) {
    p.textSize(h);
    this.textStyle = ts || p.NORMAL;
    p.textStyle(this.textStyle);
    let w = p.textWidth(v);
    GUIElement.call(this, v, xPos, yPos, w, h, cl, cb, z);
    this.textAlign = ta || [p.CENTER, p.CENTER];
  }

  Text.prototype = Object.create(GUIElement.prototype);
  Text.prototype.constructor = Text;

  Text.prototype.draw = function() {
    p.colorMode(p.HSB);
    p.noStroke();
    p.fill(this.color);
    p.textSize(this.height);
    p.textStyle(this.textStyle);
    p.textAlign(this.textAlign[0], this.textAlign[1]);
    p.text(this.value, this.x, this.y);
  };
  ///////////////////////////////////////////////////////////////////////
  return {
    createSlider: function(n, v, xPos, yPos, w, h, cl, cb, mi, ma, z) {
      elts[n] = new Slider(v, xPos, yPos, w, h, cl, cb, mi, ma, z);
      return elts[n];
    },
    createToggle: function(n, v, t, xPos, yPos, w, h, cl, cb, tc, z, ot) {
      elts[n] = new Toggle(v, t, xPos, yPos, w, h, cl, cb, tc, z, ot);
      return elts[n];
    },
    createRadio: function(n, v, vs, ts, xPos, yPos, w, h, cl, cb, tc, z) {
      //horizontal radio buttons (interdependent toggles, also)
      elts[n] = new Radio(v, vs, ts, xPos, yPos, w, h, cl, cb, tc, z);
      return elts[n];
    },
    createButton: function(n, v, xPos, yPos, w, h, cl, cb, tc, z) {
      elts[n] = new Button(v, xPos, yPos, w, h, cl, cb, tc, z);
      return elts[n];
    },
    createArea: function(n, xPos, yPos, w, h, cl, cb, z) {
      elts[n] = new Area(xPos, yPos, w, h, cl, cb, z);
      return elts[n];
    },
    createText: function(n, v, xPos, yPos, h, cl, cb, ta, ts, z) {
      //pass textAlign function
      elts[n] = new Text(v, xPos, yPos, h, cl, cb, ta, ts, z);
      return elts[n];
    },
    setup: function(p5, shD, shO) {
      p = p5;
      shadowDist = shD || 2;
      shadowOp = shO || 0.5;
    },
    getGuiElts: function() {
      return elts;
    },
    draw: function() {
      //Sort by z position
      const eltsArr = Object.values(elts);
      eltsArr.sort((a, b) => a.z - b.z);
      for (const elt of eltsArr) {
        //loop through all gui elements
        elt.draw();
      }
    },
    mouseIsPressed: function(mouseIsPressed, mouseX, mouseY) {
      for (let elt in elts) {
        //loop through all gui elements
        elts[elt].mouseIsPressed(mouseIsPressed, mouseX, mouseY);
      }
    },
    mouseOver: function(mouseX, mouseY) {
      for (let elt in elts) {
        //loop through all gui elements
        elts[elt].mouseOver(mouseX, mouseY);
      }
    },
    mousePressed: function(mouseX, mouseY) {
      //Sort by z position
      const eltsArr = Object.values(elts);
      eltsArr.sort((a, b) => b.z - a.z);
      for (const elt of eltsArr) {
        //loop through all gui elements
        //Break when clicked one element
        if (elt.mousePressed(mouseX, mouseY)) break;
      }
    },
    mouseReleased: function() {
      for (let elt in elts) {
        //loop through all gui elements
        elts[elt].mouseReleased();
      }
    },
    empty: function() {
      elts = {};
    }
  };
}

module.exports = P5GUIElements();
