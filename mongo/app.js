/**
 * Created by xukan on 6/10/2017.
 */


// var mongoose = require('mongoose');
// var util = require('util');
// mongoose.connect('mongodb://localhost/webdev_summer1_2017');
// mongoose.Promise = require('q').Promise;
// var blogPostSchema = mongoose.Schema({
//     title: String,
//     body: String,
//     postDate: Date,
//     thumbsUp: {type: Number, default:0 }
// }, {collection: 'blogpost'});
//
// var blogModel = mongoose.model("BlogPost", blogPostSchema);
// findAllBlogPosts()
//     .then(function(posts) {
//         console.log(JSON.stringify(posts));
//     })
// createBlogPost({
//     thumbsUp: 1700
// })
//     .then(function (doc) {
//             console.log(JSON.parse(doc));
//
//         },
//         function(err) {
//             console.log(err);
//         }
//     )
//
// function findAllBlogPosts() {
//     return blogModel.find();
// }
//
// function createBlogPost(blogPost) {
//    return blogModel
//        .create(blogPost);
//
//
// }
//
