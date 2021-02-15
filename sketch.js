

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, stone,stoneImage
var FoodGroup, obstacleGroup
var score = 0 ;
var backImage;

function preload(){
  backImage=loadImage("jungle.jpg");
  
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png", "Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");                                
                            
                   
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
 
}



function setup() {
  createCanvas(500,353);
  
  background1 = createSprite(200,200,400,350);
  background1.addImage(backImage);
  background1.velocityX = -1;
  
  
    
 monkey=createSprite(80,320,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -7;
  
 FoodGroup =createGroup();
  stoneGroup = createGroup();
  
  
  
  var survivalTime=0;
 
  
}


function draw() {
   background("white");
  
  
   monkey.collide(ground);
  if(gameState === PLAY){
 
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -10;
        }
    
    if(background1.x<100){
      background1.x = background1.width/2;
      
    }
    
  monkey.velocityY = monkey.velocityY + 0.6
    
  ground.x = ground.width/2;
  console.log(ground.x);
    
    
  
    

   spawnbananas();
    spawnobstacles();
 
  stroke("white");
    textSize(20);
    fill("white");
    text("score:"+score,100,100);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
    
    
  
  
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score+1;
    }
    
      
  if(monkey.isTouching(stoneGroup)){
     gameState = END;
  }
       
  if(stoneGroup.isTouching(monkey)){
    monkey.scale=0.2;
  }
  }
  
  if(gameState === END){
    
   FoodGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);
    ground.velocityX=0;
   
    FoodGroup.setVelocityXEach(0);
   stoneGroup.setVelocityXEach(0);
    
    background1.velocityX = 0;
    
    //reset();
  
  
  
  }
  text("survival Time : "+ survivalTime,100,50);
  survivalTime.depth = background1.depth
  survivalTime.depth = survivalTime.depth+1;
  
  score.depth = survivalTime.depth;
  
  drawSprites();
}
function reset(){
  gameState = PLAY;
  survivalTime = 0;
  score = 0;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();

}

function spawnbananas(){
  
  if(frameCount%80===0){
    
    banana = createSprite(400,200,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    
    banana.velocityX=-7;
    
     
    
    banana.y = Math.round(random(50,340));
    
    banana.lifetime=100;
    
    FoodGroup.add(banana);
    
  }
}

function spawnobstacles(){
  
  if(frameCount%300===0){
    
    stone = createSprite(400,340,20,20);
    stone.addImage(obstaceImage)
    stone.scale = 0.2;
    
    stone.velocityX=-7;
  
    stone.lifetime=100;
    
    obstacleGroup.add(stone);
    
  }
}