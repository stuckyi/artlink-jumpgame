var selectedCharacter;

var chooseBtn1,
  chooseBtn2,
  chooseBtn3,
  chooseBtn4,
  chooseBtn5;

var questionBtn1,
    questionBtn2,
    questionBtn3,
    questionBtn4,
    questionBtn5;


var charImg1, charImg2, charImg3, charImg4, charImg5;
var charInfo = [
  { fnName: viewMurphy, imgUrl: 'assets/source/side-murphy.png' },
  { fnName: viewKitty, imgUrl: 'assets/source/side-kitty.png' },
  { fnName: viewMurphy, imgUrl: 'assets/source/characters/murphy.png' },
  { fnName: viewMurphy, imgUrl: 'assets/source/characters/murphy.png' },
  { fnName: viewMurphy, imgUrl: 'assets/source/characters/murphy.png' }
];





function chooseViewInit() {
  console.log("chooseViewInit");
  //선택 버튼 생성
  chooseBtn1 = createButton('슈파플렉스 머피');
  chooseBtn1.position(500, 100);

  chooseBtn2 = createButton('키티와 튤립 키티');
  chooseBtn2.position(500, 200);
    
  chooseBtn3 = createButton('키티와 튤립 튤립');
  chooseBtn3.position(500, 300);
    
  chooseBtn4 = createButton('키티와 튤립 바이올렛');
  chooseBtn4.position(500, 400);

  chooseBtn5 = createButton('슈가맨 버블소녀 버블소녀');
  chooseBtn5.position(500, 500);

  // 버튼 공통 스타일, 함수 초기설정
  var buttons = selectAll('button');
  for (var btni = 0; btni < buttons.length; btni++){
    buttons[btni].addClass('button');

    buttons[btni].style('width', '300px');
    buttons[btni].style('height', '100px');

    buttons[btni].mousePressed(charInfo[btni].fnName); 
  }

  
  questionBtn1 = createButton('선택하시겠습니까?');
  questionBtn1.position(500, 100);
  questionBtn1.addClass('questionBtn');
  
  questionBtn2 = createButton('선택하시겠습니까?');    
  questionBtn2.position(500, 200);
  questionBtn2.addClass('questionBtn');

  questionBtn3 = createButton('선택하시겠습니까?');    
  questionBtn3.position(500, 300); 
  questionBtn3.addClass('questionBtn');  

  questionBtn4 = createButton('선택하시겠습니까?');    
  questionBtn4.position(500, 400);  
  questionBtn4.addClass('questionBtn');  

  questionBtn5 = createButton('선택하시겠습니까?');    
  questionBtn5.position(500, 500);
  questionBtn5.addClass('questionBtn'); 

   // 버튼 공통 스타일, 함수 초기설정
  var buttons = selectAll('.questionBtn');
  for (var btni = 0; btni < buttons.length; btni++){
    buttons[btni].addClass('button');

    buttons[btni].style('width', '300px');
    buttons[btni].style('height', '100px');

    buttons[btni].mousePressed(gameStart); 
  }  
  
  
  // 선택시 보여줄 이미지 초기 설정
  charImg1 = createImg(charInfo[0].imgUrl);
  charImg1.addClass('selectedImg');
  charImg1.size(100, 100);
  charImg2 = createImg(charInfo[1].imgUrl);
  charImg3 = createImg(charInfo[2].imgUrl);
  charImg4 = createImg(charInfo[3].imgUrl);
  charImg5 = createImg(charInfo[4].imgUrl);

  // 모든 캐릭터 이미지 숨긴다.  
  charImg1.hide();
  charImg2.hide();
  charImg3.hide();
  charImg4.hide();
  charImg5.hide();

  // 모든 질문 버튼 숨긴다.  
  questionBtn1.hide();  
  questionBtn2.hide();
  questionBtn3.hide();  
  questionBtn4.hide();
  questionBtn5.hide();

}


function gameStart() {
    isSelected = true;
    
    var allBtn = selectAll('button');
    for (var allBtni = 0; allBtni < allBtn.length; allBtni++){
        allBtn[allBtni].hide();
    }

    setTimeout(function () {
        chooseV.hide();
        gameV.show();
        GLOBAL_MODE = 'gameV';
        새게임시작();
     }, 1000);

    console.log("game Start with: " + selectedCharacter);
}


function updateButtonState() {
    charImg1.hide();
    charImg2.hide();
    charImg3.hide();
    charImg4.hide();
    charImg5.hide();

    // 모든 캐릭터 이미지 숨긴다.  
    charImg1.hide();
    charImg2.hide();
    charImg3.hide();
    charImg4.hide();
    charImg5.hide();

    // 모든 질문 버튼 숨긴다.  
    questionBtn1.hide();  
    questionBtn2.hide();
    questionBtn3.hide();  
    questionBtn4.hide();
    questionBtn5.hide();

    switch (selectedCharacter) {
        case 'murphy':
            charImg1.show();    
            questionBtn1.show();
            break;
        case 'kitty':
            charImg2.show();        
            questionBtn2.show();
            break;
        case 'tulip':
            charImg3.show();        
            questionBtn3.show();
            break;
        case 'violet':
            charImg4.show();        
            questionBtn4.show();
            break;
        case 'bubblegirl':
            charImg5.show();        
            questionBtn5.show();
            break;
        default:
            console.log('selectedCharacter is null value.');
            break;    
    }


}

function viewMurphy() {
    selectedCharacter = 'murphy';
    ON_SELECTED = true;
    charPos = -350; // reset

    updateButtonState();    
}



function viewKitty() {
    selectedCharacter = 'kitty';
    ON_SELECTED = true;
    charPos = -350; // reset

    updateButtonState();
}

