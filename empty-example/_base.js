// 사용자 인터페이스 환경
var WINDOW_WIDTH = window.outerWidth,
    WINDOW_HEIGHT = window.outerHeight;





// 게임 모드 변경
var GLOBAL_MODE = 'mainV'; // main, choose, game, result
var mainV, chooseV, gameV, resultV;
var isSelected = false;


var 캐릭터크기 = { choose: 300, game: 40 };
var ON_SELECTED = false;
var 캐릭터위치 = { x: -350, y: 100, endX: (WINDOW_WIDTH+캐릭터크기.choose), endY: 100 };




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
  
  // 캔버스 생성 및 DOM 요소 하위에 추가
  mainCanvas = createCanvas(400, 600);
  mainCanvas.parent("mainV");

  chooseCanvas = createCanvas(400, 600);
  chooseCanvas.parent("chooseV");

  resultCanvas = createCanvas(400, 600);
  resultCanvas.parent("resultV");
  
  gameCanvas = createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  gameCanvas.parent("gameV");

  


  // 게임 실행을 위한 전역 변수 및 관련 함수 실행
  gameSetup();

  
}



function draw() {
  if(GLOBAL_MODE === 'gameV'){
    MODE_GAME();
  } else if (GLOBAL_MODE === 'chooseV' && ON_SELECTED === true) {
    MODE_CHOOSE();
  }  
  
} // drwar end







function mousePressed() {
  if (GLOBAL_MODE === 'mainV') {
    GLOBAL_MODE = 'chooseV';
    mainV.hide();
    chooseV.show();
    chooseViewInit();
  }
  
  if (GLOBAL_MODE === 'gameV') {
    console.log("game mode.");
    // if(gameOver){ 새게임시작(); } // newGame
    
    캐릭터.velocity.y = 물리학.점프;
    점수.현재++; //point++;
    
    console.log("당신의 점수는 : " + point);
    효과.사운드.점프.play();
  }
  
}



function keyPressed(){
    if(keyCode === 82){ loop(); }       // R : 루프 시작
    if(keyCode === 83){ noLoop(); }     // S : 루프 정지
}


function soundOption(){
  // mySound.setVolume(0.1);
  // mySound.play();
}
