console.log('Loaded!');

// change in main.js file

var element = document.getElementById('main-text');

// text changed
element.innerHTML = 'this is the changed text';

//move image
var i = document.getElementById('i1');
i.onclick = function(){
    i.style.marginLeft='100px';
};