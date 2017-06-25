/**
 * Created by xukan on 6/11/2017.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/webdev_summer1_2017');
var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.ObjectId, ref: "ProjectWebsiteModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now},
    dateUpdated: {type: Date, default: Date.now},
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetMode"}]
}, {collection: 'projectpage'});
module.exports = pageSchema