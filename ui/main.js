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
    marginl = marginl+10;
    img.style.marginLeft = marginl+'px';
}
img.onclick = function(){
    var interval = setInterval(right,10);
};