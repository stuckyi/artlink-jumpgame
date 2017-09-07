// 사용자 인터페이스 환경
var WINDOW_WIDTH = window.outerWidth;




// 게임 모드 변경
var GLOBAL_MODE = 'mainV'; // main, choose, game, result
var mainV, chooseV, gameV, resultV;




var ON_SELECTED = false;
var 캐릭터위치 = { x: -350, y: 0 };


//mouse click or x to flap
var cnv;
var mainCanvas, chooseCanvas, gameCanvas, resultCanvas;

var startBtn, reStartBtn;

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

var 점수 = {
    현재: 0,
    최고: 0,
    최근: 0
};

var 효과 = {
  사운드 : {
    점프: 'assets/sound/murphy/jump.ogg',
    인사: 'assets/sound/murphy/jump.ogg',
    충돌: 'assets/sound/murphy/jump.ogg',
    die: 'assets/sound/murphy/die.ogg'
  }
};


var 물리학 = {
  중력: 0.3,
  점프: -7
};

var 지형지물 = {
  땅: {  imgUrl: 'assets/source/p5play/flappy_ground.png', x: 0, y: 450 },
  파이프: {  imgUrl: 'assets/source/p5play/flappy_pipe.png', 너비: 100, 높이: 100 },
  배경: {  imgUrl: 'assets/source/p5play/flappy_bg.png', 너비: 100, 높이: 100 },
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
var 캐릭터이미지, 파이프이미지, 땅이미지, 배경이미지;

var 친구들 = {
    쵸파: { imgUrl: 'assets/images/friends/chopa-40x40.png', fullName:'쵸파' },
    치코리타: { imgUrl: 'assets/images/friends/chicorita-40x40.png', fullName:'치코리타 얼굴(왼쪽 모습)' },
    고양이여자아이: { imgUrl: 'assets/images/friends/catgirl-40x40.png', fullName:'끈소매티 청바지 입고가죽멜빵 가죽벨트 한 고양이 여자아이의 얼굴(빨강)' },
    호비: { imgUrl: 'assets/images/friends/hobi-40x40.png', fullName:'내친구 호비 시즌2 호비 얼굴' },
    아이언맨: { imgUrl: 'assets/images/friends/ironman-40x40.png', fullName:'초록색 아이언맨 로봇 얼굴' }
};
var 쵸파이미지, 치코리타이미지, 고양이여자아이이미지, 내친구호비이미지, 아이언맨이미지;


   
function preload() {
    setView();
    // 사운드 파일
    console.log("사운드 파일 로딩");
    효과.사운드.점프 = loadSound('assets/sound/jump.ogg');
    효과.사운드.die = loadSound('assets/sound/die.ogg');

    // 캐릭터 이미지
    console.log("캐릭터 이미지 로딩");
    // birdImg = loadImage('assets/jidori_face.png');
    birdImg = loadImage('assets/source/characters/robbins.png');
    캐릭터이미지 = loadImage(캐릭터정보.imgUrl);

    
    // 지형지물 이미지
    console.log("지형지물 이미지 로딩");
    파이프이미지 = loadImage(지형지물.파이프.imgUrl); //pipeImg
    땅이미지 = loadImage(지형지물.땅.imgUrl); // groundImg
    배경이미지 = loadImage(지형지물.배경.imgUrl); // bgImg


    // 친구들 이미지
    쵸파이미지 = loadImage(친구들.쵸파.imgUrl); 
    치코리타이미지 = loadImage(친구들.치코리타.imgUrl); 
    고양이여자아이이미지 = loadImage(친구들.고양이여자아이.imgUrl); 
    // 내친구호비이미지 = loadImage(친구들.내친구호비이미지.imgUrl); 
    // 아이언맨이미지 = loadImage(친구들.아이언맨이미지.imgUrl);
}


function setView(){
  console.log("setView");
  mainV = select("#mainV");
  chooseV = select("#chooseV");
  gameV = select("#gameV");
  resultV = select("#resultV");


  mainV.style('display', 'none');
  chooseV.style('display', 'none');
  gameV.style('display', 'none');
  resultV.style('display', 'none');

  mainV.show();
}




function setup() {

    
    console.log("setup() START");
  
    mainCanvas = createCanvas(400, 600);
    mainCanvas.parent("mainV");
  
    chooseCanvas = createCanvas(400, 600);
    chooseCanvas.parent("chooseV");
  
    gameCanvas = createCanvas(400, 600);
    gameCanvas.parent("gameV");
  
    resultCanvas = createCanvas(400, 600);
    resultCanvas.parent("resultV");
  
  
    
    
    점수.현재 = 0; // point = 0;
    캐릭터초기설정();
    지형지물설정();
    
    
    // 그룹 생성
    pipes = new Group();
    friends = new Group();

    gameOver = true;
    updateSprites(false);


    // 카메라위치 초기화
    camera.position.y = height/2;


    // soundOption(); //사운드 켜기
}



function draw() {
  if(GLOBAL_MODE === 'gameV'){
    MODE_GAME();
  } else if (GLOBAL_MODE === 'chooseV' && ON_SELECTED === true) {
    MODE_CHOOSE();


    
  }
  
} // drwar end

var isSelected = false;



function MODE_CHOOSE() {
  // 첫 지점까지 위치 이동

  if (!isSelected) {
    if (캐릭터위치.x < WINDOW_WIDTH / 5) { 캐릭터위치.x += 6; }  
  } else {
    캐릭터위치.x += 20;
  }
  
  if (selectedCharacter === 'murphy') {
    charImg1.position(캐릭터위치.x, 100);  
  } else if (selectedCharacter === 'kitty') {
    charImg2.position(캐릭터위치.x, 100);
  }
  
}
function MODE_GAME (){

  if(gameOver && keyWentDown('x')) { 새게임시작(); }

  if(!gameOver) {
    if(keyWentDown('x')) { 캐릭터.velocity.y = FLAP; }

    캐릭터.velocity.y += 물리학.중력;

    // LIFE LINE: BOTTOM
    if(캐릭터.position.y<0) { 캐릭터.position.y = 0; }
    if(캐릭터.position.y > height) { die(); }
    // if(캐릭터.position.y + 캐릭터.height/2 > 지형지물.땅.y) { die(); }

    // 부딪힘 감지
    if(캐릭터.overlap(pipes)) { die(); }
    if(캐릭터.overlap(friends)){ addPoint(); }


    if(frameCount%60 == 0) {
      console.log("친구들 생성!");
      var 친구들y = 40;
      var 친구 = createSprite(캐릭터.position.x + width, height/2, 40, 40);
      친구.addImage(쵸파이미지);
      friends.add(친구);
    }

    draw_파이프생성();
    draw_지나친파이프제거();

    // 캐릭터위치 변경에 따른 카메라 시점 변경
    camera.position.x = 캐릭터.position.x + width/4;

    // wrap ground
    if(camera.position.x > (땅.position.x - 땅.width+width/2)) {
      땅.position.x += 땅.width;
    }
    background(247, 134, 131);
    camera.off();

    image(배경이미지, 0, 지형지물.땅.y-190);
    camera.on();

    drawSprites(pipes);
    drawSprite(땅); // ground
    drawSprite(캐릭터); // bird

    draw_점수표현();
  }
}



function 캐릭터초기설정 (){
  // 캐릭터 초기 설정
  캐릭터이미지 = loadImage('assets/source/characters/murphy.png');
  캐릭터 = createSprite(width/2, height/2, 40, 40);
  캐릭터.rotateToDirection = true;
  캐릭터.velocity.x = 4;
  캐릭터.setCollider('circle', 0, 0, 20); // setCollider("circle", offsetX, offsetY, radius)
  캐릭터.addImage(캐릭터이미지);
}

function 지형지물설정(){
  // 지형지물 설정
  땅 = createSprite(800/2, 지형지물.땅.y + 100); //image 800x200
  땅.addImage(땅이미지);
}

function draw_지나친파이프제거(){
    // 지나친 파이프 제거하기
    for(var i = 0; i<pipes.length; i++){
      if(pipes[i].position.x < 캐릭터.position.x-width/2)
        pipes[i].remove();
    }
}


function draw_파이프생성(){

  // pipes 생성하기
  if(frameCount%60 == 0) {
      
    var 랜덤파이프높이 = random(50, 300); // pipeH
    var 파이프 = createSprite(캐릭터.position.x + width, 지형지물.땅.y-랜덤파이프높이 /2+1+100, 80, 랜덤파이프높이);
    파이프.addImage(파이프이미지);
    pipes.add(파이프);

    // 상단 파이프
    if(랜덤파이프높이<200) {
      랜덤파이프높이 = height - (height-지형지물.땅.y)-(랜덤파이프높이+MIN_OPENING);
      파이프 = createSprite(캐릭터.position.x + width, 랜덤파이프높이/2-100, 80, 랜덤파이프높이);
      파이프.mirrorY(-1);
      파이프.addImage(파이프이미지);
      pipes.add(파이프);
    }
  }

}
function draw_점수표현(){
  // 점수 표현 영역
  push();
  color(0);
  textSize(14);
  text("현재 점수: " + 점수.현재, camera.position.x+100, 40);
  pop();
}

function die() {
    noLoop();               // for test

    점수.최근 = 점수.현재;      // 점수 저장
    점수.현재 = 0;            // 현재 점수 초기화
    
    updateSprites(false);
    gameOver = true;

    
    효과.사운드.die.play();
}



function 새게임시작() { 
  pipes.removeSprites();
  gameOver = false;
  updateSprites(true);

  캐릭터.position.x = width/2;
  캐릭터.position.y = height/2;
  캐릭터.velocity.y = 0;

  땅.position.x = 800/2;
  땅.position.y = (지형지물.땅.y + 100);
}






function mousePressed() {
  if (GLOBAL_MODE === 'mainV') {
    GLOBAL_MODE = 'chooseV';
    mainV.hide();
    chooseV.show();
    chooseViewInit();
  }
  
  if (GLOBAL_MODE === 'gameV') {
    console.log("game mode.");
    if(gameOver){ 새게임시작(); } // newGame
    
    캐릭터.velocity.y = FLAP;
    점수.현재++; //point++;
    
    console.log("당신의 점수는 : " + point);
    효과.사운드.점프.play();
  }
  
}




function addPoint(){
    점수.현재 = (점수.현재 + 100);
}

function keyPressed(){
    if(keyCode === 82){ loop(); }       // R : 루프 시작
    if(keyCode === 83){ noLoop(); }     // S : 루프 정지
}


function soundOption(){
  // mySound.setVolume(0.1);
  // mySound.play();
}
