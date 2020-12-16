var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(500, 500);
  monkey = createSprite(50, 400);
  monkey.scale = 0.2;
  monkey.addAnimation("monkey animation", monkey_running)

  ground = createSprite(250, 455, 1000, 25);

  invisibleGround = createSprite(250, 460, 500, 25);
  invisibleGround.visible = false;

  obstacleGroup = new Group();

  bananaGroup = new Group();


}


function draw() {
  background("white")


  ground.velocityX = -4;

  if (ground.x < 0) {
    ground.x = 300;

  }
  
  
  if (monkey.isTouching(obstacleGroup)) {
    ground.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  bananaSpawn();

  obstacleSpawn();

  if (keyDown("space")) {
    monkey.velocityY = -18;
  }


  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(invisibleGround);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("survival time "+survivalTime, 100, 50);



  drawSprites();
}

function bananaSpawn() {
  if (frameCount % 60 === 0) {
    banana = createSprite(500, Math.round(random(150, 250)))
    banana.scale = 0.1;
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.lifetime = 500;
    bananaGroup.add(banana);
  }
}

function obstacleSpawn() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(500, 390)
    obstacle.scale = 0.3;
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = 500;
    obstacleGroup.add(obstacle);
  }
}