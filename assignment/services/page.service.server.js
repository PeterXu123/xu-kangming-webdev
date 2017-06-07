const app = require('../../express');
var pages = [

    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }


];

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);


function findPageById(req, res) {
    var pageId = req.params.pageId;


    var aim = pages.find(function (page) {
        return page._id === pageId;
    });
    res.send(aim);
}

function findAllPagesForWebsite(req, res) {
    var resultSet = [];
    for (var p in pages) {
        if (pages[p].websiteId == req.params.websiteId) {
            resultSet.push(pages[p]);
        }
    }
    res.json(resultSet);
}
function updatePage(req, res) {

    console.log("here");
    var page = req.body;
    var pageId = req.params['pageId'];

    var found = pages.find(function (page) {
        return page._id === pageId;
    });
    if (found) {
        found.description = page.description;
        found.name = page.name;
        found.updated = new Date();

        res.sendStatus(200);

        return;

    }
    else {
        res.sendStatus(404);

    }


}
function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.created = new Date();
    page.updated = new Date();
    pages.push(page);
    res.send(page);

}

function deletePage(req,res) {

    var pageId = req.params['pageId'];
    for (var u in pages) {
        if (pages[u]._id = pageId) {

            pages.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }

    // var index = websites.indexOf(website);
    // websites.splice(index, 1);
    // res.sendStatus(200);
    //  return;
    res.sendStatus(404);


}