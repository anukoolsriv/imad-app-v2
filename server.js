var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var songs={
    'song-one' : {
        title: 'Song-one',
        heading: 'Song-one',
        date: '8/2/2017',
        name: '"Leave out all the rest"',
        data:'song-two',
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
    },
    'song-two' : {
        title: 'Song-two',
        heading: 'Song-two',
        date: '8/2/2017',
        name: '"New Divide"',
        data:'song-three',
        content: `  <p> 
                        I remembered black skies
                        The lightning all around me
                        I remembered each flash
                        As time began to blur
                        Like a strtling sign
                        The fate had finally found me
                        And my voice was all i heard
                        That i get what i deserved
                    </p>`
    },
    'song-three' : {
        title: 'Song-three',
        heading: 'Song-three',
        date: '8/2/2017',
        name:'"Skyfall"',
        data: '',
        content: `  <p> 
                        This is the end
                        Hold your breath and count to ten
                        Feel the earth move and then
                        Hear my heart burst again
                        For this is the end
                        Ive drowned and dreamt this moment
                        So overdue I owe them
                        Swept away, Im stolen
                    </p>`
    }
};
function createtemplate(data){
    var title=data.title;
    var date=data.date;
    var heading = data.heading;
    var content = data.content;
    var name = data.name;
    var song = data.song;
    
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
                <a href="/${song}">Next Song</a>
            </div>
            <h3>${heading} </h3>
            <hr/>
            <div> ${date}</div>
            <h5>
                ${name}
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

app.get('/:songname',function(req,res){
    //songname = song-one
    //songs[songname] == {} content object for song-one
    var songname = req.params.songname;
   res.send(createtemplate(songs[songname]));
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
