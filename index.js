const canvas = document.querySelector('canvas'); // Selection canvas
const ctx = canvas.getContext('2d'); // Context from canvas

// Setting up the width&height from canvas
canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
//For loop to create a Array from Arrays to create the CollisionsMap
for(let i= 0; i < collisions.length; i+=70){
    //Slice 0 - 70
    collisionsMap.push(collisions.slice(i, 70 + i));
}

class Boundary{
    constructor({position}){
        this.position = position;
        this.width = 48;
        this.height = 48;
    }

    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const boundaries = [];
collisionsMap.forEach((row, i) =>{
    row.forEach((Symbol, j) =>{
        boundaries.push(new Boundary({position:{x:0,y:0}}));
    })
});

// Setup from Image
const backgroungImage = new Image();
backgroungImage.src = './img/Pellet_Town.png';

const playerImage = new Image(); 
playerImage.src = './img/player/playerDown.png';

//List of keys
const keys = {
    w:{pressed: false},
    a:{pressed: false},
    s:{pressed: false},
    d:{pressed: false},
}
let lastKey = '';

//Class to create a object and allow us to create more image with movement.
class Sprite {
    //Constructor to make sure that we have always a Position and a Image.
    constructor({position, velocity, image}){
        this.position = position;
        this.image = image;
    }
    // Method from the class to Draw the on the canvas
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
    
}
// Creating the background.
const background = new Sprite({position:{x:-735,y:-600}, image: backgroungImage});

// animation function
function animate(){
    window.requestAnimationFrame(animate);
    //Setting up the background and location
    background.draw()
    ctx.drawImage(playerImage,
        //Cropping image
        0,
        0,
        playerImage.width / 4,
        playerImage.height,

        //Location - Center canvas
        (canvas.width/2) - (playerImage.width / 4) / 2, 
        (canvas.height/2) - (playerImage.height / 2),
        playerImage.width / 4,
        playerImage.height
    );
    
    //Creating the "player movement" using the ilusion from the map moving
    if(keys.w.pressed && lastKey === 'w'){background.position.y = background.position.y + 3} 
    else if (keys.s.pressed && lastKey === 's'){background.position.y = background.position.y - 3}
    else if (keys.a.pressed && lastKey === 'a'){background.position.x = background.position.x + 3}
    else if (keys.d.pressed && lastKey === 'd'){background.position.x = background.position.x - 3}
        
}

animate();

// Event Listener to catch the pressed key
window.addEventListener('keydown', (e) =>{
    switch(e.key){
        case 'w':
            console.log('w pressed');
            keys.w.pressed = true;
            lastKey = 'w'
            break
        case 'a':
            console.log('a pressed');
            keys.a.pressed = true;
            lastKey = 'a'
            break
        case 's':
            console.log('s pressed');
            keys.s.pressed = true;
            lastKey = 's'
            break
        case 'd':
            console.log('d pressed');
            keys.d.pressed = true;
            lastKey = 'd'
            break
    }

});
// Event Listener to catch the upped key
window.addEventListener('keyup', (e) =>{
    switch(e.key){
        case 'w':
            console.log('w pressed');
            keys.w.pressed = false;
            break
        case 'a':
            console.log('a pressed');
            keys.a.pressed = false;
            break
        case 's':
            console.log('s pressed');
            keys.s.pressed = false;
            break
        case 'd':
            console.log('d pressed');
            keys.d.pressed = false;
            break
    }

});