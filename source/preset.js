// preset.js 에서는 setup 전 해두어야할 작업들을 처리한다.

var browserSize = { w: window.outerWidth, h: window.outerHeight }; // 브라우저 크기
var VIEWS = {};
var CANVAS = {}; // game.

var GLOBAL_MODE = 'MAIN'; // MAIN, SELECT, GAME, RESULT.
var SELECT_COMPLETE = true;
var GAME_COMPLETE = false;



// 캐릭터 크기
var characterSize = { select: 300, game: 40 };

// 캐릭터 위치
var characterPos = {
    x: -350, y: 100,
    endX: (browserSize.w + characterSize.select), endY: 100
}; 


var GRAVITY = 0.3;
var FLAP = -7;
var GROUND_Y = 450;
var MIN_OPENING = 300;

var VELOCITY_X = 10;


var 점수 = { 현재: 0, 최고: 0, 최근: 0 };

var 물리학 = { 중력: 0.3, 점프: -7 };

// 캐릭터 설정
var 캐릭터;
var 캐릭터정보 = {};

var 캐릭터이미지, 파이프이미지, 땅이미지, 배경이미지;


var 파이프그룹;

// 친구들 설정
var 친구들그룹; // for Obstacle
var 친구들;

var 친구들크기 = { w: 329, h: 608 };
var 친구들위치 = { y: browserSize.h / 8 };
var 친구들간격 = 2000;
var 친구들정보 = {
  거베라: { 이름: '거베라',  imgUrl: 'assets/images/friends/gerbera.png', x: 1*친구들간격, y: 친구들위치.y },
  거베라2: { 이름: '거베라2', imgUrl: 'assets/images/friends/gerbera.png', x: 2*친구들간격, y: 친구들위치.y },
  거베라3: { 이름: '거베라3', imgUrl: 'assets/images/friends/gerbera.png', x: 3*친구들간격, y: 친구들위치.y },
  거베라4: { 이름: '거베라4', imgUrl: 'assets/images/friends/gerbera.png', x: 4*친구들간격, y: 친구들위치.y },
  거베라5: { 이름: '거베라5', imgUrl: 'assets/images/friends/gerbera.png', x: 5*친구들간격, y: 친구들위치.y },
  거베라6: { 이름: '거베라6', imgUrl: 'assets/images/friends/gerbera.png', x: 6*친구들간격, y: 친구들위치.y },
  거베라7: { 이름: '거베라7', imgUrl: 'assets/images/friends/gerbera.png', x: 7*친구들간격, y: 친구들위치.y },
  거베라8: { 이름: '거베라8', imgUrl: 'assets/images/friends/gerbera.png', x: 8*친구들간격, y: 친구들위치.y },
  거베라9: { 이름: '거베라9', imgUrl: 'assets/images/friends/gerbera.png', x: 9*친구들간격, y: 친구들위치.y }
};

var 거베라이미지, 거베라2이미지, 거베라3이미지, 거베라4이미지, 거베라5이미지, 거베라6이미지, 거베라7이미지, 거베라8이미지, 거베라9이미지;



//
// Resource
//

// Font
var spoca = {};

// Sound
var 효과 = {
  사운드: {}
}; // .사운드

// 지형지물
var 지형지물 = {
  땅: {  imgUrl: 'assets/source/p5play/flappy_ground.png', x: 0, y: 450 },
  // 파이프: { imgUrl: 'assets/source/p5play/flappy_pipe.png', 너비: 100, 높이: 100 }, // 80X392
  파이프: {  imgUrl: 'assets/images/graphic/flower.png', 너비: 100, 높이: 100 }, // 80X392
  배경: {  imgUrl: 'assets/images/graphic/backgroundImage.png', 너비: 100, 높이: 100 }
};





function preload() {  
    console.log("preload() start.");
    setContainer(); 
    // Font file
    console.log("폰트 파일 로딩");
    spoca.thin = loadFont('assets/font/spocahansans_subset/SpoqaHanSans-Thin.otf');
    spoca.light = loadFont('assets/font/spocahansans_subset/SpoqaHanSans-Light.otf');
    spoca.bold = loadFont('assets/font/spocahansans_subset/SpoqaHanSans-Bold.otf');
    
    
    // 사운드 파일
    console.log("사운드 파일 로딩");
    효과.사운드.점프 = loadSound('assets/sound/jump.ogg');
    효과.사운드.die = loadSound('assets/sound/die.ogg');
    효과.사운드.bgm = loadSound('assets/sound/bgm/mendonald.min.ogg');

    
    // 지형지물 이미지
    console.log("지형지물 이미지 로딩");
    파이프이미지 = loadImage(지형지물.파이프.imgUrl); //pipeImg
    배경이미지 = loadImage(지형지물.배경.imgUrl); // bgImg
    
    
    

    // 친구들 이미지
    console.log("친구들 이미지 로딩");
    거베라이미지 = loadImage(친구들정보.거베라.imgUrl);
    거베라2이미지 = loadImage(친구들정보.거베라2.imgUrl);
    거베라3이미지 = loadImage(친구들정보.거베라3.imgUrl);
    거베라4이미지 = loadImage(친구들정보.거베라4.imgUrl);
    거베라5이미지 = loadImage(친구들정보.거베라5.imgUrl);
    거베라6이미지 = loadImage(친구들정보.거베라6.imgUrl);
    거베라7이미지 = loadImage(친구들정보.거베라7.imgUrl);
    거베라8이미지 = loadImage(친구들정보.거베라8.imgUrl);
    거베라9이미지 = loadImage(친구들정보.거베라9.imgUrl);
  
    
  

}

// 각 캔버스의 container를 select.
function setContainer() {

    VIEWS.main = select("#main");
    VIEWS.select = select("#select");
    VIEWS.loading = select("#loading");
    VIEWS.game = select("#game");
    VIEWS.result = select("#result");
   
}

