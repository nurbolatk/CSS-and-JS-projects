const sliderImages = document.querySelectorAll('.slide-in')

function checkScroll() {
  sliderImages.forEach(sliderImage => {
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2
    const imageBottom = sliderImage.offsetTop + sliderImage.height
    const isHalfShown = slideInAt > sliderImage.offsetTop
    const isNotSrolledPast = window.scrollY < imageBottom
    if (isHalfShown && isNotSrolledPast) {
      sliderImage.classList.add('active')
    } else {
      sliderImage.classList.remove('active')
    }
  })
}

document.addEventListener('scroll', debounce(checkScroll, 10))

function debounce(func, wait = 20, immediate = true) {
  var timeout
  return function () {
    var context = this,
      args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
