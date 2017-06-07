const app = require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];
app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.post("/api/user/:userId/website", createWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);
app.put("/api/website/:websiteId", updateWebsite);
function findAllWebsitesForUser(req, res) {
    var resultSet = [];
    for (var w in websites) {
        if (websites[w].developerId === req.params.userId) {

            resultSet.push(websites[w]);
        }
    }
    res.json(resultSet);
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    console.log(websiteId);

    var aim = websites.find(function (website) {
        return website._id === websiteId;
    });
    res.send(aim);
}
function createWebsite(req, res) {
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    website.created = new Date();
    website.updated = new Date();
    websites.push(website);
    res.send(website);

}

function updateWebsite(req, res) {
    console.log("here");
    var website = req.body;
    var websiteId = req.params['websiteId'];
    console.log(websites.length);
    var found = websites.find(function (website) {
        return website._id === websiteId;
    });
    if (found) {
                found.description = website.description;
                found.name = website.name;
                found.updated = new Date();

                res.sendStatus(200);

                return;

    }
    else {
        res.sendStatus(404);

    }

        // for (var u = 0; u < websites.length; u++) {
        //     console.log(u);
        //
        //     if (websites[u]._id = websiteId) {
        //         answer = u;
        //         console.log(u);
        //
        //         var found = websites[answer];
        //         found.description = website.description;
        //         found.name = website.name;
        //         found.updated = new Date();
        //
        //         res.sendStatus(200);
        //         console.log(u);
        //         return;
        //     }
        // }










        }



//     if (found !== null) {
//         found.description = website.description;
//         found.name = website.name;
//         found.updated = new Data();
//         res.sendStatus(200);
//     }
//     res.sendStatus(404);
//
// }

function deleteWebsite(req,res) {
    console.log("what");
    var websiteId = req.params['websiteId'];
    for (var u in websites) {
        if (websites[u]._id = websiteId) {

            websites.splice(u, 1);
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