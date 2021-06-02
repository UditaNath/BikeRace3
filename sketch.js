var path,mainCyclist, opponent1, opponent2, opponent3, obstacle1, obstacle2, obstacle3;
var pathImg,mainRacerImg1,mainRacerImg2,opponent1Img,opponent2Img,opponent3Img,obstacle1Img,obstacle2Img, obstacle3Img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var health=100;

var distance=0;
var cycleBell,cycleBellSound;
var pinkCG, yellowCG, redCG, obstaclesGroup;
var  gameOverImg, gameOver;


function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2=loadImage("images/mainPlayer3.png");
 
 opponent1Img=loadAnimation("images/opponent1.png","images/opponent2.png");
  opponent2Img=loadAnimation("images/opponent4.png","images/opponent5.png");
  opponent3Img=loadAnimation("images/opponent7.png","images/opponent8.png");
  
  cycleBellSound=loadSound("sound/bell.mp3");
  
  gameOverImg=loadImage("images/gameOver.png");
  
  obstacle1Img=loadImage("images/obstacle1.png");
  obstacle2Img=loadImage("images/obstacle2.png");
  obstacle3Img=loadImage("images/obstacle3.png");
}

function setup(){
  
createCanvas(displayWidth-50,displayHeight-50);
  
// Moving background
path=createSprite(displayWidth/2,displayHeight/2);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(displayWidth/2,displayHeight/2-50,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.1;
  mainCyclist.setCollider("rectangle",0,0,40,40);
  
  gameOver=createSprite(displayWidth/2-50,displayHeight/2-50);
  gameOver.addImage("gameOver0",gameOverImg);
  
  pinkCG=createGroup();
  yellowCG=createGroup();
  redCG=createGroup();
  obstaclesGroup=createGroup();
  
  //mainCyclist.debug=true;
  camera .position.x=mainCyclist.x;
  camera.position.y=displayHeight/2;
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,displayHeight/2-350);
  push();
  fill("green");
  text("Health: "+ health,350,displayHeight/2-310);
  pop();
  
  if(gameState===PLAY){
    
    gameOver.visible= false;
    mainCyclist.visible=true;
    
    
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    distance=distance+Math.round(getFrameRate()/50);
    path.velocityX=-(6+2*distance/150);
  
  if(keyDown("space")){
    cycleBellSound.play();
  }
    
    var select_oppPlayer=Math.round(random(1,3));
    if(frameCount%150==0){
      
      if(select_oppPlayer==1){
        pinkCyclists();
      }else if(select_oppPlayer==2){
        yellowCyclists();
      }else{
        redCyclists();
      }
  }
    
    if(frameCount%180==0){
      obstacles();
    }

    
    
    if(pinkCG.isTouching(mainCyclist)){
      health=health-1;
      //
      
      
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      health=health-1;
      //
     
       
    }
    
    if(redCG.isTouching(mainCyclist)){
      health=health-1;
      //
      
       
    }
    
    if(obstaclesGroup.isTouching(mainCyclist)){
      health=health-1;
      
      
    }

    if(health<=50){
      push();
      fill("orange");
      text("Health: "+ health,350,displayHeight/2-310);
      pop();      
    }
    if(health<=25){
      push();
      fill("red");
      text("Health: "+ health,350,displayHeight/2-310);
      pop();      
    }

    if(health==0){
      
      gameState=END;
      path.velocityX=0;
      mainCyclist.velocityX=0;
      pinkCG.setVelocityXEach(0);
      pinkCG.setLifetimeEach(-1);
      yellowCG.setVelocityXEach(0);
      yellowCG.setLifetimeEach(-1);
      redCG.setVelocityXEach(0);
      redCG.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
    }
    
 }
  
  if(gameState==END){
    push();
      fill("red");
      text("Health: "+ health,350,displayHeight/2-310);
      pop();
    gameOver.visible=true;
    pinkCG.destroyEach();
    yellowCG.destroyEach();
    redCG.destroyEach();
    obstaclesGroup.destroyEach();
    mainCyclist.visible=false;
    push ();
    strokeWeight(5);
    stroke("black");
    text("Press Up Arrow to Restart the game!",displayWidth/2-220,displayHeight/2+20);
    pop ();
    if(keyDown("UP_ARROW")){
      reset();
    }
  }
  
  
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible=false;
  score=0;
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  distance=0;
  health=100;
}

function pinkCyclists(){
  opponent1=createSprite(displayWidth,Math.round(random(50,displayHeight-100)),10,10);
  opponent1.scale=0.09;
  opponent1.addAnimation("opponent1Cycling",opponent1Img);
  opponent1.lifetime=370;
  opponent1.velocityX=-(6+2*distance/150);
  pinkCG.add(opponent1);
}

function yellowCyclists(){
  opponent2=createSprite(displayWidth,Math.round(random(50,displayHeight-100)),10,10);
  opponent2.scale=0.09;
  opponent2.addAnimation("opponent2Cycling",opponent2Img);
  opponent2.lifetime=370;
  opponent2.velocityX=-(6+2*distance/150);
  yellowCG.add(opponent2);  
}

function redCyclists(){
  opponent3=createSprite(displayWidth,Math.round(random(50,displayHeight-100)),10,10);
  opponent3.scale=0.09;
  opponent3.addAnimation("opponent3Cycling",opponent3Img);
  opponent3.lifetime=370;
  opponent3.velocityX=-(6+2*distance/150);
  redCG.add(opponent3);
}

function obstacles(){
  obstacle= createSprite(displayWidth,Math.round(random(50,displayHeight-100)),10,10);
  var randm = Math.round(random(1,3));
    switch(randm) {
      case 1: obstacle.addImage(obstacle1Img);
              break;
      case 2: obstacle.addImage(obstacle2Img);
              break;
      case 3: obstacle.addImage(obstacle3Img);
              break;
      default: break;
    }
  obstacle.lifetime = 500;
  obstacle.velocityX=-(6+2*distance/150);
  obstacle.scale=0.09;
  obstaclesGroup.add(obstacle);
  
}


