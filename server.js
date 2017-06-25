var app = require('./express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');




app.use(cookieParser());
app.use(session({ secret: "put some text here" }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/api/whatever/session', function(req, res) {
    res.send(req.session)
})
app.get('/api/whatever/session/:name/:value', function(req, res) {
    var name = req.params.name;
    var value = req.params.value;
    var obj = {name: value};
    req.session[name] = obj;

    console.log(req.session);
    res.send(req.session);
})

require('./utilities/filelist');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

require ("./test/app.js")(app);


// require ('./assignment/app');
require ('./project/app');
// require ('./public/project/assignment/app.js');


  //require('public/assignment/directives/app.js')



var port = process.env.PORT || 3000;

app.listen(port);
