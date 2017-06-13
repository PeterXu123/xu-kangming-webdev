/**
 * Created by xukan on 6/11/2017.
 */
var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now},
    dateUpdated: {type: Date, default: Date.now},
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: "PageModel"}],

}, {collection: 'website'});
module.exports = websiteSchema