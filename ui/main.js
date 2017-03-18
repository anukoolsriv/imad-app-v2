//submit username/password
var submit = document.getElementById('submit_btn');
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
                console.log('user logged in');
                alert('logged in successfully');
            } else if (request.status === 403){
                alert('password is incorrect');
            } else if(request.status === 500){
                alert('Boom! Something went terribly wrong!');
            }
        }
    };
  // make a request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));
};