// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'teachable-models/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  let canvas = createCanvas(320, 260);
  canvas.parent("model-canvas");

  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}

function draw() {
  background(0);
  image(flippedVideo, 0, 0);
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}
let classifier;
let imageModelURL = 'teachable-models/';

let video;
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  let canvas = createCanvas(320, 260);
  canvas.parent("model-canvas");

  video = createCapture(VIDEO, () => {
    console.log("🎥 Video capture ready");
    classifyVideo(); // Start classification only when video is ready
  });

  video.size(320, 240);
  video.hide(); // hide default video element
}

function draw() {
  background(0);
  image(video, 0, 0); // draw live video to canvas

  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error("❌ Classification error:", error);
    return;
  }
  label = results[0].label;
  classifyVideo(); // Keep classifying
}
