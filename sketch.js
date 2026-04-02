// -------------------
// POSITIONS
// -------------------
let charPosX = 300;
let charPosY = 600;

let bagPosX = 0;
let bagPosY = 535;

let bagStep = 12;

// Game state
let Schaufelshown = false;
let Biershown = false;
let Helmshown = false;
let gameWon = false;

// -------------------
// IMAGES / FONT
// -------------------
let e, f, g, h, i;
let myImage;
let font;

function preload() {
  myImage = loadImage("landscape.jpg");

  e = loadImage("bagger.svg");
  f = loadImage("character.svg");
  g = loadImage("schaufel.svg");
  h = loadImage("helm.svg");
  i = loadImage("bier.svg");

  font = createFont("PixelifySans-VariableFont_wght.ttf", 80);
}

// -------------------
// INPUT
// -------------------
let keys = {};

function keyPressed() {
  keys[key.toLowerCase()] = true;
}

function keyReleased() {
  keys[key.toLowerCase()] = false;
}

// -------------------
// SETUP
// -------------------
function setup() {
  createCanvas(800, 800);
}

// -------------------
// DRAW
// -------------------
function draw() {
  image(myImage, 0, 0, width, height);

  // -------------------
  // PLAYER MOVEMENT (IMMER erlaubt)
  // -------------------
  if (!gameWon) {
    if (keys['arrowleft'] || keys['a']) charPosX -= 10;
    if (keys['arrowright'] || keys['d']) charPosX += 10;
    if (keys['arrowup'] || keys['w']) charPosY -= 10;
    if (keys['arrowdown'] || keys['s']) charPosY += 10;

    charPosX = constrain(charPosX, 0, width - 200);
    charPosY = constrain(charPosY, 0, height - 250);
  }

  // -------------------
  // BAGGER MOVEMENT (IMMER unabhängig!)
  // -------------------
  bagPosX += bagStep;
  if (bagPosX > width - 350 || bagPosX < 0) {
    bagStep *= -1;
  }

  // -------------------
  // DRAW OBJECTS
  // -------------------
  image(e, bagPosX, bagPosY, 200, 250);
  image(f, charPosX, charPosY, 200, 250);

  // -------------------
  // COLLISION (nur Feedback, KEIN STOP)
  // -------------------
  let charCenterX = charPosX + 100;
  let charCenterY = charPosY + 125;

  let bagCenterX = bagPosX + 100;
  let bagCenterY = bagPosY + 125;

  let d = dist(charCenterX, charCenterY, bagCenterX, bagCenterY);

  if (d <= 90) {
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

  if (charPosX > 160 && charPosX < 240 && charPosY < 100) Schaufelshown = true;
  if (charPosX > 420 && charPosX < 480 && charPosY < 140) Biershown = true;
  if (charPosX > 200 && charPosX < 280 && charPosY > 80 && charPosY < 325) Helmshown = true;

  // -------------------
  // WIN CONDITION (keine Movement-Manipulation!)
  // -------------------
  let end = dist(620, 420, charCenterX, charCenterY);

  if (end <= 50) {
    gameWon = true;

    fill(255);
    textFont(font);
    textSize(80);
    text("Juhu, geschafft!", 100, 350);
  }
}
