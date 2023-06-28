const imgWidth = 400
const imgHeight = 505
const canvas = document.createElement('canvas')
canvas.width = imgWidth
canvas.height = imgHeight
document.body.append(canvas)

const image = new Image()

image.src = 'paradise-lost.jpg'

const ctx = canvas.getContext('2d')

image.addEventListener('load', run)

function run() {
  ctx.drawImage(image, 0, 0, imgWidth, imgHeight)
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const numParticles = 5000
  const particles = []

  let mappedImage = []

  console.log(pixels.width)

  console.log(pixels)

  for (let y = 0; y < canvas.height; y++) {
    let row = []
    for (let x = 0; x < canvas.width; x++) {
      const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
      const green = pixels.data[(y * 4 * pixels.width) + (x * 4) + 1]
      const blue = pixels.data[(y * 4 * pixels.width) + (x * 4) + 2]
      const brightness = calculateRelativeBrightness(red, green, blue)
      row.push(brightness)
    }
    mappedImage.push(row)
  }

  console.log(mappedImage)

  function calculateRelativeBrightness(r, g, b) {
    return Math.sqrt(r * r * 0.299 + g * g * 0.587 + b * b * 0.114) / 100
    //return (r + g + b) / 3 / 255
  }

  const update = (particle) => {
    const { x, y } = particle
    particle.brightness = mappedImage[Math.floor(y)][Math.floor(x)]

    particle.y += (2.5 - particle.brightness) + particle.velocity


    if (particle.y >= canvas.height) {
      particle.y = 0
      particle.x = Math.random() * canvas.width
    }
  }

  const draw = (particle) => {
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fill()
  }

  function createParticles() {
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: 0,
        speed: 0,
        velocity: Math.random() * 0.5,
        size: Math.random() * 1.5 + 1,
      })
    }
  }

  createParticles()

  function animate() {
    ctx.globalAlpha = 0.05
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = 0.2
    for (const particle of particles) {
      update(particle)
      ctx.globalAlpha = particle.brightness * 0.5
      draw(particle)
    }
    requestAnimationFrame(animate)
  }
  animate()
}



