console.log('Loaded!');

// change in main.js file

var element = document.getElementById('main-text');

// text changed
element.innerHTML = 'this is the changed text';

//move image
var img = document.getElementById('madi');
img.onclick = function(){
    img.style.marginLeft='100px';
};