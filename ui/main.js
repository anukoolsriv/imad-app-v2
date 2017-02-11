console.log('Loaded!');

//change in main.js file

//move image
var img = document.getElementById('madi');
marginl = 0;
function right()
{
    marginl = marginl+2;
    img.style.marginLeft = marginl+'px';
}
img.onclick = function(){
    var interval = setInterval(right,50);
};