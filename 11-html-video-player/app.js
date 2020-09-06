// grab the elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress-filled')
const toggle = player.querySelector('.toggle-play')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player-slider')
const fullScreen = player.querySelector('.full-screen')

// functions
function togglePlay() {
  video.paused ? video.play() : video.pause()
}

function updateIcon() {
  const icon = this.paused ? '►' : '❚❚'
  toggle.textContent = icon
}

function skip() {
  const { skip } = this.dataset
  video.currentTime += parseInt(skip)
}

function updateRange(e) {
  const { name, value, id } = e.target
  player.querySelector(`label[for="${id}"] .value`).textContent = parseFloat(
    value
  ).toFixed(1)
  video[name] = value
}

function setTime(e) {
  const time = (e.offsetX / video.offsetWidth) * video.duration
  video.currentTime = time
}

function updateProgressBar() {
  const progress = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${progress}%`
}

function toggleFullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen()
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen()
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen()
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen()
  }
}

// event listeners
video.addEventListener('click', togglePlay)
video.addEventListener('pause', updateIcon)
video.addEventListener('play', updateIcon)
video.addEventListener('timeupdate', updateProgressBar)
toggle.addEventListener('click', togglePlay)

skipButtons.forEach(button => button.addEventListener('click', skip))

fullScreen.addEventListener('click', toggleFullScreen)

ranges.forEach(range => {
  range.addEventListener('change', updateRange)
  range.addEventListener('mousemove', updateRange)
})

let mousedown = false
progress.addEventListener('click', setTime)
progress.addEventListener('mousemove', e => mousedown && setTime(e))
progress.addEventListener('mousedown', () => (mousedown = true))
progress.addEventListener('mouseup', e => (mousedown = false))
