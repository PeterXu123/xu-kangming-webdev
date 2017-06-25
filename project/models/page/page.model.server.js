/**
 * Created by xukan on 6/11/2017.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/webdev_summer1_2017');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('ProjectPageModel', pageSchema);
var websiteModel = require('../website/website.model.server');
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.reorderWidget = reorderWidget;
module.exports = pageModel;

function createPage(page) {
    return pageModel.create(page)
        .then(function(page) {
            websiteModel.addPage(page._website, page._id);
            return page;
        })
}


function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId})
        .populate('_website')
        .exec();
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    delete page._website;
    delete page.dateCreated;
    page.dateUpdated = Date.now();

    return pageModel.update({_id: pageId}, {$set: page});

}
function deletePage(websiteId, pageId) {
    return pageModel.remove({_id: pageId})
        .then(function(status) {
            return websiteModel
                .deletePage(websiteId, pageId);
        })
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        })
}
function deleteWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        })
}

function reorderWidget(pageId, start, end) {
    Array.prototype.move = function (old_index, new_index) {
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);

    };
    return pageModel.findById(pageId)
        .then(function (page) {
            page.widgets.move(start, end);
            return page.save();
        })
}




