const bkgImg = new Image('img')
bkgImg.src = './paradise-lost.jpeg'

const canvas = document.createElement('canvas')
canvas.setAttribute('width', window.innerWidth)
canvas.setAttribute('height', window.innerHeight)

document.body.append(canvas)

const ctx = canvas.getContext('2d')

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bkgImg, 0, 0, canvas.width, canvas.height)

  const rayStartA = Math.PI * 0.2
  const rayEndA = rayStartA + Math.PI * 0.65
  const step = 0.05
  ctx.save()
  ctx.globalAlpha = state.opacity

  for (let a = rayStartA; a < rayEndA; a += step) {
    const blurOpacity1 = state.opacity * 0.6
    const blurOpacity2 = state.opacity * 0.3
    const blurAngleDeviation = 0.03
    drawRay(a)
    ctx.save()
    ctx.globalAlpha = blurOpacity1
    drawRay(a + step * blurAngleDeviation)
    drawRay(a - step * blurAngleDeviation)
    ctx.restore()

    ctx.save()
    ctx.globalAlpha = blurOpacity2
    drawRay(a + step * blurAngleDeviation * 2)
    drawRay(a - step * blurAngleDeviation * 2)
    ctx.restore()
  }
  ctx.restore()

}

let state = {
  opacity: 0,
  step: 0.01,
}

function drawRay(angle) {
  const cx = canvas.width / 2 + 50
  const cy = -100

  const r = canvas.height * 1.5
  const ex = r * Math.cos(angle) + cx
  const ey = r * Math.sin(angle) + cy

  const rayWidth = 10

  ctx.fillStyle = 'white'
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(ex, ey);
  ctx.lineTo(ex + rayWidth, ey);
  ctx.lineTo(cx, cy);
  ctx.fill();
}

function animate() {
  state.opacity += state.step
  if (state.opacity >= 0.7 || state.opacity <= 0 - state.step) state.step *= -1
  draw()

  requestAnimationFrame(animate)
}

bkgImg.onload = animate
