//flappy bird-like
//mouse click or x to flap

var GRAVITY = 0.3;
var FLAP = -7;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var bird, ground;
var pipes;
var friends;
var gameOver;
var birdImg, pipeImg, groundImg, bgImg;
var point;


var 캐릭터 = "머피";
   
function preload() {
  console.log("preload!");
  console.log(캐릭터);

  // mySound = loadSound('sound/supermario.mp3');
  jumpsound = loadSound('assets/sound/jump.ogg');
  diesound = loadSound('assets/sound/die.ogg');
  // 벽돌 =  loadImage("image/brick.png");
}



function setup() {
  console.log("setup!");
  createCanvas(1280, 720);
  background(0);
  point = 0;
  // birdImg = loadImage('assets/flappy_bird.png'); //origin
  birdImg = loadImage('assets/source/characters/murphy.png');
  // birdImg = loadImage('assets/jidori_face.png');
  // birdImg = loadImage('assets/source/characters/robbins.png');
  
  pipeImg = loadImage('assets/flappy_pipe.png');
  friendsImg = loadImage('assets/jidori_face.png');
  groundImg = loadImage('assets/flappy_ground.png');
  bgImg = loadImage('assets/flappy_bg.png');
  

  bird = createSprite(width/2, height/2, 40, 40);
  bird.rotateToDirection = true;
  bird.velocity.x = 4;
  bird.setCollider('circle', 0, 0, 20);
  bird.addImage(birdImg);

  ground = createSprite(1280, GROUND_Y+100); //image 800x200
  ground.addImage(groundImg);

  pipes = new Group();
  friends = new Group();
  gameOver = true;
  updateSprites(false);

  camera.position.y = height/2;


  soundOption(); //사운드 켜기
}

function draw() {
  
  


  if(gameOver && keyWentDown('x')) { newGame(); }

  if(!gameOver) {

    if(keyWentDown('x')) { bird.velocity.y = FLAP; }

    bird.velocity.y += GRAVITY;

    if(bird.position.y<0) { bird.position.y = 0; }

    if(bird.position.y+bird.height/2 > GROUND_Y) { die(); }

    if(bird.overlap(pipes)) { die(); }
    if(bird.overlap(friends)){ addPoint(); }

    if(frameCount%60 == 0) {
      var friendH = 100;
      var friend = createSprite(bird.position.x + width, height/2, 0, friendH);
      friend.addImage(friendsImg);
      friends.add(friend);
    }

    //spawn pipes
    if(frameCount%60 == 0) {
      var pipeH = random(50, 300);
      var pipe = createSprite(bird.position.x + width, GROUND_Y-pipeH/2+1+100, 80, pipeH);
      pipe.addImage(pipeImg);
      pipes.add(pipe);

      //top pipe
      if(pipeH<200) {
        pipeH = height - (height-GROUND_Y)-(pipeH+MIN_OPENING);
        pipe = createSprite(bird.position.x + width, pipeH/2-100, 80, pipeH);
        pipe.mirrorY(-1);
        pipe.addImage(pipeImg);
        pipes.add(pipe);
      }
    }

    //get rid of passed pipes
    for(var i = 0; i<pipes.length; i++)
      if(pipes[i].position.x < bird.position.x-width/2)
        pipes[i].remove();
  }

//   camera.position.x = bird.position.x + width/4;
  camera.position.x = bird.position.x + width/4;

  //wrap ground
  if(camera.position.x > ground.position.x-ground.width+width/2) {
    ground.position.x+=ground.width;
  }
    

  background(247, 134, 131);
  camera.off();
  image(bgImg, 0, GROUND_Y-190);
  camera.on();

  drawSprites(pipes);
  drawSprite(ground);
  drawSprite(bird);
  push();
  color(0);
  textSize(20);
  text("현재 점수: " + point, camera.position.x+200, 40);
  pop();
} // drwar end

function die() {
  point = 0;
  updateSprites(false);
  gameOver = true;
  diesound.play();
}

function newGame() {
  pipes.removeSprites();
  gameOver = false;
  updateSprites(true);
  bird.position.x = width/2;
  bird.position.y = height/2;
  bird.velocity.y = 0;
  ground.position.x = 1280/2;
  ground.position.y = GROUND_Y+100;
}

function mousePressed() {
  if(gameOver)
    newGame();
  bird.velocity.y = FLAP;
  point++;
  console.log("당신의 점수는 : " + point);
  jumpsound.play();
}



function soundOption(){
  // mySound.setVolume(0.1);
  // mySound.play();
}

function addPoint(){
  point = point+100;
}