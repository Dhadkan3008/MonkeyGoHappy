var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey,monkey_running,monkeyCollide;
var ground, invisibleground,groundImage;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup,obstacleGroup;
var survivalTime;
survivalTime=0;
var score;
score=0;

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyCollide = loadAnimation("sprite_1.png");
}



function setup() {
  createCanvas(500,400);
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.13;
  monkey.addAnimation("collide", monkeyCollide);

  
  ground=createSprite(400,600,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  invisibleground=createSprite(400,360,900,10);
  invisibleground.visibile= false;
}


function draw() {
  background("skyblue");
  
  stroke("white")
  textSize(20)
  fill("white")
  text("Score:"+score,400,50)
  
  stroke("black")
  textSize(20)
  fill("black")
  survivalTime=Math.round(getFrameRate()/60);
  text("Survivaltime:"+survivalTime,250,50)
  
  if(gameState===PLAY){
    
   bananas();
   obstacles(); 
   if (ground.x < 200){
      ground.x = ground.width/2;
    }
  
  if(keyDown("Space")&&monkey.y >= 235){
    monkey.velocityY=-13 ;
  }  
   monkey.velocityY = monkey.velocityY + 1
    
    if (monkey.isTouching(bananaGroup)){
      score=score+1;
      bananaGroup.destroyEach();
    
    }
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
    
  }
  else 
    if(gameState===END){
      ground.velocityX = 0;
      monkey.changeAnimation("collide",monkeyCollide);
      
    
    
    monkey.y = 315;
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 200, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 200, 200);
      
      
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      score = 0;
      survivalTime=0;
      monkey.changeAnimation("moving", monkey_running);
      gameState = PLAY; 
    }  
    }
  
  drawSprites();
  monkey.collide(invisibleground)
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(600,220,50,50)
    banana.y=Math.round(random(130,200))
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-4;           
    
    monkey.depth=banana.depth;
    monkey.depth=monkey.depth+1;
    
    banana.lifetime=150;
    bananaGroup.add(banana); 
  }
}

function obstacles(){
  
  if(frameCount%200 ===0){
    obstacle = createSprite(600,332,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.12;
    obstacle.velocityX = -4;
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
}




