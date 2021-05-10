var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

var bg = new Image(); 
var car = new Image();
var carOb1 = new Image();
var carOb2 = new Image();
var carOb3 = new Image();
var crash = new Image();
var song = new Audio();
var gameOver = new Audio();

song.src = "Sounds/songCut.mp3";
gameOver.src = "Sounds/gameOver.wav";
bg.src = "Images/background.png";
car.src = "Images/car6.png";
carOb1.src = "Images/car1.png";
carOb2.src = "Images/car3.png";
carOb3.src = "Images/car4.png";
crash.src = "Images/crash.png";
song.volume = 0.3;
gameOver.volume = 0.3;

var carX = 440;
var carY = 500;
var obstacleGap = 400;
var obstacles = [];
var lanes = [270,440,610,780];
var score = 0;
var gradient = ctx.createLinearGradient(0, 0, cvs.width, 0);
var stopAnimate;

shuffleArray(lanes);

obstacles[0] ={     //engellerin ilkinin tanimlanmasi
    x : lanes[0],
    x1: lanes[1],
    x2: lanes[2],
    y: -150
};

document.onkeydown = checkKey;

function checkKey(e) {          // sag ve sol tuslarinin okunması
    e = e || window.event;

    if (e.keyCode == '37') {
        if(carX <= 270){
            carX == carX;
        }else{
            carX -= 170;
        } 
    }
    else if (e.keyCode == '39') {
        if(carX >= 780){
            carX == carX;
        }else{
            carX += 170;
        }
    }
}

function shuffleArray(array) {          //Her yeni engelin x uzerinde random bir koordinata gelmesi icin diziyi karistiran fonksiyon.
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function gameControl(carX,carY,engel1X,engel2X,engel3X,engelY){         //Arabanin engele carpip carpmadigini kontrol eden fonksiyon.
    if((carY <= engelY + 120 ) || ( carY <= engelY) || (carY + 110 >= engelY || carY + 120 <= engelY +120)){
        if(carX == engel1X || carX == engel2X || carX == engel3X){
            ctx.drawImage(crash,carX -30,carY-30,150,150);
            return 0;  
        }      
    }
}

function scoreFunc(){           // score fonksiyonu
    setInterval(function(){ score++; }, 10);
    return score;
}

function finishGame(){ // Oyun bittiginde score u yazdiran fonksiyon

    gradient.addColorStop("0.0", "black");
    ctx.fillStyle = gradient; 
    ctx.fillRect(290,185,500,100);
    gradient.addColorStop("0.0", "white");
    ctx.fillStyle = gradient; 
    ctx.font = "32px Verdana";
    ctx.fillText("Your Score: "+score,410,230);
    ctx.fillText("Click on Screen to Play Again",300,260);
    playAgain();
}

function playAgain() {  // Oyun bittiginde ekrana tiklandiginda oyunu yeniden baslatan fonksiyon
    document.addEventListener('click', function (e) {
        location.reload();
    })
}

function draw(){
    
    song.play();

    ctx.drawImage(bg,0,0,cvs.width,cvs.height);
    ctx.drawImage(car,carX, carY, 60,120);
    
    for(var i = 0; i < obstacles.length; i++){
        
        ctx.drawImage(carOb1,obstacles[i].x,obstacles[i].y,60,120);
        ctx.drawImage(carOb2,obstacles[i].x1, obstacles[i].y,60,120);
        ctx.drawImage(carOb3,obstacles[i].x2,obstacles[i].y,60,120);
        
        obstacles[i].y += 2;
        
        if(obstacles[i].y == 350){
            shuffleArray(lanes)
            obstacles.push({
                x : lanes[0],
                x1: lanes[1],
                x2: lanes[2],
                y : obstacles[i].y - obstacleGap
            }); 
        }

        if(obstacles[i].y >= 400 && obstacles[i].y <= 630) {
            if(gameControl(carX,carY,obstacles[i].x,obstacles[i].x1,obstacles[i].x2,obstacles[i].y) == 0){
                setTimeout(() => {
                    cancelAnimationFrame(stopAnimate);
                  }, 0);
                  song.pause();
                  song.currentTime = 0;
                  gameOver.play();
                  finishGame();
                  return;              
        }
    }
} 
    gradient.addColorStop("0.0", "black");
    ctx.fillStyle = gradient;
    
    ctx.fillRect(50,25,150,35);
    
    gradient.addColorStop("0.0", "white");
    ctx.fillStyle = gradient;  
    ctx.font = "20px Verdana";
    ctx.fillText("Score: "+score, 50, 50);
    
    stopAnimate = requestAnimationFrame(draw);
}

score = scoreFunc();
draw();




