const bkgImg = new Image('img')
bkgImg.src = './paradise-lost.jpeg'

const canvas = document.createElement('canvas')
canvas.setAttribute('width', window.innerWidth)
canvas.setAttribute('height', window.innerHeight)

document.body.append(canvas)

const ctx = canvas.getContext('2d')

function draw() {
  ctx.drawImage(bkgImg, 0, 0, canvas.width, canvas.height)

  const rayStartA = Math.PI * 0.2
  const rayEndA = rayStartA + Math.PI * 0.65
  const step = 0.05
  for (let a = rayStartA; a < rayEndA; a += step) {
    drawRay(a)
  }
}

function drawRay(angle) {
  const cx = canvas.width / 2 + 50
  const cy = -100

  const r = canvas.height * 1.5
  const ex = r * Math.cos(angle) + cx
  const ey = r * Math.sin(angle) + cy

  const rayWidth = 5

  ctx.fillStyle = 'white'
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(ex, ey);
  ctx.lineTo(ex + rayWidth, ey);
  ctx.lineTo(cx, cy);
  ctx.fill();
}



bkgImg.onload = draw
