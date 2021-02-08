const btnOpenBox = document.querySelector('.open-box')
const cube = document.querySelector('.cube')
const rotation = document.getElementById('rotation')

btnOpenBox.addEventListener('click', () => {
  cube.classList.toggle('open')
})

rotation.addEventListener('input', e => {
  cube.style.transform = `translateZ(-100px) rotateX(-20deg) rotateY(${
    parseInt(e.target.value) - 30
  }deg)`
})
