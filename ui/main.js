console.log('Loaded!');

// change in main.js file

var element = document.getElementById('main-text');

// text changed
element.innerHTML = 'this is the changed text';

//move image
var img = document.getElementById('madi');
marginl = 0;
function right()
{
    margingl = marginl+10;
    img.style.marginLeft = marginLeft+'px';
}
img.onclick = function(){
    var int = setInterval(right,100);
};