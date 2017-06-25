var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/webdev_summer1_2017');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('ProjectWebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server');
websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;
module.exports = websiteModel;

function createWebsite(website) {
    var userId = website._user;
    return websiteModel
        .create(website)
        .then(function(website) {
            userModel.addWebsite(userId, website._id);
            return website;
        })
}


function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: userId})
        .populate('_user')
        .exec();
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    delete website._user;
    delete website.dateCreated;
    website.dateUpdated = Date.now();
    console.log(website.dateUpdated);
    return websiteModel.update({_id: websiteId}, {$set: website});

}
function deleteWebsite(userId, websiteId) {

    return websiteModel.remove({_id: websiteId})
        .then(function (status) {
            return userModel
                .deleteWebsite(userId, websiteId);
        })
}

function addPage(websiteId, pageId) {
    return websiteModel.findWebsiteById(websiteId)
        .then(function (website) {
            console.log("hello here");
            console.log(pageId);
            website.pages.push(pageId);
            return website.save();
        });
}
function deletePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function(website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        })
}




