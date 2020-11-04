const canvas = document.getElementById('canvas')
const increaseBtn = document.getElementById('increase')
const decreaseBtn = document.getElementById('decrease')
const sizeEl = document.getElementById('size')
const colorEl = document.getElementById('color')
const clearBtn = document.getElementById('clear')


const ctx = canvas.getContext('2d')

let size = 30
let isPressed = false
let color = 'black'
let x = undefined
let y = undefined

const drawingCircle = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fillStyle = color
  ctx.fill();
}

const drawLine = (x1, y1, x2, y2) => {
  ctx.beginPath();
  ctx.moveTo(x1,y1)
  ctx.lineTo(x2,y2)
  ctx.strokeStyle = color
  ctx.lineWidth = size * 2 
  ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
  isPressed = true

  x = e.offsetX
  y = e.offsetY
})

canvas.addEventListener('mouseup', () => {
  isPressed = false

  x = undefined
  y = undefined
})

increaseBtn.addEventListener('click', () => {
  size += 5
  if (size > 50) {
    size = 50
  }
  updateSizeOnScreen()
})

decreaseBtn.addEventListener('click', () => {
  size -= 5
  if (size < 5) {
    size = 5
  }
  updateSizeOnScreen()
})

const updateSizeOnScreen = () => {
  sizeEl.innerText = size
}

colorEl.addEventListener('change', (e) => {
  color = e.target.value
})

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX
    const y2= e.offsetY
    drawingCircle(x2,y2)
    drawLine(x, y, x2, y2)
    x = x2
    y = y2
  }
})

// drawingCircle(50,50)
// draw()

