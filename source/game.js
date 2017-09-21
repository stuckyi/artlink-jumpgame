var gotoHomeBtn; // 홈으로 이동버튼
var replayBg; // 죽었을 때 나타나는 까만 반투명 배경
var replayBtn; // 다시 시작하기 버튼
var replayModal; // 죽었을 때 보게되는 모달창
var topBarHeight = 60; // 상단 바 높이
var isFinishSet = false; // 피니시 위치 수정 했는지 여부.
var soundOffBtn, soundOnBtn;


// 게임 옵션
var gameOver;
var selectedCharacter = 'kitty'; //default character.

var isAllFriends = false; // 모든 친구들을 다 만났는지


function gameSetup() {
    console.log('gameSetup()');
    console.log(browserSize.h - topBarHeight);

    CANVAS.game = createCanvas(browserSize.w, browserSize.h - topBarHeight);
    CANVAS.game.position(0, topBarHeight);
    CANVAS.game.parent(VIEWS.game);

    캐릭터Init();
    finishInit();
    // 땅 = createSprite(400, GROUND_Y + 100);
    // 땅.addImage(땅이미지);
    
    파이프그룹 = new Group();
    친구들그룹 = new Group();

    gameOver = true;
    updateSprites(false);

    // 카메라위치 초기화
    camera.position.y = height/2;
}




function 게임플레이() {
    if (!gameOver) {
        캐릭터.velocity.y += 물리학.중력;

        // LIFE LINE: BOTTOM
        if (캐릭터.position.y < 0) { 캐릭터.position.y = 0; }
        if (캐릭터.position.y > height) { die(); }

        // 충돌감지
        if (캐릭터.overlap(파이프그룹)) { die(); }
        if (!isAllFriends) { draw_친구만남효과(캐릭터.position.x); }  // 모든 친구를 만나지 않았다면
        if (isAllFriends) {
            if (!isFinishSet) { // 아직 피니시의 위치가 설정되지 않았다면
                피니시.position.x = 캐릭터.position.x + width + 2000; // 피니시 obj 위치 변경
                isFinishSet = true;
            } else { // 이미 피니시의 위치를 설정했다면, 충돌 감지를 시작한다.
                if (캐릭터.overlap(피니시)) { 게임완료(); }
            }
        }

    

        // 맵에 새로운 요소 생성  
        draw_파이프생성();
        draw_친구이미지생성();
        draw_지나친요소제거();

        // 캐릭터위치 변경에 따른 카메라 시점 변경
        camera.position.x = 캐릭터.position.x + width / 4;
        
        //wrap 땅
        if (camera.position.x > 땅.position.x - 땅.width + width / 2) {
            console.log("Warp!");
            console.log("땅.position.x", 땅.position.x);
            console.log("땅.width", 땅.width);
            땅.position.x += 800;
        }
    


        // 카메라 설정
        camera.off();
        camera.on();

        drawSprites(파이프그룹);
        drawSprite(땅);
        drawSprite(캐릭터); // bird
        drawSprite(피니시);
        

    }
}



function 캐릭터Init() {
    console.log("캐릭터Init()", 클릭한캐릭터);
    캐릭터정보.크기 = { r: 40, w: 40, h: 40 };
    캐릭터정보.시작점 = { x: width / 2, y: height / 2 };
    
    캐릭터 = createSprite(
        캐릭터정보.시작점.x, 캐릭터정보.시작점.y,
        캐릭터정보.크기.r, 캐릭터정보.크기.r);

    캐릭터.rotateToDirection = true;
    캐릭터.velocity.x = VELOCITY_X;
    캐릭터.setCollider('circle', 0, 0, 20); // setCollider("circle", offsetX, offsetY, radius)  
}



function finishInit() {
    피니시정보.크기 = { w: 400, h: 400 };
    피니시정보.위치 = { x: 1000000, y: height / 2 };
    피니시 = createSprite(피니시정보.위치.x, 피니시정보.위치.y, 피니시정보.크기.w, 피니시정보.크기.h); 

    피니시.setCollider('circle', 0, 0, 200);
    피니시.addImage(피니시이미지);
}





function draw_친구이미지생성() {
    if (friendsDB.length > 0) {
        for (var di = 0; di < friendsDB.length; di++){
            image(friendsDB[di].img, friendsDB[di].x, friendsDB[di].y, friendsDB[di].w, friendsDB[di].h);
        }
    }

}




// 친구를 만났을 때 캐릭터가 보여줄 효과
function draw_친구만남효과(currentX) {
    
    if (currentX % (친구들간격-200) === 0) {
        setMeetState(friendIndex);
        if(GLOBAL_SOUND === true){ onSelectedSound(friendIndex); } 
        
        friendIndex++; // 친구인덱스 증가
        if (friendIndex >= friendIndexMax) { isAllFriends = true; } // 모든 친구들을 만났다. 
    }

    // 상단바의 만날친구들 아이콘 상태 변경
    function setMeetState(findex) {
        // 선택 -> 변경
        var topMeetIcons = selectAll('.meet-friend')[findex];
        var currentSrc = topMeetIcons.attribute('src');
        var setSrc = currentSrc.split('_')[0] + '_after.png';
        topMeetIcons.attribute('src', setSrc); // 현재 이미지 src를 선택하여 변경.
      
    }
    // 만난 친구의 음성 재생
    function onSelectedSound(findex) {
        friendsDB[findex].greet.play();
    }
}



function 선택캐릭터이미지추가() {
    console.log('클릭한 캐릭터 ', 클릭한캐릭터);
    // 캐릭터 초기 설정
    var 선택된캐릭터 = 'assets/images/characters/' + 클릭한캐릭터 + '.png';
    캐릭터정보.이미지 = loadImage(선택된캐릭터);
    캐릭터.addImage(캐릭터정보.이미지);
}




function draw_지나친요소제거() {
    // 지나친 파이프 제거하기
    for (var i = 0; i < 파이프그룹.length; i++) {
        if (파이프그룹[i].position.x < 캐릭터.position.x - width / 2) { 파이프그룹[i].remove(); }
    }
}

function draw_파이프생성() {
    var 파이프크기 = { w: 80, h: 392 }; // 392는 파이프 이미지의 높이
    // var 파이프크기 = { w: 80, h: 192 }; // 392는 파이프 이미지의 높이

    // 파이프그룹 생성하기
    if (frameCount % 60 == 0) {

        var 하단파이프범위 = { yMin: height - (파이프크기.h / 2), yMax: height + (파이프크기.h / 4) };
        var 하단파이프랜덤Y = random(하단파이프범위.yMin, 하단파이프범위.yMax);
        var 하단파이프위치 = { x: (캐릭터.position.x + width), y: 하단파이프랜덤Y };
        var 하단파이프 = createSprite(하단파이프위치.x, 하단파이프위치.y, 파이프크기.w, 파이프크기.h); // 전체화면 모드 edit

        하단파이프.addImage(파이프이미지);
        파이프그룹.add(하단파이프);

        // 상단 파이프
        // 상단 파이프는 하단 파이프가 일정 수준이상 높지 않을 경우에만 생성한다.
        if (하단파이프랜덤Y > height - (파이프크기.h / 2)) {
            var 상단파이프범위 = { yMin: -(파이프크기.h / 2), yMax: (파이프크기.h / 4) };
            var 상단파이프위치 = { x: (캐릭터.position.x + width), y: random(상단파이프범위.yMin, 상단파이프범위.yMax) };
            var 상단파이프 = createSprite(상단파이프위치.x, 상단파이프위치.y, 파이프크기.w, 파이프크기.h); // 전체화면 모드 edit

    
            상단파이프.mirrorY(-1);
            상단파이프.addImage(파이프이미지);
            파이프그룹.add(상단파이프);
        }
    }

}





function 게임완료() {
    noLoop();               // for test
    updateSprites(false);
    gameOver = true;
    다시하기버튼설정('complete');
}



function 새게임시작() {
    // 이전 스프라이트 제거
    파이프그룹.removeSprites();
    친구들그룹.removeSprites();

    gameOver = false;           // 게임오버 상태 변경
    updateSprites(true);        // 스프라이트 이미지 업데이트

    // 캐릭터 위치&속도 리셋  
    캐릭터.position.x = width / 2;
    캐릭터.position.y = height / 2;
    캐릭터.velocity.y = 0;
    
    loop();                     // 루프 시작
}


function 다시하기버튼설정(state) {
    // 홈 버튼 설정
    gotoHomeBtn = select('#gotoHomeBtn');
    gotoHomeBtn.show();
    gotoHomeBtn.mousePressed(홈버튼클릭);


    // 다시하기 버튼 설정    
    replayBtn = select('#replayBtn');
    replayBtn.mousePressed(다시하기버튼클릭);
    replayBtn.show();

    replayModal = select('.modal');
    replayModal.addClass('is-active');


    // 게임오버, 게임 완료 이미지 선택
    var gameoverImg = select('.gameover-img');
    var gamepassImg = select('.gamepass-img');
    
    // 게임오버, 게임 완료 이미지 설정
    if (state === 'die') {
        gameoverImg.show();
        gamepassImg.hide();
    } else {
        gamepassImg.show();
        gameoverImg.hide();
    }
}

function 홈버튼클릭() {
    모든요소리셋();
    window.location.reload();           // 새로고침
}

function 다시하기버튼클릭() {
    모든요소리셋();
    새게임시작();
    시작인사();
}


function 모든요소리셋() {
    replayBtn.hide();
    gotoHomeBtn.hide();
    replayModal.removeClass('is-active');
    만난친구들상태리셋();
    finishReset();
}


function finishReset() {
    isFinishSet = false;
    피니시.position.x = 100000;
}




function 만난친구들상태리셋() {
    friendIndex = 0; // 친구인덱스 리셋
    var allFriendsBtn = selectAll('.meet-friend');
    for (var alli = 0; alli < allFriendsBtn.length; alli++){
        var rowImgUrl = 'assets/images/ui/icon/' + friendsDB[alli].name_eng + '_before.png';
        var rowTopIcon = allFriendsBtn[alli];
        rowTopIcon.attribute('src', rowImgUrl);
    }
}





function 시작인사() {
    
    if (GLOBAL_MODE === 'GAME' && GLOBAL_SOUND === true) {
        switch (클릭한캐릭터) {
        case 'murphy': 효과.사운드.start.murphy.play(); break;
        case 'kitty': 효과.사운드.start.kitty.play(); break;
        case 'tulip': 효과.사운드.start.tulip.play(); break;
        case 'violet': 효과.사운드.start.violet.play(); break;
        case 'bubblegirl': 효과.사운드.start.bubblegirl.play(); break;
        default:
            console.log("클릭이벤트에 해당하는 hero가 없습니다", 클릭한캐릭터);
            효과.사운드.start.default.play();
            break;
        }
    }
}





// 게임 실행 중 클릭 시 발생하는 작업들
function gameClickEffect() {
    if (GLOBAL_MODE === 'GAME') {
        캐릭터.velocity.y = FLAP;
        if (GLOBAL_SOUND === true && gameOver === false) {
            // 점프 사운드
            switch (클릭한캐릭터) {
                case 'murphy': 효과.사운드.점프.murphy.play(); break;
                case 'kitty': 효과.사운드.점프.kitty.play(); break;
                case 'tulip': 효과.사운드.점프.tulip.play(); break;
                case 'violet': 효과.사운드.점프.violet.play(); break;
                case 'bubblegirl': 효과.사운드.점프.bubblegirl.play(); break;
                default:
                    console.log("클릭이벤트에 해당하는 hero가 없습니다", 클릭한캐릭터);
                    효과.사운드.점프.default.play();
                    break;
            }
            
        }
        
        
    }
    
}



function die() {
    noLoop();             
    updateSprites(false);
    gameOver = true;

    if (GLOBAL_MODE === 'GAME' && GLOBAL_SOUND === true) {
        switch (클릭한캐릭터) {
        case 'murphy': 효과.사운드.die.murphy.play(); break;
        case 'kitty': 효과.사운드.die.kitty.play(); break;
        case 'tulip': 효과.사운드.die.tulip.play(); break;
        case 'violet': 효과.사운드.die.violet.play(); break;
        case 'bubblegirl': 효과.사운드.die.bubblegirl.play(); break;
        default:
            console.log("클릭이벤트에 해당하는 hero가 없습니다", 클릭한캐릭터);
            효과.사운드.die.default.play();
            break;
        }
        
    }
    다시하기버튼설정('die');
}




