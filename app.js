const bkgImg = new Image('img')
bkgImg.src = './paradise-lost.jpeg'

const textOverlay = document.querySelector('#text-overlay')

textOverlay.addEventListener('click', () => {
  window.location = 'https://b804530.alteg.io/company/756080/menu'
});

const canvas = document.createElement('canvas')
canvas.setAttribute('width', window.innerWidth)
canvas.setAttribute('height', window.innerHeight)

document.body.append(canvas)

const ctx = canvas.getContext('2d')

const r = canvas.height * 1.5
const rayWidth = 50
const blurAngleDeviation = rayWidth * 0.002
const maxRayOpacity = 0.2
const maxBlurOpacity1 = 0.7
const maxBlurOpacity2 = 0.3

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bkgImg, 0, 0, canvas.width, canvas.height)

  const rayStartA = Math.PI * 0.2
  const rayEndA = rayStartA + Math.PI * 0.65
  const step = 0.03
  ctx.save()
  ctx.globalAlpha = state.opacity

  for (let a = rayStartA; a < rayEndA; a += step) {
    const blurOpacity1 = state.opacity * maxBlurOpacity1
    const blurOpacity2 = state.opacity * maxBlurOpacity2
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
  step: 0.005,
  animationT: 0,
}

function drawRay(angle) {
  const cx = canvas.width / 2 + 50
  const cy = -100

  const ex = r * Math.cos(angle) + cx
  const ey = r * Math.sin(angle) + cy

  ctx.fillStyle = 'white'
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(ex, ey);
  ctx.lineTo(ex + rayWidth, ey);
  ctx.lineTo(cx, cy);
  ctx.fill();
}

function animate() {
  state.opacity = easeInOut(state.animationT) * maxRayOpacity
  textOverlay.style.opacity = easeInOut(state.animationT)

  state.animationT += state.step
  if (state.animationT >= 1 || state.animationT <= 0 - state.step) state.step *= -1
  draw()

  requestAnimationFrame(animate)
}

// https://stackoverflow.com/a/32854295/1657101
function easeInOut(t){
  return t > 0.5 ? 4*Math.pow((t-1),3)+1 : 4*Math.pow(t,3);
}

bkgImg.onload = animate
