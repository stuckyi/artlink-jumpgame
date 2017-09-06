$(function () {

    var ids = '';
    var $characterItems = $('.character');
    $characterItems.on('click', function () {
        ids = this.id;
        console.log(ids);

    });

    
});