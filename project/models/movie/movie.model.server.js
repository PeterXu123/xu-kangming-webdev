var mongoose = require('mongoose');

var movieSchema = require('./movie.schema.server');
// mongoose.createConnection('mongodb://127.0.0.1:27017/webdev_summer1_2017');
var movieModel = mongoose.model('ProjectMovieModel', movieSchema);/**
 * Created by xukan on 6/22/2017.
 */


movieModel.addComment = addComment;
movieModel.findMovieById = findMovieById;
movieModel.addLike = addLike;
















module.exports = movieModel;

function findMovieById(movieId) {
    return movieModel
        .findOne({imdbid: movieId});
}

function addComment(comment, imdbId) {
    return movieModel
        .findOneAndUpdate({imdbid: imdbId},
            {$push: {comment: comment}},
            {safe: true, upsert: true},
        function(err) {
        if(err) {
            console.log(err);
        }
        else {

        }


        });

}
function addLike(username, imdbId) {
    return movieModel
        .findOneAndUpdate({imdbid: imdbId},
            {$push: {like: username}},
            {safe: true, upsert: true},
        function(err) {
        if (err) {
            console.log(err);
        }
        else {

        }
        })
}
