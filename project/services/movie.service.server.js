const app = require('../../express');
var movieModel = require('../models/movie/movie.model.server');


app.post("/api/project/movie/comment", findCommentForMovie);
app.post("/api/project/movie/addComment/:movieId", addCommentToMovie);
app.post("/api/project/movie/addLike/:movieId", addLikeToMovie);




function addCommentToMovie(req, res) {
    var movieId = req.params['movieId'];
    var username = req.body.username;
    var content = req.body.content;
    var comment = {username, content};
    movieModel
        .addComment(comment, movieId);
    res.sendStatus(200);

}

function addLikeToMovie(req, res) {
    var movieId = req.params['movieId'];
    var username = req.body.username;



    movieModel
        .addLike(username, movieId);

    res.sendStatus(200);

}









function findCommentForMovie(req, res) {
    console.log("hey hey hey")

    var title = req.body.title;
    var movieId = req.body.movieId;
    console.log(movieId);
    console.log(title);
    movieModel
        .findMovieById(movieId)
        .then(function(movie) {
            if(!movie) {
                movieModel.create({imdbid: movieId,
                movieTitle: title,
                    comment: [],
                    like: []
                })
                    .then(function(response) {
                        res.send(response);
                    })
            }
            else {
                res.send(movie);
            }

        })
}




