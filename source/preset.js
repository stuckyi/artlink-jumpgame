// preset.js 에서는 setup 전 해두어야할 작업들을 처리한다.

var browserSize = { w: window.innerWidth, h: window.innerHeight }; // 브라우저 
var topBarHeight = 60; // 상단 바 높이

var isSound = true;
var VIEWS = {};
var CANVAS = {}; // game.

var GLOBAL_MODE = 'MAIN'; // MAIN, SELECT, GAME, RESULT.
var SELECT_COMPLETE = false; // 선택페이지에서 선택을 완료했는지.
var GAME_COMPLETE = false;

// var loadingTime = 200000;
// var 화면전환시간 = 2000; 
var 화면전환시간 = 100;
var loadingTime = 3000;

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

var 캐릭터이미지, 파이프이미지, 땅이미지, 배경이미지, 피니시이미지;



var 클릭한캐릭터 = '';

// 피니시정보

var 피니시;
var 피니시정보 = {};

var 파이프그룹;

// 친구들 설정
var 친구들그룹; // for Obstacle
var 친구들;


var 친구들크기 = { w: 329, h: 608 };
var 친구들위치 = { y: browserSize.h / 8 };
var 친구들간격 = 2000;
var 친구들정보 = {
  daroni: { 이름: '다롱이',  imgUrl: 'assets/images/friends/gerbera.png', x: 1*친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  deiji: { 이름: '데이지', imgUrl: 'assets/images/friends/gerbera.png', x: 2*친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  didi: { 이름: '디디', imgUrl: 'assets/images/friends/gerbera.png', x: 3*친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  dino: { 이름: '디노', imgUrl: 'assets/images/friends/gerbera.png', x: 4*친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  galic: { 이름: '갈릭', imgUrl: 'assets/images/friends/gerbera.png', x: 5*친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  gomdori: { 이름: '곰돌이', imgUrl: 'assets/images/friends/gerbera.png', x: 6*친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  gomsuni: { 이름: '곰순이', imgUrl: 'assets/images/friends/gerbera.png', x: 7*친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  igochoopda: { 이름: '아이고춥다', imgUrl: 'assets/images/friends/gerbera.png', x: 8*친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  nana: { 이름: '나나', imgUrl: 'assets/images/friends/gerbera.png', x: 9 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  puppy: { 이름: '퍼피', imgUrl: 'assets/images/friends/gerbera.png', x: 9 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  rabins: { 이름: '라빈스', imgUrl: 'assets/images/friends/gerbera.png', x: 9 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  rori: { 이름: '로리', imgUrl: 'assets/images/friends/gerbera.png', x: 9 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  rose: { 이름: '로즈', imgUrl: 'assets/images/friends/gerbera.png', x: 9*친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  rosehip: { 이름: '로즈힙', imgUrl: 'assets/images/friends/gerbera.png', x: 9 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h }
};

// 친구들정보 Arr version.
var friendsDB = [
  { 이름: '다롱이', name_eng: 'darongi', x: 1 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { 이름: '데이지', name_eng: 'deiji',  x: 2 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { 이름: '디디', name_eng: 'didi',   x: 3 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { 이름: '디노', name_eng: 'dino', x: 4 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { 이름: '갈릭', name_eng: 'galic',  x: 5 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { 이름: '곰돌이', name_eng: 'gomdori', x: 6 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { 이름: '곰순이', name_eng: 'gomsuni',  x: 7 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { 이름: '아이고춥다', name_eng: 'igochoopda', x: 8 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { 이름: '나나', name_eng: 'nana', x: 9 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { 이름: '퍼피', name_eng: 'puppy', x: 9 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { 이름: '라빈스', name_eng: 'rabins',x: 9 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { 이름: '로리', name_eng: 'rori', x: 9 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { 이름: '로즈', name_eng: 'rose', x: 9 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { 이름: '로즈힙', name_eng: 'rosehip', x: 9 * 친구들간격, y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h }
];

var 거베라이미지,
  거베라2이미지,
  거베라3이미지,
  거베라4이미지,
  거베라5이미지,
  거베라6이미지,
  거베라7이미지,
  거베라8이미지,
  거베라9이미지;


var testFriendsArr = [];

//
// Resource
//

// Sound
var 효과 = {
  사운드: {}
}; // .사운드

// 지형지물
var 지형지물 = {
  땅: {  imgUrl: 'assets/source/p5play/flappy_ground.png', x: 0, y: 450 },
  // 파이프: { imgUrl: 'assets/source/p5play/flappy_pipe.png', 너비: 100, 높이: 100 }, // 80X392
  파이프: {  imgUrl: 'assets/images/graphic/flower.png', 너비: 100, 높이: 100 }, // 80X392
  배경: { imgUrl: 'assets/images/graphic/backgroundImage.png', 너비: 100, 높이: 100 },
  피니시: { imgUrl: 'assets/images/ui/game/finish.png', 너비: 100, 높이: 100 }
};





function preload() {  
    console.log("preload() start.");
    setContainer(); 

    
    // 사운드 파일
    console.log("사운드 파일 로딩");
    효과.사운드.점프 = {
      default: loadSound('assets/sound/jump/default.ogg'),
      murphy: loadSound('assets/sound/jump/murphy.ogg'),
      kitty: loadSound('assets/sound/jump/kitty.ogg'),
      tulip: loadSound('assets/sound/jump/tulip.ogg'),
      violet: loadSound('assets/sound/jump/violet.ogg'),
      bubblegirl: loadSound('assets/sound/jump/bubblegirl.ogg')
    };
    효과.사운드.die = {
      default: loadSound('assets/sound/die/default.ogg'),
      murphy: loadSound('assets/sound/die/murphy.ogg'),
      kitty: loadSound('assets/sound/die/kitty.ogg'),
      tulip: loadSound('assets/sound/die/tulip.ogg'),
      violet: loadSound('assets/sound/die/violet.ogg'),
      bubblegirl: loadSound('assets/sound/die/bubblegirl.ogg')
    };
    효과.사운드.start = {
        default: loadSound('assets/sound/start/default.ogg'),
        murphy: loadSound('assets/sound/start/murphy.ogg'),
        kitty: loadSound('assets/sound/start/kitty.ogg'),
        tulip: loadSound('assets/sound/start/tulip.ogg'),
        violet: loadSound('assets/sound/start/violet.ogg'),
        bubblegirl: loadSound('assets/sound/start/bubblegirl.ogg')
    };
    효과.사운드.bgm = { default: loadSound('assets/sound/bgm/default.ogg') };
  
    효과.사운드.greet = {
      default: loadSound('assets/sound/greet/default.ogg'),
      darongi: loadSound('assets/sound/greet/darongi.ogg'),
      deigi: loadSound('assets/sound/greet/deiji.ogg'),
      didi: loadSound('assets/sound/greet/didi.ogg'),
      dino: loadSound('assets/sound/greet/dino.ogg'),
      galic: loadSound('assets/sound/greet/galic.ogg'),
      gomdori: loadSound('assets/sound/greet/gomdori.ogg'),
      gomsuni: loadSound('assets/sound/greet/gomsuni.ogg'),
      igochoopda: loadSound('assets/sound/greet/igochoopda.ogg'),
      nana: loadSound('assets/sound/greet/nana.ogg'),
      rabins: loadSound('assets/sound/greet/rabins.ogg'),
      rori: loadSound('assets/sound/greet/rori.ogg'),
      rose: loadSound('assets/sound/greet/rose.ogg'),
      rosehip: loadSound('assets/sound/greet/rosehip.ogg')
    };



    
    // 지형지물 이미지
    console.log("지형지물 이미지 로딩");
    파이프이미지 = loadImage(지형지물.파이프.imgUrl);
    배경이미지 = loadImage(지형지물.배경.imgUrl);
    피니시이미지 = loadImage(지형지물.피니시.imgUrl); 
    
    
    
    // 친구들 배열 관리 테스트 시작
    
    
    // 친구 객체에 P5Image 정보 추가
    var baseUrl = {
      img: 'assets/images/friends/',
      sound: 'assets/sound/greet/'
    };
  
    for (var dbi = 0; dbi < friendsDB.length; dbi++){
      var eachImgUrl = baseUrl.img + friendsDB[dbi].name_eng + '.png';
      var eachSoundUrl = baseUrl.sound + friendsDB[dbi].name_eng + '.ogg';

      friendsDB[dbi].img = loadImage(eachImgUrl);
      friendsDB[dbi].greet = loadSound(eachSoundUrl);
    }
    


  
    // 친구들 배열 관리 테스트 끝 


    // 친구들 이미지
    console.log("친구들 이미지 로딩");
  /*
    거베라이미지 = loadImage(친구들정보.거베라.imgUrl);
    거베라2이미지 = loadImage(친구들정보.거베라2.imgUrl);
    거베라3이미지 = loadImage(친구들정보.거베라3.imgUrl);
    거베라4이미지 = loadImage(친구들정보.거베라4.imgUrl);
    거베라5이미지 = loadImage(친구들정보.거베라5.imgUrl);
    거베라6이미지 = loadImage(친구들정보.거베라6.imgUrl);
    거베라7이미지 = loadImage(친구들정보.거베라7.imgUrl);
    거베라8이미지 = loadImage(친구들정보.거베라8.imgUrl);
    거베라9이미지 = loadImage(친구들정보.거베라9.imgUrl);
  
    
  
    testFriendsArr.push(친구들정보.다롱이);
  
  */

  
    
  

}

// 각 캔버스의 container를 select.
function setContainer() {

    VIEWS.main = select("#main");
    VIEWS.select = select("#select");
    VIEWS.loading = select("#loading");
    VIEWS.game = select("#game");
    VIEWS.result = select("#result");
   
}

