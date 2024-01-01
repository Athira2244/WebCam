// const videoButton = document.getElementById("media_record");
// const video = document.getElementById("main_video");
// const startCam = document.getElementById("main_button");
// let mediaRecorder;
// function handleRecorder() {
//   videoButton.textContent = "Stop";
//   switch (videoButton.textContent) {
//     case "Record":
//       videoButton.textContent = "Stop";
//       startRecording();
//       break;
//     case "Stop":
//       videoButton.textContent = "Record";
//       stopRecording();
//       break;
//   }
// }
// async function init() {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: true,
//     });
//     startWebCamera(stream);
//   } catch (err) {
//     console.log("Error Retrieving Media Device");
//     console.log(err);
//   }
// }
// function startWebCamera(stream) {
//   video.srcObject = stream;
//   window.stream = stream;
// }
// function startRecording() {
//   if (video.srcObject === null) {
//     video.srcObject = window.stream;
//   }
//   mediaRecorder = new MediaRecorder(window.stream, {
//     mimeType: "video/webm;codecs=vp9,opus",
//   });
//   mediaRecorder.start();
//   mediaRecorder.onstop = download;
//   mediaRecorder.ondataavailable = recordVideo;
// }
// function recordVideo(event) {
//   if (event.data && event.data.size > 0) {
//     video.srcObject = null;
//     let videoUrl = URL.createObjectURL(event.data);
//     video.src = videoUrl;
//   }
// }
// function stopRecording() {
//   mediaRecorder.stop();
// }
// function download() {
//   var a = document.createElement("a");
//   document.body.appendChild(a);
//   a.style = "display: none";
//   a.href = videoUrl;
//   a.download = "test.webm";
//   a.click();
//   window.URL.revokeObjectURL(videoUrl);
// }
var videoElement = document.getElementById("video");
var localStreamConstraints = {
  audio: true,
  video: { width: 1920, height: 1080 },
};

var mediaRecorder;
var options = { mimeType: "video/webm; codecs=vp9" };
var recordedChunks = [];
function init() {
  if (videoElement) {
    navigator.mediaDevices.getUserMedia(localStreamConstraints).then(gotStream);
  }
}

// if found stream found
function gotStream(stream) {
  videoElement.srcObject = stream;
  if (stream) {
    mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = download;
  }
}

var recBtn = document.getElementById("rec");
if (recBtn) {
  recBtn.addEventListener("click", () => {
    mediaRecorder.start();
  });
}

var stopBtn = document.getElementById("stop");
if (stopBtn) {
  stopBtn.addEventListener("click", () => {
    mediaRecorder.stop();
  });
}

function handleDataAvailable(event) {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
    console.log(event.data);
  }
}
function download() {
  var blob = new Blob(recordedChunks, {
    type: "video/webm",
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "Video.webm";
  a.click();
  window.URL.revokeObjectURL(url);
}
