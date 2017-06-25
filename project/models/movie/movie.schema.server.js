
    var mongoose = require('mongoose');
    // mongoose.connect('mongodb://127.0.0.1:27017/webdev_summer1_2017');


    var movieSchema = mongoose.Schema({
        imdbid: String,
        movieTitle: String,




        comment: [{username: String, content: String}],
        like: [String]


    }, {collection: "projectmovie"});

    module.exports = movieSchema;
