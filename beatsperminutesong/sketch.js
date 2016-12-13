// var s = second();
// text("Current second: \n" + s, 5, 50);
// console.log(s);

var loadingMyData;
var bubbles = [];

function preload() {
  loadingMyData = loadJSON("topsongs5.json");
}

function setup() {
  createCanvas(1200, 800);
  colorMode(HSB, 200);
  for (var i = 0; i < loadingMyData.songs.length; i++) {
    bubbles[i] = new CircleMaking(i);
  }
  AverageOfThe70s();
  AverageOfThe80s();
  AverageOfThe90s();
}

function draw() {
  background(200);
  for (var j = 0; j < bubbles.length; j++) {
    bubbles[j].display();
    // bubbles[j].bounce();

  }
 // while(mouseX > originalY - 50 && mouseX < originalY + 50){
    
  //}
  bounceOnlyWhenMouseIsNear();
}


function CircleMaking(i) {

  this.xPosition = parseInt(loadingMyData.songs[i].beatsPerMinute);
  //console.log(loadingMyData.songs[i].year);
  this.yPostition = parseInt(loadingMyData.songs[i].year);

  if (isNaN(this.yPosition)) this.yPosition = 1970;
  if (isNaN(this.xPosition)) this.xPosition = 0;
  this.newX = map(this.xPosition, 0, 200, 800, 1);
  this.newY = map(1970 + i, 1970, 2000, 50, 1150);

  this.originalX = this.newX;
  this.originalY = this.newY;

  this.newSize = map(this.xPosition, 60, 220, 50, 200);
  this.beatsPerMinute = parseInt(loadingMyData.songs[i].beatsPerMinute);
 // this.time = map(this.beatsPerMinute, 67, 173, )
  this.direction = 10; //this.beatPerMinute;
  this.year = parseInt(loadingMyData.songs[i].year);
  this.songTitle = loadingMyData.songs[i].songTitle;
  this.display = function() {
    stroke(0, 0, 200);
    fill(this.newSize, 200, 200);
    strokeWeight(1);
    ellipse(this.newY, this.newX, this.newSize, this.newSize);
    fill(0, 0, 200);
    strokeWeight(1);
    textSize(this.newSize / 4);
    text(this.year, this.newY - this.newSize / 2, this.newX - this.newSize / 4 + this.newSize / 8);
    text(this.beatsPerMinute, this.newY, this.newX);
    //console.log(this.songTitle);
    textSize(this.newSize / 10);
    stroke(344, 67, 96);
    fill(344, 67, 96);
    text(this.songTitle, this.newY - this.newSize / 4, this.newX + 20);
  }
  this.bounce = function() {
    this.newX += this.direction;
    if (this.newX > height) {
      // this.direction = -this.beatsPerMinute;
      this.direction = -10;
    } else if (this.newX < 0) {
      //this.direction = 1 + this.beatsPerMinute;
      this.direction = 1 + 10;
    }
    console.log(this.newX);
  }
  this.reset = function() {
    this.newX = this.originalX;
    this.newY = this.originalY;
  }
  this.checkMouse = function() {
    if (mouseX > this.originalY - 30 && mouseX < this.originalY + 30 && mouseY > this.originalX - 30 && mouseY < this.originalX + 30) {
      this.bounce();
      console.log("bounce?");
    } else {
      this.reset();
    }
  // this.bounceWhen = function(){
  //   var timeItTakesToBounce = minute/beatsPerMinute;
  //   var millisecond = millis();
    
 // }
  }
}

function AverageOfThe70s() {
  var numberOfBeats = 0;
  for (var i = 0; i < 10; i++) {
    numberOfBeats = numberOfBeats + parseInt(bubbles[i].beatsPerMinute);
  }
  var averageBeats = numberOfBeats / 10;
  console.log("The average number of beats per minute of the 70's is " + averageBeats);
  return numberOfBeats;
}

function AverageOfThe80s() {
  var numberOfBeatsInThe80s = 0;
  for (var i = 10; i < 20; i++) {
    numberOfBeatsInThe80s = numberOfBeatsInThe80s + parseInt(bubbles[i].beatsPerMinute);
  }
  var averageBeatsInThe80s = numberOfBeatsInThe80s / 10;
  console.log("The average number of beats per minute of the 80's is " + averageBeatsInThe80s);
}

function AverageOfThe90s() {
  var numberOfBeatsInThe90s = 0;
  for (var i = 20; i < 30; i++) {
    numberOfBeatsInThe90s = numberOfBeatsInThe90s + parseInt(bubbles[i].beatsPerMinute);
  }
  var averageBeatsInThe90s = numberOfBeatsInThe90s / 10;
  console.log("The average number of beats per minute of the 90's is " + averageBeatsInThe90s);
}
function bounceOnlyWhenMouseIsNear() {
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].checkMouse();
  }
  //bubbles[i].reset();

}

//possible use of setInterval in a while loop to make each one bounce at the appropriate pace
//coule use a map function to make each one scale proportionally.



// circle 0
// 3600 refreshes per  minute
//1600 pixels per bounce
//80 bounces per minute
//128000 pixels per minute
//35.556 pixels per refresh


//circle 1
//3600

//3600 number of refreashes per minute
//1600 number of pixels to made one bounce
//173 bounces per minute
//276800 pixels per minute
//76.889 pixels per refresh
//IT REDRAWS AT A RATE OF 30 TIMES PER SECOND

//printing the results of the decades
//console.log("The 70's were faster than the 80's");
//console.log("The 70's were faster than the 90's");
//console.log("The 80's were faster than the 90's");





//extra stuff that may be helpful later:


//function makeItBounce(){
//xPosition 
//}
//how to make it bounces

// this.move = function(){
// this.yPosition = this.yPosition + 5;
// this.yPosition = this.yPosition - 5;
//}


//this.xPosition = 100;
//this.yPosition = 90;
//this.newY = 50;
//this.newX = 50;
//this.newSize =  30;
//this.beatsPerMinute = "name";
//this.year = "2000";
//console.log(this.newY, this.newX, this.newSize);
//console.log(loadingMyData.songs[i]);