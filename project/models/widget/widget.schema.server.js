/**
 * Created by xukan on 6/11/2017.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/webdev_summer1_2017');
var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.ObjectId, ref: "ProjectPageModel"},
    widgetType: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now},
    dateUpdated: {type: Date, default: Date.now}

}, {collection: 'projectwidget'});
module.exports = widgetSchema;