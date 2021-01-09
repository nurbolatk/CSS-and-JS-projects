const video = document.querySelector('.player')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')

const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then(localMediaStream => {
      video.srcObject = localMediaStream
      video.play()
    })
}

getVideo()

function paintToCanvas() {
  const height = video.videoHeight
  const width = video.videoWidth

  canvas.width = width
  canvas.height = height

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)

    // take pixels out
    let pixels = ctx.getImageData(0, 0, width, height)
    // mess with them
    pixels = shiftRGB(pixels)
    ctx.globalAlpha = 0.1
    // put them back
    ctx.putImageData(pixels, 0, 0)
  }, 16)
}

video.addEventListener('canplay', paintToCanvas)

function takePhoto() {
  // play the sound
  snap.currentTime = 0
  snap.play()

  // take the data from canvas
  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download', 'handsome')
  link.style.transform = `rotate(${Math.round(Math.random() * 15 - 10)}deg)`
  link.innerHTML = `<img src=${data} alt="handsome man!" />`
  strip.insertAdjacentElement('beforeend', link)
}

document.querySelector('.control').addEventListener('click', takePhoto)

function shiftRGB(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0] // RED
    pixels.data[i + 200] = pixels.data[i + 1] // GREEN
    pixels.data[i - 250] = pixels.data[i + 2] // Blue
  }
  return pixels
}
