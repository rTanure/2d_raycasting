class Ray {
  constructor(origin, dir) {
    this.origin = origin,
    this.dir = dir,
    this.target,
    this.change = false
  }


  draw() {
    ctx.beginPath()
    ctx.moveTo(this.origin.x, this.origin.y)
    ctx.lineTo(this.target.x, this.target.y) 
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 1
    ctx.stroke()
  }

  update() {
    let counter = 0

    for(let wall in walls) {
      // Coordenadas Raio
      const x1 = this.origin.x
      const y1 = this.origin.y
      const x2 = this.origin.x + this.dir.x * 999999
      const y2 = this.origin.y + this.dir.y * 999999

      // Coordenadas Parede
      const x3 = walls[wall].x1
      const y3 = walls[wall].y1
      const x4 = walls[wall].x2
      const y4 = walls[wall].y2

      let intersection = this.#getIntersectionPoint( x1, y1, x2, y2, x3, y3, x4, y4 )
     
      if (intersection) {
        this.change = true
        if(counter < 1) {
          this.target = intersection
          counter++
        } else {
          let temp = this.#getIntersectionPoint( x1, y1, x2, y2, x3, y3, x4, y4 )
          let dist_old = this.#getDistance(x1, y1, this.target.x, this.target.y)
          let dist_new = this.#getDistance(x1, y1, temp.x, temp.y)

          if(dist_new < dist_old) {
            this.target = temp
          }
        }
      } 
    }
    if (!this.change) {
      this.target = {
        x: this.origin.x + this.dir.x, 
        y: this.origin.y + this.dir.y
      }
    }
    this.change = false
  }

  #getDistance(x1, y1, x2, y2) {
    let v_1 = (x2 - x1)
    let v_2 = (y2 - y1)

    let dist = Math.sqrt((v_1 * v_1) + (v_2 * v_2))
    return dist
  }

  #getIntersectionPoint( x1, y1, x2, y2, x3, y3, x4, y4 ) {
    class Coord {
      constructor(x, y) {
        this.x = x,
        this.y = y
      }
    }

    let k = new Coord(x1, y1)
    let l = new Coord(x2, y2)
    let m = new Coord(x3, y3)
    let n = new Coord(x4, y4)

    let det = (n.x - m.x) * (l.y - k.y)  -  (n.y - m.y) * (l.x - k.x);

    let s = ((n.x - m.x) * (m.y - k.y) - (n.y - m.y) * (m.x - k.x))/ det 
    let t = ((l.x - k.x) * (m.y - k.y) - (l.y - k.y) * (m.x - k.x))/ det 


    if ( s > 0 && s < 1 && t > 0 && t < 1 ) {
      let intersection = {
        x: k.x + (l.x - k.x) * s,
        y: k.y + (l.y - k.y) * s
      }
      
      return intersection
    } else {
      return false
    }

  }


}