

const movementDisplay = document.getElementById('movement')

const canvas = document.getElementById('canvas')
// Set your Context!
const ctx = canvas.getContext('2d')
//**let collision = false**

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
  let obstacle = new Crawler(40, 120, 'red', 40, 40);
  let hero = new Crawler(490, 190, 'hotpink', 40, 35);
  let ogre = new Crawler(680, 50, '#BADA55', 100, 300);
  
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
    obstacle.render()
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
        // if(!collided) {}
    } 
    //gravity for hero
    //gravity for obstacle 
  }

function detectHit() {
    // check each side for intersection one by one
    // let ogreLeft = hero.x + hero.width >= ogre.x
    // let ogreRight = hero.x <= ogre.x + ogre.width
    // console.log('ogreRight', ogreRight)
    // console.log('ogreLeft', ogreLeft)
  // if collision === false {hero.y -= 10}
    /* 
    checking both sides with an or will always be true!
    // (hero.x <= ogre.x + ogre.width || hero.x + hero.width >= ogre.x)
    hits are only detected only when BOTH are ture!
    // (hero.x <= ogre.x + ogre.width && hero.x + hero.width >= ogre.x)
    */
  
    // check the top annd bottom 
    // let ogreTop = hero.y + hero.height >= ogre.y
    // console.log('ogreTop', ogreTop)
    // let ogreBottom = hero.y <= ogre.y + ogre.height
    // console.log('ogreBottom', ogreBottom)
  
    // one big, confusing if:
    if (                                  //noface
      hero.x + hero.width >= ogre.x &&
      hero.x <= ogre.x + ogre.width &&
      hero.y <= ogre.y + ogre.height &&
      hero.y + hero.height >= ogre.y
      ) {
        // do some game stuff!
        console.log('GAME OVER')
      }
      if (                                  // obstacle collision 
        hero.x + hero.width >= obstacle.x &&
        hero.x <= obstacle.x + obstacle.width &&
        hero.y <= obstacle.y + obstacle.height &&
        hero.y + hero.height >= obstacle.y
        ) {
          hero.y += 5
          hero.x += 5
     }
  }
  //collision boundaries with obsacles
  //detect when hero comes into contact with obsacles
  //when contact with right-side obstacle, turn off hero-left movement 
  //UNTIL hero-left boundary is no longer in contact with obstacle-right
  //player will move right as long as contact with obstacle-left is maintained
