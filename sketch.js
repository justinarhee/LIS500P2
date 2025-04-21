// Teachable Machine - Smiling or Serious Model
// Isha Puri and Justina Rhee

let video;
let label = "waiting...";
let classifier;

// STEP 1: Load the model
function preload() {
  classifier = ml5.imageClassifier('teachable-models/model.json');
}

function setup() {
  createCanvas(400, 400);
  select('canvas').parent('model-canvas');

  video = createCapture(VIDEO);
  video.size(400, 400);
  video.hide();

  // STEP 2: Classify
  classifyVideo(); 
}

function draw() {
  background(0);
  image(video, 0, 0);

  // STEP 3: Draw the label
  textSize(20);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 28);

  // Emoji for each label
  let emoji = "🤖";
  if (label === "Smiling") {
    emoji = "😄";
  } else if (label === "Serious") {
    emoji = "😐";
  }

  // Show emoji
  textSize(128);
  text(emoji, width / 2, height / 2);
}

// STEP 4: Get classification
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}
