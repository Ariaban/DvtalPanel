
$(document).ready(function(){
    $("#btnToggleTop").click(function(){
        $("#panelToggle").slideToggle("fast");
    });
    $('ul#gridComponent > li.row').keynavigator({
        activeClass: 'select',
        keys: {
            13: function($el, cellIndex, e) {    
              console.log('pressed "enter"', arguments);
            }
          }
    });
    $('input[type="checkbox"].checkBoxDetect').on('change', function() {
        $(this).closest('div.checkAndTag').find('.gridInputTagPlace').toggle(this.checked);
//            $('#gridComponent').blur();
        $(this).closest('div.checkAndTag .gridInputTagPlace').find('input[type="text"].gridInputTag').focus();

    });
 });


function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("src", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    var src = document.getElementById(ev.dataTransfer.getData("src"));
    var srcParent = src.parentNode;
    var tgt = ev.currentTarget.firstElementChild;

    ev.currentTarget.replaceChild(src, tgt);
    srcParent.appendChild(tgt);
}    

