let nave = document.querySelector('.nave')
let body = document.querySelector('body')
let laser = document.getElementById('laser')
let live = document.querySelector('i')
let lives = 5
let times = document.getElementById('times')
let seconds = 60
let explosion = document.getElementById('explosion')

setInterval(() => {
  seconds--
  times.textContent = seconds
  if (seconds === 0) {
    alert('You Win!')
    location.reload()
  }
}, 1000)
document.addEventListener('mousemove', (event) => {
  nave.style.left = event.clientX - 40 + 'px'
})

//generar disparo
document.addEventListener('click', () => {
  let disparo = document.createElement('div')
  disparo.classList.add('disparo')
  disparo.style.bottom = 70 + 'px'
  disparo.style.left = nave.getBoundingClientRect().left + 40 + 'px'
  body.append(disparo)
  // sonido de disparo
  laser.play()
})

//movimiento disparo
setInterval(() => {
  let disparos = document.querySelectorAll('.disparo')
  disparos.forEach((disparo) => {
    disparo.style.top = disparo.getBoundingClientRect().top - 20 + 'px'

    if (disparo.getBoundingClientRect().top <= 0) {
      disparo.remove()
    }

    // detectar colisiones
    let meteoritos = document.querySelectorAll('.meteorito')
    meteoritos.forEach((meteorito) => {
      if (
        disparo.getBoundingClientRect().top <=
        meteorito.getBoundingClientRect().top + 50
      ) {
        if (
          disparo.getBoundingClientRect().left >=
            meteorito.getBoundingClientRect().left &&
          disparo.getBoundingClientRect().left <=
            meteorito.getBoundingClientRect().left + 80
        ) {
          // sonido explosion
          explosion.play()
          meteorito.style.backgroundImage = "url('./img/explosion.png')"
          setTimeout(() => {
            meteorito.remove()
            explosion.stop()
          }, 200)
        }
      }
    })
  })
}, 100)

// rocas
let contadorMeteoritos = 0
setInterval(() => {
  contadorMeteoritos++
  if (contadorMeteoritos % 10 === 0) {
    let meteorito = document.createElement('div')
    meteorito.classList.add('meteorito')
    body.append(meteorito)
    meteorito.style.left = Math.random() * window.innerWidth - 100 + 'px'
  }
  let meteoritos = document.querySelectorAll('.meteorito')
  meteoritos.forEach((meteorito) => {
    meteorito.style.top = meteorito.getBoundingClientRect().top + 10 + 'px'
    if (
      meteorito.getBoundingClientRect().top >= nave.getBoundingClientRect().top
    ) {
      lives--
      live.textContent = lives
      if (lives === -1) {
        alert('Game Over')
        location.reload()
      }
      meteorito.remove()
    }
  })
}, 200)
