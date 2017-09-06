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

var 효과 = {
  사운드 : {
    점프: '',
    인사: '',
    충돌: ''
  }
};


var 물리학 = {
  중력: 0.3,
  점프: -7
};

var 지형지물 = {
  땅: {  imgUrl: 'assets/flappy_bg.png', x: 0, y: 450 },
  파이프: {  imgUrl: 'assets/flappy_pipe.png', 너비: 100, 높이: 100 },
  배경: {  imgUrl: 'assets/flappy_bg.png', 너비: 100, 높이: 100 },
  최소열기: 300
};

var 캐릭터정보 = { 
  이름: '머피',
  imgUrl: 'assets/source/characters/murphy.png',
  사운드: {
    선택: 'assets/sound/murphy.ogg',
    점프: 'assets/sound/murphy/jump.ogg',
    충돌: 'assets/sound/murphy/collide.ogg'
  }
};
var 캐릭터;




   
function preload() {
    console.log("캐릭터", 캐릭터정보);
    preloadSound();
    preloadImage();
}

// 사운드 파일 로드
function preloadSound(){
    console.log("preloadSound!");
    console.log("캐릭터", 캐릭터정보);

    // 효과.사운드.선택 = loadSound('assets/sound/jump.ogg');
    효과.사운드.점프 = loadSound('assets/sound/jump.ogg');
    // 효과.사운드.충돌 = loadSound('assets/sound/collide.ogg');



    jumpsound = loadSound('assets/sound/jump.ogg');
    diesound = loadSound('assets/sound/die.ogg');
}

// 이미지 파일 로드
function preloadImage(){ 
  
  // birdImg = loadImage('assets/jidori_face.png');
  birdImg = loadImage('assets/source/characters/robbins.png');
  캐릭터이미지 = loadImage(캐릭터정보.imgUrl);
  
  파이프이미지 = loadImage(지형지물.파이프.imgUrl); //pipeImg
  땅이미지 = loadImage(지형지물.땅.imgUrl); // groundImg
  배경이미지 = loadImage(지형지물.배경.imgUrl); // bgImg
  // friendsImg = loadImage('assets/jidori_face.png');
  

}




function setup() {
  createCanvas(1280, 720);
  background(0);
  point = 0;

  캐릭터 = createSprite(width/2, height/2, 40, 40);
  캐릭터.rotateToDirection = true;
  캐릭터.velocity.x = 4;
  캐릭터.setCollider('circle', 0, 0, 20);
  캐릭터.addImage(캐릭터이미지);

  // bird = createSprite(width/2, height/2, 40, 40);
  // bird.rotateToDirection = true;
  // bird.velocity.x = 4;
  // bird.setCollider('circle', 0, 0, 20);
  // bird.addImage(캐릭터이미지);

  // ground = createSprite(width, 지형지물.땅.y + 100); //image 800x200
  // ground.addImage(땅이미지);

  땅 = createSprite(width, 지형지물.땅.y + 100); //image 800x200
  땅.addImage(땅이미지);

  pipes = new Group();
  // friends = new Group();
  gameOver = true;
  updateSprites(false);

  camera.position.y = height/2;


  soundOption(); //사운드 켜기
}

function draw() {
  if(gameOver && keyWentDown('x')) { newGame(); }

  if(!gameOver) {

    // if(keyWentDown('x')) { bird.velocity.y = FLAP; }
    if(keyWentDown('x')) { 캐릭터.velocity.y = FLAP; }

    // bird.velocity.y += GRAVITY;
    캐릭터.velocity.y += GRAVITY;

    // if(bird.position.y<0) { bird.position.y = 0; }
    // if(bird.position.y+bird.height/2 > GROUND_Y) { die(); }

    if(캐릭터.position.y<0) { 캐릭터.position.y = 0; }
    if(캐릭터.position.y + 캐릭터.height/2 > 지형지물.땅.y) { die(); }

    // if(bird.overlap(pipes)) { die(); }
    // if(bird.overlap(friends)){ addPoint(); }

    if(캐릭터.overlap(pipes)) { die(); }
    if(캐릭터.overlap(friends)){ addPoint(); }

/*
    if(frameCount%60 == 0) {
      var friendH = 100;
      var friend = createSprite(bird.position.x + width, height/2, 0, friendH);
      friend.addImage(friendsImg);
      friends.add(friend);
    }

  */

  
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
  image(배경이미지, 0, 지형지물.땅.y-190);
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
  ground.position.x = width/2;
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