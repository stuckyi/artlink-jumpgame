var replayBg; // 죽었을 때 나타나는 까만 반투명 배경
var replayBtn; // 다시 시작하기 버튼
var replayModal; // 죽었을 때 보게되는 모달창
var topBarHeight = 60; // 상단 바 높이

var soundOffBtn, soundOnBtn;


// 게임 옵션
var gameOver;
var selectedCharacter = 'kitty'; //default character.
var friendIndex = 0; // 친구들 인덱스
var isAllFriends = false; // 모든 친구들을 다 만났는지





function gameSetup() {
    console.log('gameSetup()');

    console.log(browserSize.h - topBarHeight);

    CANVAS.game = createCanvas(browserSize.w, browserSize.h - topBarHeight);
    CANVAS.game.position(0, topBarHeight);
    CANVAS.game.parent(VIEWS.game);
    점수.현재 = 0; // point = 0;
    캐릭터초기설정();
    
    파이프그룹 = new Group();
    친구들그룹 = new Group();

    gameOver = true;
    updateSprites(false);

        

    // 카메라위치 초기화
    camera.position.y = height/2;
    // soundOption(); //사운드 켜기
}


function draw_친구이미지생성() {
    image(거베라이미지, 친구들정보.거베라.x, 친구들정보.거베라.y, 친구들크기.w, 친구들크기.h);
    image(거베라2이미지, 친구들정보.거베라2.x, 친구들정보.거베라2.y, 친구들크기.w, 친구들크기.h);
    image(거베라3이미지, 친구들정보.거베라3.x, 친구들정보.거베라3.y, 친구들크기.w, 친구들크기.h);
    image(거베라4이미지, 친구들정보.거베라4.x, 친구들정보.거베라4.y, 친구들크기.w, 친구들크기.h);
    image(거베라5이미지, 친구들정보.거베라5.x, 친구들정보.거베라5.y, 친구들크기.w, 친구들크기.h);
    image(거베라6이미지, 친구들정보.거베라6.x, 친구들정보.거베라6.y, 친구들크기.w, 친구들크기.h);
    image(거베라7이미지, 친구들정보.거베라7.x, 친구들정보.거베라7.y, 친구들크기.w, 친구들크기.h);
    image(거베라8이미지, 친구들정보.거베라8.x, 친구들정보.거베라8.y, 친구들크기.w, 친구들크기.h);
    image(거베라8이미지, 친구들정보.거베라9.x, 친구들정보.거베라9.y, 친구들크기.w, 친구들크기.h);
}




// 친구를 만났을 때 캐릭터가 보여줄 효과
function draw_친구만남효과(currentX) {
    
    if (currentX % 2000 === 0) {
        console.log("캐릭터를 만난 지점!");
        setMeetState(friendIndex);
        friendIndex++; // 친구인덱스 증가
        if (friendIndex >= 5) {
            isAllFriends = true;  // 모든 친구들을 만났다. }
        }

        // 상단바의 만날친구들 아이콘 상태 변경
        function setMeetState(findex) {
            // 선택 -> 변경
            var topMeetIcons = $('.meet-friend').eq(findex); // 현재 만난 친구인덱스
            var currentSrc = topMeetIcons.attr('src');
            var setSrc = currentSrc.split('_')[0] + '_after.png'; // 만난 후 보여져야할 이미지 src.
            topMeetIcons.attr('src', setSrc); // 현재 이미지 src를 선택하여 변경.
        }

    }
}









function 캐릭터초기설정() {
    // 캐릭터 초기 설정
    var 선택된캐릭터 = 'assets/images/characters/' + selectedCharacter + '.png';

    캐릭터정보.크기 = { r: 40, w: 40, h: 40 };
    캐릭터정보.시작점 = { x: width / 2, y: height / 2 };
    캐릭터정보.이미지 = loadImage(선택된캐릭터);


    캐릭터 = createSprite(
        캐릭터정보.시작점.x, 캐릭터정보.시작점.y,
        캐릭터정보.크기.r, 캐릭터정보.크기.r);

    캐릭터.rotateToDirection = true;
    캐릭터.velocity.x = VELOCITY_X;
    캐릭터.setCollider('circle', 0, 0, 20); // setCollider("circle", offsetX, offsetY, radius)  
    캐릭터.addImage(캐릭터정보.이미지);
}


function draw_finish생성() {
    피니시정보.크기 = { w: 100, h: 400 };
    피니시정보.위치 = { x: 캐릭터.position.x + width, y: height / 2 };
    피니시 = createSprite(피니시정보.위치.x, 피니시정보.위치.y, 피니시정보.크기.w, 피니시정보.크기.h); 
    피니시.setCollider('circle', 0, 0, 50);
    피니시.add(피니시이미지);
}




function 게임플레이() {
    if (gameOver && keyWentDown('x')) { 새게임시작(); }

    if (!gameOver) {
    
        if (keyWentDown('x')) { 캐릭터.velocity.y = FLAP; }
        캐릭터.velocity.y += 물리학.중력;

        // LIFE LINE: BOTTOM
        if (캐릭터.position.y < 0) { 캐릭터.position.y = 0; }
        if (캐릭터.position.y > height) { die(); }

        // 충돌감지
        if (캐릭터.overlap(파이프그룹)) { die(); }
        if (isAllFriends === false) { draw_친구만남효과(캐릭터.position.x); }  // 모든 친구를 만나지 않았다면

    

        // 맵에 새로운 요소 생성  
        draw_파이프생성();
        draw_친구이미지생성();
        draw_지나친요소제거();

        // 캐릭터위치 변경에 따른 카메라 시점 변경
        camera.position.x = 캐릭터.position.x + width / 4;

        // 카메라 설정
        camera.off();
        camera.on();

        drawSprites(파이프그룹);
        drawSprite(캐릭터); // bird
        drawSprite(피니시);
        

    }
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



function draw_친구들생성() {
    // console.log("친구들 생성!", frameCount);
    if (frameCount % 60 == 0) {
        console.log("친구들 생성!");
        var 친구 = createSprite(캐릭터.position.x + width, height / 2, 40, 40);
        친구.addImage(쵸파이미지);
        친구들그룹.add(친구);

        // 생성한 친구 요소와 캐릭터의 충돌을 개별 감지하기위한 테스트 170912  
        hit = collideCircleCircle(
            캐릭터.position.x, 캐릭터.position.y, 40,
            캐릭터.position.x + width, height / 2, 40);
    }
}
function die() {
    noLoop();               // for test

    점수.최근 = 점수.현재;      // 점수 저장
    점수.현재 = 0;            // 현재 점수 초기화

    updateSprites(false);
    gameOver = true;


    if (isSound === true) { 효과.사운드.die.play(); }
    다시하기버튼설정();
}


function 새게임시작() {
    // 이전 스프라이트 제거
    파이프그룹.removeSprites();
    친구들그룹.removeSprites();

    // 게임오버 상태 변경
    gameOver = false;

    // 스프라이트 이미지 업데이트
    updateSprites(true);

    // 캐릭터 위치&속도 리셋  
    캐릭터.position.x = width / 2;
    캐릭터.position.y = height / 2;
    캐릭터.velocity.y = 0;

    // 루프 시작
    loop();
}



// 게임 실행 중 클릭 시 발생하는 작업들
function gameClickEffect() {
    캐릭터.velocity.y = FLAP;
    점수.현재++;                // 점프 할 때마다 기본 점수 추가
    if(isSound){ 효과.사운드.점프.play(); } // 점프 할 때마다 실행할 사운드 효과
    
}



function 사운드버튼설정() {
    soundOnBtn = select("#soundOnBtn");
    // soundOnBtn.mousePressed(사운드on);

    soundOffBtn = select("#soundOffBtn");
    // soundOnBtn.mousePressed(사운드off);
}


function setSound(state) {
    if (state === 'on') { isSound = true; }
    else { isSound = false; }
}

function 사운드on() {
    console.log("사운드on!!");
    isSound = true;
}

function 사운드off() {
    isSound = false;
}




function 다시하기버튼설정() {
    replayBtn = select('#replayBtn');
    replayBtn.mousePressed(다시하기버튼클릭);
    replayBtn.show();

    replayModal = select('.modal');
    replayModal.addClass('is-active');

}


function 다시하기버튼클릭() {
    새게임시작();
    replayBtn.hide();
    replayModal.removeClass('is-active');
    만난친구들상태리셋();

}


function 만난친구들상태리셋() {
    console.log('만난친구들상태리셋');
    friendIndex = 0; // 친구인덱스 리셋

    $('.meet-friend').each(function () {
        var icon = $(this);
        var currentSrc = icon.attr('src');
        var resetSrc = currentSrc.split('_')[0] + '_before.png'; // 만난 후 보여져야할 이미지 src.
        icon.attr('src', resetSrc); // 현재 이미지 src를 선택하여 변경. 
    });
}


