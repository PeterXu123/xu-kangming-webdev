/**
 * Created by xukan on 6/11/2017.
 */
var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.ObjectId, ref: "WebsiteModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now},
    dateUpdated: {type: Date, default: Date.now},
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}]
}, {collection: 'page'});
module.exports = pageSchema