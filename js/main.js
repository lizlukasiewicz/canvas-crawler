

const movementDisplay = document.getElementById('movement')

const canvas = document.getElementById('canvas')
// Set your Context!
const ctx = canvas.getContext('2d')

// Fill Color
ctx.fillStyle = 'white';
// Line Color
ctx.strokeStyle = 'red';
// Line width
ctx.lineWidth = 5;


ctx.fillRect(10, 10, 100, 100);
ctx.strokeRect(10, 10, 100, 100);

canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

// function drawBox(x, y, size, color){
//     ctx.fillStyle = color;
//     ctx.fillRect(x, y, size, size);
//   }
  
  
//   const ctx = canvas.getContext('2d')

  class Crawler{
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
      }
      render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }
  }
  
  let hero = new Crawler(100, 200, 'hotpink', 40, 40);
  let ogre = new Crawler(500, 150, '#BADA55', 100, 150);
  
  function gameLoop() {
    // Clear the Cavas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //Display the X and Y coordinates of our hero
    movementDisplay.textContent = `X: ${hero.x} Y: ${hero.y}`
    detectHit()
    if (ogre.alive) {
        ogre.render()
        //todo detect hit
    }
    hero.render()
}

document.addEventListener('keydown', movementHandler);
let runGame = setInterval(gameLoop, 60);

function movementHandler(e) {
    // up (w:87): y-=1; left (a:65): x-=1; down (s:83): y+=1; right (d:68): x+=1
    switch (e.keyCode) {
      case (38):
        hero.y -= 10
        break
      case (37):
        hero.x -= 10
        break
      case (40):
        hero.y += 10
        break
      case (39):
        hero.x += 10
    } 
  }
// x=200 y=50 w=150 h=200  topleft(200, 50) topright(350, 50) 
//                          bottomleft(200, 250) bottomright(350, 250)
function detectHit() {
    // check each side for intersection one by one
    // let ogreLeft = hero.x + hero.width >= ogre.x
    // let ogreRight = hero.x <= ogre.x + ogre.width
    // console.log('ogreRight', ogreRight)
    // console.log('ogreLeft', ogreLeft)
  
    /* 
    checking both sides with an or will always be true!
    (hero.x <= ogre.x + ogre.width || hero.x + hero.width >= ogre.x)
    hits are only detected only when BOTH are ture!
    (hero.x <= ogre.x + ogre.width && hero.x + hero.width >= ogre.x)
    */
  
    // check the top annd bottom 
    // let ogreTop = hero.y + hero.height >= ogre.y
    // console.log('ogreTop', ogreTop)
    // let ogreBottom = hero.y <= ogre.y + ogre.height
    // console.log('ogreBottom', ogreBottom)
  
    // one big, confusing if:
    if (
      hero.x + hero.width >= ogre.x &&
      hero.x <= ogre.x + ogre.width &&
      hero.y <= ogre.y + ogre.height &&
      hero.y + hero.height >= ogre.y
      ) {
        // do some game stuff!
        console.log('hit!')
      }
  }
  