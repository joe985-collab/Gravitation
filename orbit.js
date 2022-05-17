const canvas = document.getElementById('canvas1')
const c1 = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
const G = 5
let m1 = 50
// let m2 = 100
class HeavenlyBody{
  constructor(xPosition,yPosition,radius,color,mass){
    this.position = {
      x : xPosition,
      y: yPosition
    }
    this.velocity = {
      x: Math.random()*5*(this.position.x>0.5?1:-1),
      y: Math.random()*5*(this.position.y>0.5?1:-1)
    }
    this.acceleration = {
      x: 0,
      y:0
    }
    this.mass = mass
    this.radius = radius
    this.width = 30
    this.height = 30
    // this.angle = 0
    this.color = color
    }
    draw(){
      c1.beginPath()
      c1.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
      c1.fillStyle  = this.color
      c1.fill()
      c1.stroke()
      c1.shadowBlur = 30;
      c1.shadowColor = "yellow"
      // c1.beginPath()
      // c1.arc(300, 400, 30, 0, 2 * Math.PI)
      // c1.fillStyle  = 'yellow'
      // c1.fill()
      // c1.stroke()
    }
    update(){
      this.draw()
      // this.velocity.x += 1
    }
    // update(v1,v2){
    //   this.draw()
    //   // this.velocity.x += 1
    //   v1 += this.acceleration.x
    //   v2 += this.acceleration.y
    //   this.position.x += v1
    //   this.position.y += v2
    //   this.acceleration = {
    //     x: 0,
    //     y:0
    //   }
    // }
    attract(mover){
      // mover.velocity.x += 0.0025
       mover.angle = Math.atan((this.position.y-mover.position.y)/(this.position.x-mover.position.x))
       // console.log(mover.angle*180/Math.PI)
       let dirMagSq = Math.sqrt((this.position.x-mover.position.x)**2+(this.position.y-mover.position.y)**2)**2
       let constraint = Math.min(Math.max(dirMagSq,100),1000)
       // console.log(dirMagSq)
       let force = (G*m1*mover.mass)/constraint
       // console.log(force)
       // if(force>3) return 0
       if(this.position.x < mover.position.x) return -force
       return force
    }
    applyForce(force){
        // console.log(force)
        let f = force/m1
        this.acceleration.x += f*Math.cos(this.angle)
        this.acceleration.y += f*Math.sin(this.angle)
        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y
        // console.log(this.velocity)
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.acceleration = {
          x: 0,
          y:0
        }
    }
    // resultant(f1,f2){
    //   let theta = Math.atan(f2/f1)
    //   let resultant = Math.sqrt((f1**2+f2**2+2*f1*f2*Math.cos(theta)))
    //   return resultant
    // }
}
const sun = new HeavenlyBody(canvas.width/2,canvas.height/2,30,'yellow')
// const earth = new HeavenlyBody(50,100,10,'blue
let planets = []
let colors = ["#f0f8ff","#ff0066","#ffff99","#66ff66","#3333ff"]
for(let j=0;j<5;j++){
  let picker = Math.floor(Math.random()*5)
  planets.push(new HeavenlyBody(Math.random()*700,Math.random()*800,5+Math.random()*15,colors[picker],Math.random()*10+5))
}
function animate(){
  requestAnimationFrame(animate)
  c1.clearRect(0,0,canvas.width,canvas.height)
  sun.update()
  // console.log(earth.position)
  // console.log(earth.position.x,earth.position.y)
  // let F = sun.attract(earth)
  planets.forEach((planet)=>{
    planet.update()
    let F = sun.attract(planet)
    planet.applyForce(F)
  })
}
animate()
