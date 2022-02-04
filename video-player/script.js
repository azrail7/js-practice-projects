const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timeStamp = document.getElementById('timestamp');
const volume = document.getElementById('volume');

// Play and pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play and pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
  } else {
    play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
  }
}

// Update progress and timestamp
function updateProgress() {
  progress.value = (video.currentTime * 100) / video.duration;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);

  timeStamp.innerHTML = `${mins.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;
}

// Set video time
function setVideoProgress() {
  video.currentTime = (+progress.value / 100) * video.duration;
}
// Stop Video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Audio control

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress); // reacts when currentTime attr is updated
volume.addEventListener('input', function (e) {
  const value = e.target.value;
  video.volume = value / 100;
});

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);
