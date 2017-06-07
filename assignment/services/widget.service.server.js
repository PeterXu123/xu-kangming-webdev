const app = require('../../express');
var path = require('path');

var widgets =[
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},

    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" }

];

app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);
app.put("/api/page/:pageId/widget", sortWidget);



// widget.service.server.js

var multer = require('multer'); // npm install multer --save
var storage = multer.diskStorage({
    destination: function(req,  file, cb) {
        cb(null, __dirname + '/../../public/assignment/uploads' )
    }
    ,
    filename: function (req, file, cb) {

        cb(null,  Date.now() + '.jpg'  );
    }
})


// var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
var upload = multer({storage : storage});

app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.post("/api/upload/create", upload.single('myFile'), createUploadImage);
function createUploadImage(req, res) {
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    widget = {
        _id :  (new Date()).getTime() + "",
        widgetType : "IMAGE",
        pageId: pageId,
        width : "100%",
        url: ''


    };
    widget.url = '/assignment/uploads/'+filename;
    widgets.push(widget);
    var callbackUrl   = "/assignment/#!/user/" + userId+ "/website/" +
        websiteId + "/page/" + pageId + "/widget/";

    res.redirect(callbackUrl);



}


function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    //widget = getWidgetById(widgetId);
    widget = {
        _id :  widgetId,
        widgetType : "IMAGE",
        pageId: pageId,
        width : width,
        url: ''


    };
    widget.url = '/assignment/uploads/'+filename;
    var found = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    if (found) {
        if (found.widgetType == "IMAGE") {
            found.url = widget.url;
            found.width = widget.width;

            var callbackUrl   = "/assignment/#!/user/" + userId+ "/website/" +
                websiteId + "/page/" + pageId + "/widget/";

            res.redirect(callbackUrl);

        }
    }





}



function findAllWidgetsForPage(req, res) {
    var resultSet = [];
    for (var w in widgets) {
        if(widgets[w].pageId == req.params.pageId) {
            resultSet.push(widgets[w]);
        }
    }
    res.json(resultSet);
}
function sortWidget(req, res) {
    Array.prototype.move = function (old_index, new_index) {
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);

    };

    var index1 = req.body.first;
    var index2 = req.body.second;
    var pageId = req.params['pageId'];
    widgets.move(index1, index2);
    res.sendStatus(200);


    // console.log(index1);
    // var widget = null;
    // if (widgets[index1].widgetType = "HEADING") {
    //     widget = {_id: widgets[index1]._id,
    //         widgetType: widgets[index1].widgetType, pageId : pageId, text: widgets[index1].text,
    //         size: widgets[index1].size}
    //
    // }
    // if (widgets[index1].widgetType = "IMAGE") {
    //     widget = {_id: widgets[index1]._id,
    //         widgetType: widgets[index1].widgetType, pageId : pageId,
    //         width: widgets[index1].width, url: widgets[index1].url }
    //
    // }
    // if (widgets[index1].widgetType = "YOUTUBE") {
    //     widget = {_id: widgets[index1]._id,
    //         widgetType: widgets[index1].widgetType, pageId : pageId,
    //         width: widgets[index1].width, url: widgets[index1].url }
    //
    // }
    // console.log(widget);
    //
    //
    //
    // var index2 = req.body.second;
    // console.log(index2);
    // var pageId = req.params['pageId'];
    // console.log(pageId);
    //
    //
    //
    // console.log(widget);
    //
    //
    // widgets.splice(index1, 1);
    // // widgets.splice(index2 - index1 - 1, 0, widget);
    // res.json(widgets);
    //



}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    var aim = widgets.find(function (widget) {
        return widget._id == widgetId;
    });
    res.send(aim);

}
function createWidget(req, res) {
    var widget = req.body;

    widget._id = (new Date()).getTime() + "";
    widget.created = new Date();
    widget.updated = new Date();

    widgets.push(widget);

    res.send(widget);

}

function updateWidget(req, res) {
    console.log("iamhere123")
    var widgetId = req.params['widgetId'];
    var aim = req.body;
    // aim.pageId = req.params['pageId']
    var found = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    if (found) {
        if (found.widgetType == "HEADING") {
            found.text = aim.text;
            found.size = aim.size
            res.sendStatus(200);
            return;
        }
        if (found.widgetType == "IMAGE") {
            found.url = aim.url;
            res.sendStatus(200);
            return;
        }
        if (found.widgetType == "YOUTUBE") {
            found.url = aim.url
            res.sendStatus(200);
            return;
        }

        // console.log(aim);
        // found = aim;
        // console.log(widgets);
        //
        // res.send(widgets);
    }
   else {
        res.sendStatus(404);
    }

}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    for (var u in widgets) {
        if (widgets[u]._id = widgetId) {

            widgets.splice(u, 1);
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


