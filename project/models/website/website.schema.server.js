/**
 * Created by xukan on 6/11/2017.
 */
var mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/webdev_summer1_2017');
var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "ProjectUserModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now},
    dateUpdated: {type: Date, default: Date.now},
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectPageModel"}],

}, {collection: 'projectwebsite'});
module.exports = websiteSchema