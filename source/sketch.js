var canvas_main, canvas_select, canvas_game, canvas_result;

var 친구들테스트 = 0;


function setup() {
    pixelDensity(1); // or 3
    console.log("setup() start.");

    canvas_select = createCanvas(browserSize.w, browserSize.h-topBarHeight);
    canvas_select.parent("#select");
    
    gameSetup(); // 게임 초기 설정

    // setTimeout(function () {  효과.사운드.bgm.default.play(); // BGM 재생 }, 2000);
}


function draw() {
    image(배경이미지, (캐릭터.position.x - width / 4) - 10, 0, browserSize.w, browserSize.h - topBarHeight);
    
    if (GLOBAL_MODE === 'GAME') {
        게임플레이();
    }
}


function mousePressed() {
    
    if (GLOBAL_MODE === 'SELECT'
        && SELECT_COMPLETE === true) {
        viewControl(); // SELECT TO LOADING

        // LOADING 
        setTimeout(function () {
            viewControl(); // LOADING TO GAME
        }, loadingTime);
    } else if (GLOBAL_MODE === 'GAME') {
        gameClickEffect();
    }
}


function viewControl() {
    switch (GLOBAL_MODE) {
        case 'MAIN':
            console.log("MAIN -> SELECT");
            GLOBAL_MODE = 'SELECT';

            VIEWS.main.hide();
            VIEWS.select.show();
            selectInit();
            
            break;
        case 'LOADING':
            console.log("LOADING -> GAME");
            VIEWS.loading.hide();
            VIEWS.game.show();
            GLOBAL_MODE = 'GAME';
            새게임시작();
            시작인사();
            break;
        default:
            console.log("viewControl default!");
            break;
    }
}
