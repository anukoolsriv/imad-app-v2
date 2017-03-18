var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config  = {
    user: 'anukoolsriv',
    database: 'anukoolsriv',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

function createtemplate(data){
    var title=data.title;
    var date=data.date;
    var heading = data.heading;
    var content = data.content;
    var name = data.name;
    var back = data.back;
    var forward = data.forward;
    
    var htmltemplate=
    `<html>
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
                    <a href="/songs/${back}">Previous</a>
                    <a href="/songs/${forward}" style="float:right">Next</a>
                </div>
                <h3>${heading} </h3>
                <hr/>
                <div>${date.toDateString() }</div>
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

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'ui','index.html'));
});

function hash(input, salt){
    // how to create hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2', "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res){
   var hashedString = hash(req.params.input, 'this-is-some-string'); // 'this-is-some-random-string' is a salt value
   res.send(hashedString);
});

app.post('/create-user',function(req,res){
   //username,password
   //{'"username": "anukoolsriv","password":"password"'}
   //JSON request
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)',[username, dbString], function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
           res.send('User successfully created: '+ username);
       }
   });
});

app.post('/login',function(req, res){
   var username = req.body.username;
   var password = req.body.password;
   console.log("1234");
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function(err, result){
       if(err){
           res.status(500).send(err.toString());
       }
       else
       {
           if(result.rows.length === 0)
           {
               res.send(403).send('username/password is invalid');
           }
           else
           {    // Password Matching
               var dbString = result.rows[0].password;
               var salt = dbString.split('$')[2];
               var  hashedPassword = hash(password, salt); // creatting hash based on password submitted and original password
               
               if(hashedPassword === dbString){
                        // set session
                        //    req.session.auth = {userId: result.row[0].id};
                            // set cookie with session id
                            // internally, on server side, it maps the session id to an object
                            //{auth: {userID}}
                        res.send('Credentials are correct');
               }
               else{
                   res.send(403).send('username/password is invalid');
               }
           }
       }    
   });
});

/*app.get('/check-login', function(req, res){
   if(req.session && req.session.auth && req.session.auth.userId){
       res.send('You are successfully logged in:' + req.session.auth.userId.toString());
   } else {
       res.send('You are not logged in');
   }
});
*/
var pool = new Pool(config);

app.get('/test-db',function(req,res){
   //make a request
   // return a response
    pool.query('SELECT * FROM TEST',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
           res.send(JSON.stringify(result.rows));
       }
    });
});


var counter=0;

app.get('/counter',function(req,res){
    counter = counter+1;
    res.send(counter.toString());
}); 
var namelist=[];

app.get('/submit-name',function(req,res){
   /// get the name from request
   var name = req.query.name;
  namelist.push(name);
   
   //JSON : Javascript Object Notation
   res.send(JSON.stringify(namelist));
});

app.get('/songs/:songname',function(req,res){
    //songname = song-one
    //songs[songname] == {} content object for song-one
    pool.query("select * from song where title = $1",[req.params.songname],function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }    
    else{
        if(result.rows.length === 0)
        {
            res.status(404).send('Song not found');
        }
        else{
            var SongData = result.rows[0];
            res.send(createtemplate(SongData));
        }
    }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/1a.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '1a.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
