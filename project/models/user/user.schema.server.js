
    var mongoose = require('mongoose');
    // mongoose.connect('mongodb://127.0.0.1:27017/webdev_summer1_2017');


    var userSchema = mongoose.Schema({
        username: {type: String, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        roles: [{
            type: String, default: 'USER', enum: ['USER', 'ADMIN']
        }],
        google: {
            id:    String,
            token: String
        },
        like: [{imdbId: String, movieName: String}],
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectWebsiteModel"}],

        dateCreated: {type: Date, default: Date.now},
        followings: [{username: String, _id: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"}}],
        followers:  [{username: String, _id: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"}}]

    }, {collection: "projectuser"});

    module.exports = userSchema;
