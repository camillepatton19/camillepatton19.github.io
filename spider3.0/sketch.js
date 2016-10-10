var speed = 30;
var indexX = 0;
var indexY = 0;
var whichString = 0;
var webColor;
var web = [];
var currentWeb = 0;

function setup() {
  createCanvas(1000, 1000);

  var colors = prompt("Would you like the web to be green or blue or red?");
  if (colors == "green") {
    webColor = color(0, 255, 0);
  } else if (colors == "blue") {
    webColor = color(0, 0, 255);
  } else if (colors == "red") {
    webColor = color(255, 0, 0);
  }
  web[0] = new SpiderWeb(0, 55, 1000);
  setWhichWebIsActive(currentWeb);

}


function setWhichWebIsActive(number) {
  for (var i = 0; i < web.length; i++) {
    web[i].isWebActive = false;
  }
  web[number].isWebActive = true;
}

function mouseClicked() {
  web.push(new SpiderWeb(mouseX, 100, 100));
  setWhichWebIsActive(web.length - 1);
  console.log(web.length - 1);
}

function draw() {
  background(255, 255, 255);
  strokeWeight(1);
  for (var i = 0; i < web.length; i++) {
    web[i].display();
    web[0].spiderMovement();
  }
  strokeWeight(4);
  console.log(indexX);

  console.log(web[0].isSpiderDone());
}


function SpiderWeb(xVal, yVal, wVal) {
  this.x = xVal;
  this.w = wVal;
  this.y = yVal;
  this.isWebActive = false;
  this.indexX = 0;
  this.indexY = 0;
  this.whichString = 0;



  this.spiderMovement = function() {
    //top left to bottom right
    if (this.whichString === 0) {
      this.indexY += speed;
      this.indexX += speed;
      if (this.indexX > this.w) {
        this.indexX = this.w;
        this.indexY = this.w;
        this.whichString = 1;
      }
      this.isWebActive = true;
    } else if (this.whichString == 1) {
      this.indexX = this.indexX - speed;
      this.indexY = this.w;
      if (this.indexX < this.x + this.w / 2) {
        this.indexX = this.w / 2;
        this.whichString = 2;
        //console.log(whichString);
      }
    } else if (this.whichString == 2) {
      this.indexX = this.w / 2;
      this.indexY = this.indexY - speed;
      if (this.indexY < this.x) {
        this.indexY = this.x;
        this.whichString = 3;
      }
    } else if (this.whichString == 3) {
      this.indexX = this.indexX + speed;
      this.indexY = this.x;
      if (this.indexX > this.w) {
        this.indexX = this.w;
        this.whichString = 4;
      }
    } else if (this.whichString == 4) {
      this.indexX = this.indexX - speed;
      this.indexY = this.indexY + speed;
      if (this.indexX < this.x) {
        this.indexX = this.x;
        this.indexY = this.w;
        this.whichString = 5;
      }
    } else if (this.whichString == 5) {
      this.indexX = this.x;
      this.indexY = this.indexY - speed;
      if (this.indexY < this.x + this.w / 2) {
        this.whichString = 6;
      }
    } else if (this.whichString == 6) {
      this.indexX = this.indexX + speed;
      this.indexY = this.x + this.w / 2;
      if (this.indexX > this.w) {
        this.indexX = this.w;
        this.whichString = 7;
      }
    }
    if (this.isWebActive === true) {
      spider.display(this.indexX, this.indexY);
    }
  }
  this.isSpiderDone = function() {
    if (whichString > 6) {
      return true;
    } else {
      return false;
    }
  }
  this.display = function() {
    stroke(webColor);
    var x = this.x;
    var w = this.w;
    var indexX = this.indexX;
    var indexY = this.indexY;
    var whichString = this.whichString;

    if (whichString === 0) {
      line(x, x, x + indexX, x + indexY);
    } else if (whichString == 1) {
      line(x, x, x + w, x + w);
    } else if (whichString == 2) {
      line(x, x, x + w, x + w);
      line(x + w / 2, x + w, indexX, indexY);
    } else if (whichString == 3) {
      line(x, x, x + w, x + w);
      line(x + w / 2, x + w, x + w / 2, x);
    } else if (whichString == 4) {
      line(x, x, x + w, x + w);
      line(x + w / 2, x + w, x + w / 2, x);
      line(x + w, x, indexX, indexY);
    } else if (whichString == 5) {
      line(x, x, x + w, x + w);
      line(x + w / 2, x + w, x + w / 2, x);
      line(x + w, x, x, x + w);
    } else if (whichString == 6) {
      line(x, x, x + w, x + w);
      line(x + w / 2, x + w, x + w / 2, x);
      line(x + w, x, x + w, x + w);
      line(x + w, x, x, x + w);
      line(x, x + w / 2, indexX, indexY);
    } else {
      line(x, x, x + w, x + w);
      line(x + w / 2, x + w, x + w / 2, x);
      line(x + w, x, x + w, x + w);
      line(x + w, x, x, x + w);
      line(x, x + w / 2, indexX, indexY);
    }

    if (this.isWebActive === false) {

    }
    //outer layer of arcs
    //top half arcs right to left

    bezier(x + w / 8 * 7, x + w / 2, x + w / 16 * 11, x + w / 2, x + w / 16 * 11, x + w / 16 * 5, x + w / 4 * 3, x + w / 4);

    bezier(x + w / 4 * 3, x + w / 4, x + w / 16 * 11, x + w / 16 * 5, x + w / 2, x + w / 16 * 5, x + w / 2, x + w / 8);

    bezier(x + w / 2, x + w / 8, x + w / 2, x + w / 16 * 5, x + w / 16 * 5, x + w / 16 * 5, x + w / 4, x + w / 4);

    bezier(x + w / 4, x + w / 4, x + w / 16 * 5, x + w / 16 * 5, x + w / 16 * 5, x + w / 2, x + w / 8, x + w / 2);
    //bottom half arcs left to right

    bezier(x + w / 8, x + w / 2, x + w / 16 * 5, x + w / 2, x + w / 16 * 5, x + w / 16 * 11, x + w / 4, x + w / 4 * 3);

    bezier(x + w / 4, x + w / 4 * 3, x + w / 16 * 5, x + w / 16 * 11, x + w / 2, x + w / 16 * 11, x + w / 2, x + w / 8 * 7);

    bezier(x + w / 2, x + w / 8 * 7, x + w / 2, x + w / 16 * 11, x + w / 16 * 11, x + w / 16 * 11, x + w / 4 * 3, x + w / 4 * 3);

    bezier(x + w / 4 * 3, x + w / 4 * 3, x + w / 16 * 11, x + w / 16 * 11, x + w / 16 * 11, x + w / 2, x + w / 8 * 7, x + w / 2);

    //second layer of arcs top half right to left
    bezier(x + w / 16 * 11, x + w / 2, x + w / 16 * 9, x + w / 2, x + w / 32 * 19, x + w / 32 * 13, x + w / 32 * 21, x + w / 32 * 11);

    bezier(x + w / 32 * 21, x + w / 32 * 11, x + w / 32 * 19, x + w / 32 * 13, x + w / 2, x + w / 16 * 7, x + w / 2, x + w / 16 * 5);

    bezier(x + w / 2, x + w / 16 * 5, x + w / 2, x + w / 16 * 7, x + w / 32 * 13, x + w / 32 * 13, x + w / 32 * 11, x + w / 32 * 11);

    bezier(x + w / 32 * 11, x + w / 32 * 11, x + w / 32 * 13, x + w / 32 * 13, x + w / 16 * 7, x + w / 2, x + w / 16 * 5, x + w / 2);

    //bottom layer of arcs left to right
    bezier(x + w / 16 * 5, x + w / 2, x + w / 16 * 7, x + w / 2, x + w / 32 * 13, x + w / 32 * 19, x + w / 32 * 11, x + w / 32 * 21);

    bezier(x + w / 32 * 11, x + w / 32 * 21, x + w / 32 * 13, x + w / 32 * 19, x + w / 2, x + w / 16 * 9, x + w / 2, x + w / 16 * 11);

    bezier(x + w / 2, x + w / 16 * 11, x + w / 2, x + w / 16 * 9, x + w / 32 * 19, x + w / 32 * 19, x + w / 32 * 21, x + w / 32 * 21);

    bezier(x + w / 32 * 21, x + w / 32 * 21, x + w / 32 * 19, x + w / 32 * 19, x + w / 16 * 9, x + w / 2, x + w / 16 * 11, x + w / 2);

    //farthest layer of web
    bezier(x + w / 2, x, x + w / 2, x + w / 8, x + w / 4 * 3, x + w / 4, x + w, x);

    bezier(x + w, x, x + w / 4 * 3, x + w / 4, x + w / 8 * 7, x + w / 2, x + w, x + w / 2);

    bezier(x + w, x + w / 2, x + w / 8 * 7, x + w / 2, x + w / 4 * 3, x + w / 4 * 3, x + w, x + w);

    bezier(x + w, x + w, x + w / 4 * 3, x + w / 4 * 3, x + w / 2, x + w / 8 * 7, x + w / 2, x + w);

    bezier(x + w / 2, x + w, x + w / 2, x + w / 8 * 7, x + w / 4, x + w / 4 * 3, x, x + w);

    bezier(x, x + w, x + w / 4, x + w / 4 * 3, x + w / 8, x + w / 2, x, x + w / 2);

    bezier(x, x + w / 2, x + w / 8, x + w / 2, x + w / 4, x + w / 4, x, x);

    bezier(x, x, x + w / 4, x + w / 4, x + w / 2, x + w / 8, x + w / 2, x);

  }
}

var spider = {
    display: function(xVal, yVal) {
      var indexX = xVal;
      var indexY = yVal;
      ellipse(indexX, indexY, 50, 50);
      // left legs:
      //leg one
      line(indexX - 10, indexY - 25, indexX - 35, indexY - 25);
      line(indexX - 35, indexY - 25, indexX - 45, indexY - 15);

      //leg two
      line(indexX - 22, indexY - 15, indexX - 35, indexY - 15);
      line(indexX - 35, indexY - 15, indexX - 45, indexY - 5);

      //leg three
      line(indexX - 25, indexY - 5, indexX - 35, indexY - 5);
      line(indexX - 35, indexY - 5, indexX - 45, indexY + 5);

      //leg four
      line(indexX - 25, indexY + 5, indexX - 35, indexY + 5);
      line(indexX - 35, indexY + 5, indexX - 45, indexY + 15);

      //right legs:
      //leg one
      line(indexX + 10, indexY - 25, indexX + 35, indexY - 25);
      line(indexX + 35, indexY - 25, indexX + 45, indexY - 15);

      //leg two
      line(indexX + 22, indexY - 15, indexX + 35, indexY - 15);
      line(indexX + 35, indexY - 15, indexX + 45, indexY - 5);

      //leg three
      line(indexX + 25, indexY - 5, indexX + 35, indexY - 5);
      line(indexX + 35, indexY - 5, indexX + 45, indexY + 5);

      //leg four
      line(indexX + 25, indexY + 5, indexX + 35, indexY + 5);
      line(indexX + 35, indexY + 5, indexX + 45, indexY + 15);

      //eyes
      ellipse(indexX - 7, indexY - 10, 10, 10);
      ellipse(indexX + 7, indexY - 10, 10, 10);

      //smile
      bezier(indexX - 7, indexY + 5, indexX - 5, indexY + 5, indexX + 2, indexY + 5, indexX + 7, indexY + 2);

    }
  }
  // Uniquely defined function that returns a value