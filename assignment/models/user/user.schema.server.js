var mongoose = require('mongoose');



var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    roles: [{type:String, default:'USER', enum:['USER','ADMIN']
    }],
    facebook: {
        id:    String,
        token: String
    },
    email: String,
    phone: String,
     websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now}

}, {collection: "user"});

// mongoose.connect('mongodb://127.0.0.1:27017/webdev_summer1_2017');
module.exports = userSchema;