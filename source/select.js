
var selectBtn = {};
var selectedHero = {};
var selectModal;
var hole;

var 클릭한캐릭터 = ''; // 한번 클릭
var 선택된캐릭터 = ''; // 최종

var 캐릭터선택여부 = false;


function selectHero(heroName) {

    if (클릭한캐릭터 === heroName) {
        캐릭터선택여부 = true;
        선택완료효과(heroName);
        return;
    }
    switch (heroName) {
        case 'murphy':
            클릭한캐릭터 = 'murphy';    
            selectBtn.murphy.addClass('grow');
            selectBtn.kitty.removeClass('grow');
            selectBtn.tulip.removeClass('grow');
            selectBtn.violet.removeClass('grow');
            selectBtn.bubblegirl.removeClass('grow');
            break;
        case 'kitty':
            클릭한캐릭터 = 'kitty';    
            selectBtn.kitty.addClass('grow');
            selectBtn.murphy.removeClass('grow');
            selectBtn.tulip.removeClass('grow');
            selectBtn.violet.removeClass('grow');
            selectBtn.bubblegirl.removeClass('grow');
            break;
        case 'tulip':
            클릭한캐릭터 = 'tulip';    
            selectBtn.tulip.addClass('grow');
            selectBtn.murphy.removeClass('grow');
            selectBtn.kitty.removeClass('grow');
            selectBtn.violet.removeClass('grow');
            selectBtn.bubblegirl.removeClass('grow');
            break;
        case 'violet':
            클릭한캐릭터 = 'violet';    
            selectBtn.violet.addClass('grow');
            selectBtn.murphy.removeClass('grow');
            selectBtn.kitty.removeClass('grow');
            selectBtn.tulip.removeClass('grow');
            selectBtn.bubblegirl.removeClass('grow');
            break;
        case 'bubblegirl':
            클릭한캐릭터 = 'bubblegirl';    
            selectBtn.bubblegirl.addClass('grow');
            selectBtn.murphy.removeClass('grow');
            selectBtn.kitty.removeClass('grow');
            selectBtn.tulip.removeClass('grow');
            selectBtn.violet.removeClass('grow');
            break;
        default:
            console.log("선택에 매칭되는 hero가 없습니다.");
            break;
    }
}

function selectInit() {
    console.log("selectInit!");
    selectBtn.murphy = select("#select-murphy");
    selectBtn.kitty = select("#select-kitty");
    selectBtn.tulip = select("#select-tulip");
    selectBtn.violet = select("#select-violet");
    selectBtn.bubblegirl = select("#select-bubblegirl");
    
    // hero img
    selectedHero.murphy = select("#img-murphy");
    selectedHero.kitty = select("#img-kitty");
    selectedHero.tulip = select("#img-tulip");
    selectedHero.violet = select("#img-violet");
    selectedHero.bubblegirl = select("#img-bubblegirl");
    
    // select page modal bg
    selectModal = select('.select-modal'); 

    // hole select element.
    hole = select("#hole");

}

function 선택완료효과(selectedName) {
    switch (selectedName) {
        case 'murphy':
            SELECT_COMPLETE = true;
            selectedHero.murphy.removeClass('rotate15');
            selectedHero.murphy.addClass('move-to-right');
            화면전환_선택to게임();
            break;
        case 'kitty':
            SELECT_COMPLETE = true;
            selectedHero.kitty.removeClass('rotate15');
            selectedHero.kitty.addClass('move-to-right');
            화면전환_선택to게임();
            break;
        case 'tulip':
            SELECT_COMPLETE = true;
            selectedHero.tulip.removeClass('rotate15');
            selectedHero.tulip.addClass('move-to-right');
            화면전환_선택to게임();
            break;
        case 'violet':
            SELECT_COMPLETE = true;
            selectedHero.violet.removeClass('rotate15');
            selectedHero.violet.addClass('move-to-right');
            화면전환_선택to게임();
            break;
        case 'bubblegirl':
            SELECT_COMPLETE = true;
            selectedHero.bubblegirl.removeClass('rotate15');
            selectedHero.bubblegirl.addClass('move-to-right');
            화면전환_선택to게임();
            break;
        default:
            console.log("선택에 매칭되는 selectedHero가 없습니다.");
            break;
    }
    
}

function 화면전환_선택to게임() {
    setTimeout(function () {
        selectModal.show();
        setTimeout(function () {
            GLOBAL_MODE = 'LOADING';
            VIEWS.select.hide();
            VIEWS.loading.show();
            setTimeout(function () {
                viewControl(); // LOADING TO GAME
            }, loadingTime);
        }, 2000);
    }, 2000);
}

