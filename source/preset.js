// preset.js 에서는 setup 전 해두어야할 작업들을 처리한다.

var browserSize = { w: window.innerWidth, h: window.innerHeight }; // 브라우저 
var topBarHeight = 60; // 상단 바 높이

var isSound = true;
var VIEWS = {};
var CANVAS = {}; // game.

var GLOBAL_MODE = 'MAIN'; // MAIN, SELECT, GAME, RESULT.
var GLOBAL_SOUND = true; // 전체 사운드
var SELECT_COMPLETE = false; // 선택페이지에서 선택을 완료했는지.
var GAME_COMPLETE = false;


var 화면전환시간 = 100;
var loadingTime = 3000;

var characterSize = { select: 300, game: 40 }; // 캐릭터 크기

// 캐릭터 위치
var characterPos = {
    x: -350, y: 100,
    endX: (browserSize.w + characterSize.select), endY: 100
}; 


var GRAVITY = 0.3;
var FLAP = -7;
var GROUND_Y = 450;
var MIN_OPENING = 300;

var VELOCITY_X = 8;
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

var baseUrl = {
  img: 'assets/images/friends/',
  sound: 'assets/sound/greet/'
};


// 친구들 설정
var 친구들그룹; // for Obstacle
var 친구들;


var 친구들크기 = { w: 329, h: 608 };
var 친구들위치 = { y: browserSize.h / 8 };
var 친구들간격 = 3000;
var 친구들인사시작점 = (친구들간격 - 300); // 만나기 조금 전에 액션 시작위함

// 친구들정보 Arr version. 14
var friendsDB = [
  { name: '다롱이', name_eng: 'darongi', y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { name: '데이지', name_eng: 'deiji', y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { name: '딜', name_eng: 'dill',   y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { name: '디노', name_eng: 'dino', y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { name: '갈릭', name_eng: 'galic',  y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { name: '곰돌이', name_eng: 'gomdori',  y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { name: '곰순이', name_eng: 'gomsuni',  y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { name: '아이고춥다', name_eng: 'igochoopda', y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { name: '나나', name_eng: 'nana',  y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { name: '퍼피', name_eng: 'puppy', y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { name: '라빈스', name_eng: 'rabins', y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { name: '로리', name_eng: 'rori', y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { name: '로즈', name_eng: 'rose', y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h },
  { name: '로즈힙', name_eng: 'rosehip', y: 친구들위치.y, w: 친구들크기.w, h: 친구들크기.h }
];

var friendIndex = 0; // 친구들 인덱스
var friendIndexMax = friendsDB.length;  // 친구들 총 수



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
  
    
    // 지형지물 이미지
    console.log("지형지물 이미지 로딩");
    파이프이미지 = loadImage(지형지물.파이프.imgUrl);
    배경이미지 = loadImage(지형지물.배경.imgUrl);
    피니시이미지 = loadImage(지형지물.피니시.imgUrl); 
  
    
    // 친구들 DB에 P5Image, P5Sound 객체 추가
    for (var dbi = 0; dbi < friendsDB.length; dbi++){
      var eachImgUrl = baseUrl.img + friendsDB[dbi].name_eng + '.png';
      var eachSoundUrl = baseUrl.sound + friendsDB[dbi].name_eng + '.ogg';
      
      
      // 친구들 이미지
      friendsDB[dbi].x = (dbi + 1) * 친구들간격;
      friendsDB[dbi].img = loadImage(eachImgUrl);
      friendsDB[dbi].greet = loadSound(eachSoundUrl);
    }
    
}

// 각 캔버스의 container를 select.
function setContainer() {
    VIEWS.main = select("#main");
    VIEWS.select = select("#select");
    VIEWS.loading = select("#loading");
    VIEWS.game = select("#game");
    VIEWS.result = select("#result");
   
}


function soundControll(soundState) {
  
  if (soundState === 'on') {
    console.log("sound on!");
    GLOBAL_SOUND = true;
    효과.사운드.bgm.default.play(); // BGM 재생
  }
  else if (soundState === 'off') {
    console.log("sound off!");
    GLOBAL_SOUND = false;
    효과.사운드.bgm.default.pause(); // BGM 재생
  }
  

  
}