let e, f, g, h, i;
let myImage;
let font;

let bagPosX = 0;
let bagPosY = 535;
let bagStep = 12;

let charPosX = 300;
let charPosY = 600;
let charStep = 60;

let Schaufelshown = false;
let Biershown = false;
let Helmshown = false;

let stopped = true;

// -------------------
// PRELOAD
// -------------------
function preload() {
  myImage = loadImage("landscape.jpg");

  e = loadImage("bagger.svg");
  f = loadImage("character.svg");
  g = loadImage("schaufel.svg");
  h = loadImage("helm.svg");
  i = loadImage("bier.svg");

  font = loadFont("PixelifySans-VariableFont_wght.ttf");
}

// -------------------
// SETUP
// -------------------
function setup() {
  createCanvas(800, 800);
}

// -------------------
// INPUT (PFEILTASTEN)
// -------------------
let keys = {};

function keyPressed() {
  keys[key.toLowerCase()] = true;
}

function keyReleased() {
  keys[key.toLowerCase()] = false;
}

// -------------------
// DRAW
// -------------------
function draw() {
  image(myImage, 0, 0, width, height);

  // -------------------
  // CHARACTER MOVEMENT (PFEILTASTEN)
  // -------------------
  if (stopped) {
    if (keys["arrowleft"] || keys["a"]) charPosX -= 6;
    if (keys["arrowright"] || keys["d"]) charPosX += 6;
    if (keys["arrowup"] || keys["w"]) charPosY -= 6;
    if (keys["arrowdown"] || keys["s"]) charPosY += 6;
  }

  // Grenzen
  charPosX = constrain(charPosX, 0, width - 200);
  charPosY = constrain(charPosY, 0, height - 250);

  // -------------------
  // BAGGER MOVEMENT
  // -------------------
  if (bagPosX + bagStep < width - 350 && bagPosX + bagStep > 0) {
    bagPosX += bagStep;
  } else {
    bagStep *= -1;
  }

  // -------------------
  // DRAW OBJECTS
  // -------------------
  image(e, bagPosX, bagPosY, 200, 250);
  image(f, charPosX, charPosY, 200, 250);

  // -------------------
  // COLLISION
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
  if (Schaufelshown) image(g, 190, 3, 200, 250);
  if (Biershown) image(i, 450, 130, 150, 250);
  if (Helmshown) image(h, 200, 250, 240, 300);

  if (charPosY <= 100 && charPosX >= 160 && charPosX <= 240) {
    Schaufelshown = true;
  }

  if (charPosY <= 140 && charPosX >= 420 && charPosX <= 480) {
    Biershown = true;
  }

  if (charPosY <= 325 && charPosY >= 80 && charPosX >= 200 && charPosX <= 280) {
    Helmshown = true;
  }

  // -------------------
  // WIN CONDITION
  // -------------------
  let end = dist(620, 420, charPosX, charPosY);

  if (end <= 50) {
    stopped = false;
    charPosX = 620;

    fill(255);
    textFont(font);
    textSize(80);
    text("Juhu, geschafft!", 100, 350);
  }
}
