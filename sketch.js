let e, f, g, h, i;
let myImage;
let font;

let bagPosX = 0;
let bagPosY = 535;
let bagStep = 12;

let charPosY = 600;
let charStep = 60;

let Schaufelshown = false;
let Biershown = false;
let Helmshown = false;

let stopped = true;

let charPosX = 0;

function preload() {
  myImage = loadImage("landscape.jpg");

  e = loadImage("bagger.svg");
  f = loadImage("character.svg");
  g = loadImage("schaufel.svg");
  h = loadImage("helm.svg");
  i = loadImage("bier.svg");
  font = createFont("PixelifySans-VariableFont_wght.ttf",80);
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  image(myImage, 0, 0, width, height);

  image(e, bagPosX, bagPosY, 200, 250);
  image(f, charPosX, charPosY, 200, 250);

  if (stopped) {
    charPosX = mouseX;
  }

  let cute = dist(bagPosX, bagPosY, charPosX, charPosY);

  if (cute <= 70) {
    fill(255);
    textFont(font);
    textSize(80);
    text("Aua!", 100, 380);
  }

  // Bagger Bewegung
  if (bagPosX + bagStep < width - 350 && bagPosX + bagStep > 0) {
    bagPosX += bagStep;
  } else {
    bagStep *= -1;
  }

  // Charakter Bewegung
  if (charPosY + charStep < height - 215 && charPosY + charStep > 0) {
    charPosY += charStep;
  } else {
    charStep *= -1;
  }

  // Items anzeigen
  if (Schaufelshown) {
    image(g, 190, 3, 200, 250);
  }
  if (charPosY <= 100 && charPosY >= 0 && charPosX >= 160 && charPosX <= 240) {
    Schaufelshown = true;
  }

  if (Biershown) {
    image(i, 450, 130, 150, 250);
  }
  if (charPosY <= 140 && charPosY >= 0 && charPosX >= 420 && charPosX <= 480) {
    Biershown = true;
  }

  if (Helmshown) {
    image(h, 200, 250, 240, 300);
  }
  if (charPosY <= 325 && charPosY >= 80 && charPosX >= 200 && charPosX <= 280) {
    Helmshown = true;
  }

  // Win condition
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