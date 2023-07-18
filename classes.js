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

class Boundary{
    static width = 48;
    static height = 48;
    constructor({position}){
        this.position = position;
        this.width = 48;
        this.height = 48;
    }

    draw(){
        ctx.fillStyle = 'rgba(255,0,0,0.2)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}