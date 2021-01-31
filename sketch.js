var track,trackImg;
var player,playerImg;
var crewmates,crew1,crew2,crew3,crew4,crew5,crew6,crew7,crew9,crew10,crew11,crew12,deadBody;
var crewmatesGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart_img,restart;
var gameOver,gameOver_img;
var killSound;

function preload(){
  trackImg = loadImage("images/track.jpg");
  playerImg = loadImage("images/img1.png");
  crew1 = loadImage("images/img2.png");
  crew2 = loadImage("images/img3.png");
  crew3 = loadImage("images/img4.png");
  crew4 = loadImage("images/img5.png");
  crew5 = loadImage("images/img6.png");
  crew6 = loadImage("images/img7.png");
  crew7 = loadImage("images/img8.png");
  crew9 = loadImage("images/img10.png");
  crew10 = loadImage("images/img11.png");
  crew11 = loadImage("images/img12.png");
  restart_img = loadImage("images/restartImg.png");
 gameOver_img = loadImage("images/gameOver_img.png");
 deadBody = loadImage("images/dead body.png");
 killSound = loadSound("images/kill sound.mp3");
}

function setup() {
  createCanvas(1200,1000);
// to create the track
  track = createSprite(600,500,1200,1200);
track.addImage(trackImg);
track.scale = 1.7;

//to create the group for the crewmates
crewmatesGroup = new Group();

//to create the game over image
gameOver = createSprite(600,500,10,10);
gameOver.addImage(gameOver_img);
gameOver.scale = 1;
gameOver.visible = false;

//to create the restart image
restart = createSprite(600,600,10,10);
restart.addImage(restart_img);
restart.scale = 0.2;
restart.visible = false;

//to create the player sprite
player = createSprite(600,900,10,10);
player.addImage("live",playerImg);
player.addImage("dead",deadBody);
player.scale = 0.2;
player.setCollider("rectangle",0,0,50,player.height);
}

function draw() {
  background(0);
 
if(gameState === PLAY){
 //to change the image of the player
  player.changeImage("live",playerImg)
  //to move the track
  track.velocityY = (4 + 3* score/100);
  //to reset the track
  if(track.y > 600){
    track.y = track.y/2
      }

    //to move the player
      if(keyDown("LEFT_ARROW")){
        player.velocityX = -4; 
        }
    
        if(keyDown("RIGHT_ARROW")){
          player.velocityX = 4; 
          } 

//to make edges for the player 
          if(player.x<300 || player.x>950 ){
            player.x = 600;
            player.y = 900;
          }



          crewmate();
          //to create the score
          score = score + Math.round(getFrameRate()/60);
          //to go to the end state
  if(player.isTouching(crewmatesGroup)){
    //to play the kill sound
    killSound.play();
    gameState = END

  }
}
else if(gameState === END){
  //to change the image of the player
  player.changeImage("dead",deadBody);
  //to stop the track 
  track.velocityY = 0;
  //to stop the crewmates 
  crewmatesGroup.setVelocityYEach(0);
  //to set the lifetime for crewmates
  crewmatesGroup.setLifetimeEach(-1);
  //to stop the player
  player.velocityX = 0;

//to display the game over image
  gameOver.visible = true;
  //to display the restart image
  restart.visible = true;

  if(mousePressedOver(restart)){
reset();
  }
}

 



 
  drawSprites();

  fill("white");
  textSize(25);
  text("Score: " + score,950,50); 


}
//to restart the game
function reset(){
  gameState = PLAY;
  //to make the game over image invisible
  gameOver.visible = false;
  //to make the restart image invisible
  restart.visible = false;
  //to destroy the crewmates
  crewmatesGroup.destroyEach();
  //to reset score
score = 0;
}

//to create crewmates
function crewmate(){
  //to make the crewmates appear continuously
  if(frameCount % 30 === 0){
    //to create the sprite for crewmates
crewmates = createSprite(600,-10,10,10);
//to make the crewmates move
crewmates.velocityY = 20;
//to adjudt the size of the crewmates
crewmates.scale = 0.2;
//to make the crewmates appear randomly at x position
crewmates.x = Math.round(random(300,900));

//to add images for crewmates
var rand = Math.round(random(1,11));
switch(rand){
  case 1 : crewmates.addImage(crew1)
  break;
  case 2 : crewmates.addImage(crew2)
  break;
  case 3 : crewmates.addImage(crew3)
  break;
  case 4 : crewmates.addImage(crew4)
  break;
  case 5 : crewmates.addImage(crew5)
  break;
  case 6 : crewmates.addImage(crew6)
  break;
  case 7 : crewmates.addImage(crew7)
  break;
  case 8 : crewmates.addImage(crew9)
  break;
  case 9 : crewmates.addImage(crew10)
  break;
  case 10 : crewmates.addImage(crew11)
  break;
  default:break
}
//to create the depth for crewmates
crewmates.depth = gameOver.depth;
gameOver.depth+=1;
crewmates.lifetime = 100;
crewmatesGroup.add(crewmates);
  }
}