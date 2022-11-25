const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const input_walls = document.querySelector("#amount_walls")
const input_rays = document.querySelector("#amount_rays")

canvas.width = 600
canvas.height = 600

ctx.translate(canvas.width/2, canvas.height/2)

let number_of_walls = 4

let number_of_rays = 100
let angle = 360 / number_of_rays

let rays = []
let walls = []

function inputAmountRays() {
  number_of_rays = input_rays.value
  angle = 360 / number_of_rays
  setup()
  draw()
}
inputAmountRays()

function inputAmountWalls() {
  number_of_walls = input_walls.value
  setup()
  draw()
}
inputAmountWalls()

function createRays({ length, position }) {
  rays = []
  for(let a = 0; a < number_of_rays; a++) {
    let rad = (angle + angle * a) * (Math.PI/180)
    let x = length * Math.cos(rad) - 0 * Math.sin(rad)
    let y = length * Math.sin(rad) + 0 * Math.cos(rad)

    let newRay = new Ray({ x: position.x, y: position.y }, {x, y})

    rays.push( newRay ) 
  }
}

function createWalls({ random, coords }) {
  walls = []
  if (random) {
    for (let c = 0; c < random; c++) {
      let x1 = Math.floor((Math.random() * canvas.width) - canvas.width / 2) 
      let y1 = Math.floor((Math.random() * canvas.height) - canvas.height / 2) 

      let x2 = Math.floor((Math.random() * canvas.width) - canvas.width / 2) 
      let y2 = Math.floor((Math.random() * canvas.height) - canvas.height / 2) 

      let newWall = new Wall(x1, y1, x2, y2)

      walls.push(newWall)
    }
  } else {
    for(let c = 0; c < coords.length; c++){
      let x1 = coords[c].x1
      let y1 = coords[c].y1

      let x2 = coords[c].x2
      let y2 = coords[c].y2

      let newWall = new Wall(x1, y1, x2, y2)

      walls.push(newWall)
    }
  }
}

function setup() {
  // Criar Raios
  createRays({
    length: 10000,
    position: {
      x: 0,
      y: 0
    }
  })

  // Criar Paredes
  createWalls({
    random: number_of_walls,
    // coords: [
    //   {
    //     x1: -150,
    //     y1: 150,
    //     x2: -150,
    //     y2: -150
    //   },
    //   // {
    //   //   x1: 150,
    //   //   y1: 150,
    //   //   x2: 150,
    //   //   y2: -150
    //   // },
    // ]
  })

}

setup()

function clearCanvas() {
  ctx.clearRect(-canvas.width / 2, - canvas.height / 2, canvas.width, canvas.height)
}

function updateRays() {
  for(ray in rays) {
    rays[ray].update()
    rays[ray].draw()
  }
}

function drawWalls() {
  for(wall of walls) {
    wall.draw()
  }
}

function draw() {
  clearCanvas() // Limpa a tela
  updateRays()  // Atualiza e desenha os raios
  drawWalls()   // Desenha as paredes
}
draw()

/* ===== CANVAS INTERACTION ===== */ 

let clicked = false
function updateRayPosition(e) {
  mouse = {
    x: e.offsetX - canvas.width /2,
    y: e.offsetY - canvas.height /2
  }

  for(ray of rays) {
    ray.origin = mouse
  }
}

function updateCanvas(e) {
  updateRayPosition(e)
  draw()
}

canvas.onmousedown = (e) => {
  clicked = true
  updateCanvas(e)
}
canvas.onmouseup = () => clicked = false

canvas.onmousemove = (e) => {

  if(clicked) {
    running = true
    updateCanvas(e)
  }
}