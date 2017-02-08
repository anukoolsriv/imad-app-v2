var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var song1 = {
    title: 'Song-one',
    heading: 'Song-one',
    date: '8/2/2017',
    content: `  <p> 
                    When my time comes
                    Forget the wrong that I've done
                    Help me leave behind some
                    Reasons to be missed
                    Dont resent me
                    And when you're feeling empty
                    Keep me in your memory
                    Leave out all the rest
                </p>`
};

function createtemplate(data){
    var title=data.title;
    var date=data.date;
    var heading = data.heading;
    var content = data.content;
    
var htmltemplate=`<html>
    <head>
        <title>
           ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
                
            </div>
            <hr/>
            <h3>${heading} </h3>
            <hr/>
            <div> ${date}</div>
            <h5>
                "Leave out all the rest"
            </h5>
            <div>
                ${content}
            </div>
        </div>
    </body>
</html>
`;  
return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/song-one',function(req,res){
   res.send(createtemplate(song1))
});

app.get('/song-two',function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'song-two.html'));
});

app.get('/song-three',function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'song-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
