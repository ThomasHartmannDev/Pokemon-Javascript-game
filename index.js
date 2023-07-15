const canvas = document.querySelector('canvas'); // Selection canvas
const ctx = canvas.getContext('2d'); // Context from canvas

// Setting up the width&height from canvas
canvas.width = 1024;
canvas.height = 576;
const offset = {x:-735, y:-600}

const collisionsMap = [];
//For loop to create a Array from Arrays to create the CollisionsMap
for(let i= 0; i < collisions.length; i+=70){
    //Slice 0 - 70
    collisionsMap.push(collisions.slice(i, 70 + i));
}

class Boundary{
    static width = 48;
    static height = 48;
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
        if(Symbol === 1025){
            boundaries.push(new Boundary({position:{
                x:j * Boundary.width + offset.x, 
                y:i * Boundary.height + offset.y
            }}));
        }
        
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
    constructor({position, velocity, image, frames = {max: 1}}){
        this.position = position;
        this.image = image;
        this.frames = frames;
        this.image.onload = ()=>{
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
       
        
        
    }
    // Method from the class to Draw the on the canvas
    draw(){
        ctx.drawImage(
            //Selecting the image
            this.image,
            //Cropping image
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            //Location - Center canvas

            this.image.width / this.frames.max,
            this.image.height
        );
    }
  //  (canvas.width/2) - (this.image.width / 4) / 2, 
  //  (canvas.height/2) - (this.image.height / 2),
}

const player = new Sprite({
    position:{
        x:(canvas.width/2) - (192 / 4) / 2,
        y:(canvas.height/2) - (68 / 2),
    },
    image: playerImage,
    frames:{max:4}
})

// Creating the background.
const background = new Sprite({position:{x:offset.x,y:offset.y}, image: backgroungImage});

//List of everything thats going to move.
const movables = [background, ...boundaries]
//Function to test the player and boundaries collision
function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    );
}
// animation function
function animate(){
    window.requestAnimationFrame(animate);
    //Setting up the background 
    background.draw();
    boundaries.forEach((boundary) => { 
        boundary.draw();
        
        if(rectangularCollision({
            rectangle1: player, 
            rectangle2: boundary})
        ) {
           console.log('asas');
        }
    });
    //Setting up the player
    player.draw();
    //Creating the "player movement" using the ilusion from the map moving
    if(keys.w.pressed && lastKey === 'w'){movables.forEach(movables => {movables.position.y += 3});} 
    else if (keys.s.pressed && lastKey === 's'){movables.forEach(movables => {movables.position.y -= 3});}
    else if (keys.a.pressed && lastKey === 'a'){movables.forEach(movables => {movables.position.x += 3});}
    else if (keys.d.pressed && lastKey === 'd'){movables.forEach(movables => {movables.position.x -= 3});}
        
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