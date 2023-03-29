function checkAmountKey(key) {
  return (
    (key >= '0' && key <= '9') ||
    ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace'].includes(key)
  )
}

const amount = document.querySelector('#amount')

if (amount) {
  amount.addEventListener('keydown', (event) => {
    if (checkAmountKey(event.key)) {
      // console.log(event.key)
    } else {
      event.preventDefault()
    }
  })
}
