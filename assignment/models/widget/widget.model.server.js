 /**
 * Created by xukan on 6/11/2017.
 */

var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var pageModel = require('../page/page.model.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
module.exports = widgetModel;

function createWidget(widget, pageId) {
        widget._page = pageId;

    return widgetModel.create(widget)
        .then(function(widget) {
            console.log("hello widget");
            console.log(widget._page);
            console.log(widget._id);
            pageModel.addWidget(pageId, widget._id);
            return widget;

        },
        function(err) {
            console.log(err);
        });
}


function findAllWidgetsForPage(pageId) {
    // console.log(pageId);
    // return widgetModel.find({_page: pageId})
    //     .populate('_page')
    //     .exec();
    return pageModel
        .findPageById(pageId)
        .then(function(page) {
            var widgetsId = page.widgets;
            return widgetModel.find({_id: {$in: widgetsId}}).exec(function (err, docs) {
                docs.sort(function (a,b) {
                    return widgetsId.indexOf(a._id) - widgetsId.indexOf(b._id);
                });
            })
        })
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    delete widget._page;
    delete widget.dateCreated;
    widget.dateUpdated = Date.now();
    console.log("ddddddddddd");

    return widgetModel.update({_id: widgetId}, {$set: widget});

}
function deleteWidget(pageId, widgetId) {
    return widgetModel.remove({_id: widgetId})
        .then(function(status) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        })
}

function reorderWidget(pageId, start, end) {
    return pageModel    .reorderWidget(pageId, start, end);
    // Array.prototype.move = function (old_index, new_index) {
    //     if (new_index >= this.length) {
    //         var k = new_index - this.length;
    //         while ((k--) + 1) {
    //             this.push(undefined);
    //         }
    //     }
    //     this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    //
    // };
//     var array = null;
//   widgetModel.find({_page: pageId})
//       .then(function (data) {
//           array = data;
//       });
//   var allWidget = null;
//   widgetModel.find()
//       .then(function (all) {
//           allWidget = all;
//       })
//   var beingmoved = array[start];
//   var elementbefore = array[end];
//   var movedtoindex = allWidget.indexOf(elementbefore);
//   var deleteindex = allWidget.indexOf(beingmoved);
// widgetModel.update({}, {$unset : {}} )
//     return pageModel.findPageById(pageId)
//         .then(function(page) {
//             var array = page.widgets;
//             var firstelement = array[start];
//
//             var lastelement = array[end];
//             widgetModel.findWidgetById(first)
//                 .then(function(value) {
//
//
//
//             widgetModel.remove({_id: firstelement})
//                 .then(function(object) {
//                     widgetModel.p
//                 })
//                 })
//
//
//                 })




}


