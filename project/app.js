
    // var app = require('../../../express');
    // if (process.env.MLAB_USERNAME) {
    //     connectionString = process.env.MLAB_USERNAME + ":" +
    //         process.env.MLAB_PASSWORD + "@" +
    //         process.env.MLAB_HOST + ':' +
    //         process.env.MLAB_PORT + '/' +
    //         process.env.MLAB_APP_NAME;
    // }
    //
    //  var mongoose = require('mongoose');
    //
    //
    // // mongoose.connect(connectionString);
    // mongoose.Promise = require('q').Promise;


    require('./services/user.service.server');
    require('./services/website.service.server');
    require('./services/page.service.server');

    require('./services/widget.service.server');
    require('./services/movie.service.server')


// app.get('/websites', sayHello);
// function sayHello(req, res) {
//     alert("fdf");
//     res.send('hello');
//
//
// }