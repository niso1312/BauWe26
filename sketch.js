let e, f, g, h, i;
let myImage;
let font;

// Player
let charPosX = 0;
let charPosY = 600;
let charStep = 60;

// Bagger
let bagPosX = 0;
let bagPosY = 535;
let bagStep = 12;

// Game state
let Schaufelshown = false;
let Biershown = false;
let Helmshown = false;
let stopped = true;

function preload() {
  size(800,800); 
  myImage = loadImage("landscape.jpg");

  e = loadImage("bagger.svg");
  f = loadImage("character.svg");
  g = loadImage("schaufel.svg");
  h = loadImage("helm.svg");
  i = loadImage("bier.svg");

  font = createFont("PixelifySans-VariableFont_wght.ttf", 80);
}
let keys = {};

function keyPressed() {
  keys[key.toLowerCase()] = true;
}

function keyReleased() {
  keys[key.toLowerCase()] = false;
}
function setup() {
//  createCanvas(windowWidth, windowHeight);
}

function draw() {
  image(myImage, 0, 0);

  // -------------------
  // PLAYER MOVEMENT (MOUSE)
  // -------------------
 if (keys['arrowleft'] || keys['a']) {
    charPosX -= 10;
  }
  if (keys['arrowright'] || keys['d']) {
    charPosX += 10;
  }
  if (keys['arrowup'] || keys['w']) {
    charPosY -= 10;
  }
  if (keys['arrowdown'] || keys['s']) {
    charPosY += 10;
  }

  // Grenzen halten
//  charPosX = constrain(charPosX, 0, width - 200);
//  charPosY = constrain(charPosY, 0, height - 215);

  // -------------------
  // DRAW OBJECTS
  // -------------------
  image(e, bagPosX, bagPosY, 200, 250);
  image(f, charPosX, charPosY, 200, 250);

  // -------------------
  // Bagger movement
  // -------------------
  bagPosX += bagStep;

  if (bagPosX > width - 350 || bagPosX < 0) {
    bagStep *= -1;
  }

  // -------------------
  // Vertical auto movement
  // -------------------
 // charPosY += charStep;

 // if (charPosY > height - 215 || charPosY < 0) {
 //   charStep *= -1;
 // }

  // -------------------
  // Collision bagger vs player
  // -------------------
  let cute = dist(bagPosX, bagPosY, charPosX, charPosY);

  if (cute <= 70) {
    fill(255);
    textFont(font);
    textSize(80);
    text("Aua!", 100, 380);
  }

  // -------------------
  // ITEMS
  // -------------------
  if (Schaufelshown) {
    image(g, 190, 3, 200, 250);
  }

  if (charPosX > 160 && charPosX < 240 && charPosY < 100) {
    Schaufelshown = true;
  }

  if (Biershown) {
    image(i, 450, 130, 150, 250);
  }

  if (charPosX > 420 && charPosX < 480 && charPosY < 140) {
    Biershown = true;
  }

  if (Helmshown) {
    image(h, 200, 250, 240, 300);
  }

  if (charPosX > 200 && charPosX < 280 && charPosY > 80 && charPosY < 325) {
    Helmshown = true;
  }

  // -------------------
  // WIN CONDITION
  // -------------------
  let end = dist(620, 420, charPosX, charPosY);

  if (end <= 50) {
    stopped = false;
    charStep = 0;
    charPosX = 620;

    fill(255);
    textFont(font);
    textSize(80);
    text("Juhu, geschafft!", 100, 350);
  }
}

// -------------------
// RESPONSIVE CANVAS
// -------------------
//function windowResized() {
//  resizeCanvas(windowWidth, windowHeight);
//}
