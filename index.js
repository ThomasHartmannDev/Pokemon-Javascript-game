const canvas = document.querySelector('canvas'); // Selection canvas
const ctx = canvas.getContext('2d'); // Context from canvas
// Setting up the width&height from canvas
canvas.width = 1024;
canvas.height = 576;

ctx.fillStyle = 'grey'; // Filling canvas with grey
ctx.fillRect(0,0, canvas.width, canvas.height); 

const backgroung = new Image();
backgroung.src = './img/Pellet_Town.png';

const playerImage = new Image(); 
playerImage.src = './img/player/playerDown.png';


backgroung.onload = () => {
    ctx.drawImage(backgroung,-735,-550);
    ctx.drawImage(playerImage, 
        (canvas.width/2) - (playerImage.width / 2), 
        (canvas.height/2) - (playerImage.height / 2));
}

