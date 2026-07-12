const videoElement = document.getElementById('webcam');
const canvasElement = document.getElementById('output_canvas');
const canvasCtx = canvasElement.getContext('2d');

function onResults(results) {
  // Clear the drawing layout for the new frame
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  if (results.poseLandmarks) {
    // Draw green lines connecting joints
    window.drawConnectors(canvasCtx, results.poseLandmarks, window.POSE_CONNECTIONS, {
      color: '#03b1fc', 
      lineWidth: 3
    });
                   
    // Draw red circles on individual joints
    window.drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: '#fc8403', 
      lineWidth: 1, 
      radius: 3
    });
  }
}

const pose = new Pose({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
});

pose.setOptions({
  modelComplexity: 1,
  numPoses: 1,
  smoothLandmarks: false,
  minDetectionConfidence: 0.77,
  minTrackingConfidence: 0.72,
  minPresenceConfidence: 0.73,
  outputSegmentationMasks: true,
});

pose.onResults(onResults);

// Use MediaPipe's stable engine loop
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({image: videoElement});
  },
  width: window.screen.width,
  height: window.screen.height
});

camera.start()
  .then(() => console.log("Pipeline successfully active!"))
  .catch(err => console.error("Webcam startup error: ", err));