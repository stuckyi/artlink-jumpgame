

//mouse click or x to flap
var cnv;
var mainCanvas, chooseCanvas, gameCanvas, resultCanvas;

var startBtn, reStartBtn;
var replayBtn;

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
  파이프: {  imgUrl: 'assets/source/p5play/flappy_pipe.png', 너비: 100, 높이: 100 }, // 80X392
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

function MODE_GAME() {
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

    background(230, 204, 255); // 연보라
    camera.off();

    // image(배경이미지, 0, 지형지물.땅.y-190);
    camera.on();

    drawSprites(pipes);
    // drawSprite(땅); // ground
    drawSprite(캐릭터); // bird

    draw_점수표현();
  }
}



function 캐릭터초기설정() {
  
  // 캐릭터 초기 설정
  var 선택된캐릭터 = 'assets/source/characters/' + selectedCharacter + '.png';

  캐릭터이미지 = loadImage(선택된캐릭터);
  캐릭터 = createSprite(width/2, height/2, 40, 40);
  캐릭터.rotateToDirection = true;
  캐릭터.velocity.x = 4;
  캐릭터.setCollider('circle', 0, 0, 20); // setCollider("circle", offsetX, offsetY, radius)
  캐릭터.addImage(캐릭터이미지);
}

function 지형지물설정(){
  // 지형지물 설정
  // 땅 = createSprite(800 / 2, 지형지물.땅.y + 100); //image 800x200
  // 땅 = createSprite(width, 지형지물.땅.y + 100); //image 800x200 // ----------------------- 전체화면모드 EDIT
  // 땅.addImage(땅이미지);
}

function draw_지나친파이프제거() {
  console.log(pipes.length);
    // 지나친 파이프 제거하기
    for(var i = 0; i<pipes.length; i++){
      if(pipes[i].position.x < 캐릭터.position.x-width/2)
        pipes[i].remove();
    }
}


function draw_파이프생성() {
  // var 파이프크기 = { w: 80, h: random(10, 300) };
  var 파이프크기 = { w: 80, h: 392 };
  var 파이프범위offset = 100;
    

  // pipes 생성하기
  if (frameCount % 60 == 0) {

    var 하단파이프범위 = { yMin: height - (파이프크기.h / 2), yMax: height + (파이프크기.h / 2) };
    var 하단파이프랜덤Y = random(하단파이프범위.yMin, 하단파이프범위.yMax);
    var 하단파이프위치 = { x: (캐릭터.position.x + width), y: 하단파이프랜덤Y };
    var 하단파이프 = createSprite(하단파이프위치.x, 하단파이프위치.y, 파이프크기.w, 파이프크기.h); // 전체화면 모드 edit

    하단파이프.addImage(파이프이미지);
    pipes.add(하단파이프);

    // 상단 파이프
    // 상단 파이프는 하단 파이프가 일정 수준이상 높지 않을 경우에만 생성한다.
    if (하단파이프랜덤Y > height-(파이프크기.h/4)) {
      var 상단파이프범위 = { yMin: -(파이프크기.h / 2), yMax: (파이프크기.h / 2) };
      var 상단파이프위치 = { x: (캐릭터.position.x + width), y: random(상단파이프범위.yMin, 상단파이프범위.yMax) };
      var 상단파이프 = createSprite(상단파이프위치.x, 상단파이프위치.y, 파이프크기.w, 파이프크기.h); // 전체화면 모드 edit
      
      상단파이프.mirrorY(-1);
      상단파이프.addImage(파이프이미지);
      pipes.add(상단파이프);
    }
  }

}
function draw_점수표현(){
  // 점수 표현 영역
  push();
  color(0);
  textSize(14);
  if (gameOver) { text("현재 점수: " + 점수.최근, camera.position.x + 100, 40); }
  else { text("현재 점수: " + 점수.현재, camera.position.x+100, 40); }
  
  
  pop();
}

function die() {
    noLoop();               // for test

    점수.최근 = 점수.현재;      // 점수 저장
    점수.현재 = 0;            // 현재 점수 초기화
    
    updateSprites(false);
    gameOver = true;

    
    효과.사운드.die.play();
    다시하기버튼설정();
}



function 새게임시작() { 
  pipes.removeSprites();
  gameOver = false;
  updateSprites(true);

  캐릭터.position.x = width/2;
  캐릭터.position.y = height/2;
  캐릭터.velocity.y = 0;

  // 땅.position.x = 800 / 2;                   // ----------------------- 전체화면모드 EDIT
  // 땅.position.x = width;                   // ----------------------- 전체화면모드 EDIT
  // 땅.position.y = (지형지물.땅.y + 100);
  loop();
}



function addPoint(){
    점수.현재 = (점수.현재 + 100);
}




function gameSetup() {
    gameCanvas = createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    gameCanvas.parent("gameV");
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

function 다시하기버튼설정() {
  var 다시하기버튼크기 = { w: 200, h: 100 };

  replayBtn = createButton('다시하기');
  
  replayBtn.position((WINDOW_WIDTH/2-100), height/2);
  replayBtn.addClass('replayBtn');
  replayBtn.addClass('button');

  replayBtn.style('width', 다시하기버튼크기.w+'px');
  replayBtn.style('height', 다시하기버튼크기.h+'px');

  // reStartBtn.hide();
  replayBtn.mousePressed(다시하기버튼클릭);

  fill(255,0,0);
  ellipse(WINDOW_WIDTH / 2, height / 2, 100, 10);
}

function 다시하기버튼클릭() {
  새게임시작();
  replayBtn.remove();
}