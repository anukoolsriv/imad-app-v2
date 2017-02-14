// Buttton code

var button = document.getElementById('counter');
button.onclick = function(){
  // create a request
  var request = new XMLHttpRequest();
  
  //capture the response and store in a variable
  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE){
        // take some action
        if(request.status ===200){
            var counter = request.responseText;
            var span = document.getElementById('cnt');
            span.innerHTML = counter.toString();
        }
    }
  };
  
  // make a request
  request.open('GET','http://anukoolsriv.imad.hasura-app.io/counter',true);
  request.send(null);
};

//submit name
var submit = document.getElementById('submitbtn');
submit.onclick = function(){
    //make a request
    // create a request
  var request = new XMLHttpRequest();
  //capture the response and store in a variable
  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE){
        // take some action
        if(request.status ===200){
            //capture list
    var names = request.responseText;
    names = JSON.parse(names);
    var list='';
    
    for(var i=0;i<names.length;i++)
    {
        list+='<li>'+names[i]+'</li>';
    }
    var ul = document.getElementById('nameslist');
    ul.innerHTML=list;
        }
    }
  };
  // make a request
    var nameIP = document.getElementById('name');
    var name = nameIP.value;

  request.open('GET','http://anukoolsriv.imad.hasura-app.io/submit-name?name='+name,true);
  request.send(null);
};