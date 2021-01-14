const modalOuter = document.querySelector('.modal-outer')
const modalInner = modalOuter.querySelector('.modal-inner')
const modalImg = modalInner.querySelector('img')
const modalTitle = modalInner.querySelector('h3')
const modalDescription = modalInner.querySelector('.description')
const modalCloseBtn = modalInner.querySelector('.close')

modalCloseBtn.addEventListener('click', closeModal)

const cardButtons = document.querySelectorAll('.card button')
cardButtons.forEach(btn => btn.addEventListener('click', openModal))

function openModal(e) {
  const btn = e.target
  const parentCard = btn.closest('.card')

  const img = parentCard.querySelector('img').src
  const description = parentCard.dataset.description
  const title = parentCard.querySelector('h3').textContent

  modalImg.src = img
  modalTitle.textContent = title
  modalDescription.textContent = description

  modalOuter.classList.add('open')
}

function closeModal() {
  modalOuter.classList.remove('open')
}

modalOuter.addEventListener('click', e => {
  const { target } = e
  const isOutside = !target.closest('.modal-inner')
  if (isOutside) {
    closeModal()
  }
})

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal()
  }
})
