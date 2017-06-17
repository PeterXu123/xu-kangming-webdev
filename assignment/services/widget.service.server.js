const app = require('../../express');
var path = require('path');
var widgetModel = require('../models/widget/widget.model.server');


var widgets =[
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "654", "size": 4, "text": "Lorem ipsum"},

    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "567", "widgetType": "HEADING", "pageId": "123", "size": 4, "text": "Lorem ipsum"}

];

app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/page/:pageId/widget/:widgetId", deleteWidget);
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

        widgetType : "IMAGE",
        _page: pageId,
        width : "100%",
        url: ''


    };
    widget.url = '/assignment/uploads/'+filename;
    widgetModel.createWidget(widget, pageId)
        .then(function(widget) {
            var callbackUrl   = "/assignment/#!/user/" + userId+ "/website/" +
                websiteId + "/page/" + pageId + "/widget/";
            res.redirect(callbackUrl);

        })








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

        widgetType : "IMAGE",
        _page: pageId,
        width : width,
        url: ''


    };
    widget.url = '/assignment/uploads/'+filename;
    var found = widgetModel.findWidgetById(widgetId)
        .then(function(found) {
            if (found) {
                if (found.widgetType == "IMAGE") {
                    found.url = widget.url;
                    found.width = widget.width;
                    widgetModel.updateWidget(widgetId, found)
                        .then(function() {
                            var callbackUrl   = "/assignment/#!/user/" + userId+ "/website/" +
                                websiteId + "/page/" + pageId + "/widget/";

                            res.redirect(callbackUrl);

                        })




                }
            }

        })






}



function findAllWidgetsForPage(req, res) {
    widgetModel .findAllWidgetsForPage(req.params.pageId)
        .then(function(widgets) {
            res.json(widgets);
        })
    // var resultSet = [];
    // for (var w in widgets) {
    //     if(widgets[w].pageId == req.params.pageId) {
    //         resultSet.push(widgets[w]);
    //     }
    // }
    // res.json(resultSet);
}
function sortWidget(req, res) {
    return widgetModel
        .reorderWidget(req.params.pageId, req.body.first, req.body.second)
        .then(function() {
            res.sendStatus(200);
        })
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
    //
    // var index1 = req.body.first;
    // var index2 = req.body.second;
    // var pageId = req.params['pageId'];
    // var result = [];
    // for (var w in widgets) {
    //     if (widgets[w].pageId === pageId) {
    //         result.push(widgets[w])
    //     }
    // }
    // console.log(result);
    // var oldonevalue = result[index1];
    // console.log(oldonevalue);
    // var oldtwovalue = result[index2];
    // console.log(oldtwovalue);
    //
    // var going = widgets.indexOf(oldonevalue)
    //
    // var leaving = widgets.indexOf(oldtwovalue);
    //
    //
    //  widgets.move(going, leaving);
    // res.sendStatus(200);


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
    var widgetId = req.params['widgetId'];
    return widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        })
    // var widgetId = req.params.widgetId;
    // var aim = widgets.find(function (widget) {
    //     return widget._id == widgetId;
    // });
    // res.send(aim);

}
function createWidget(req, res) {
    // var widget = req.body;
    //
    // widget._id = (new Date()).getTime() + "";
    // widget.created = new Date();
    // widget.updated = new Date();
    //
    // widgets.push(widget);
    //
    // res.send(widget);
    var widget = req.body;
    var pageId = req.params['pageId'];


    widget._page = pageId;
    widgetModel
        .createWidget(widget, pageId)
        .then(function(widget) {
            res.json(widget);
        })

}

function updateWidget(req, res) {
    console.log("iamhere123")
    var widgetId = req.params['widgetId'];
    var aim = req.body;
    // aim.pageId = req.params['pageId']
    widgetModel.findWidgetById(widgetId)
        .then( function (found) {
            if (found) {
                if (found.widgetType == "HEADING") {
                    found.text = aim.text;
                    found.size = aim.size;
                    console.log("fdfd");
                    widgetModel
                        .updateWidget(widgetId, found)
                        .then(function() {
                            res.sendStatus(200);
                            return;
                        })

                }
                if (found.widgetType == "IMAGE") {

                    widgetModel
                        .updateWidget(widgetId, found)
                        .then(function() {
                            res.sendStatus(200);
                            return;
                        })
                }
                if (found.widgetType == "YOUTUBE") {
                    found.url = aim.url;
                    widgetModel
                        .updateWidget(widgetId, found)
                        .then(function() {
                            res.sendStatus(200);
                            return;
                        })
                }
            }
            if (found.widgetType == "INPUT") {
                found.formatted = aim.formatted;
                found.text = aim.text;
                found.rows = aim.rows;
                found.placeholder = aim.placeholder;
                widgetModel
                    .updateWidget(widgetId, found)
                    .then(function() {
                        res.sendStatus(200);
                        return;
                    })
            }
            if (found.widgetType == "HTML") {

                found.text = aim.text;


                widgetModel
                    .updateWidget(widgetId, found)
                    .then(function() {
                        res.sendStatus(200);
                        return;
                    })
            }
            else {
                res.sendStatus(404);
            }

    });


        // console.log(aim);
        // found = aim;
        // console.log(widgets);
        //
        // res.send(widgets);


}

function deleteWidget(req, res) {
    var pageId = req.params['pageId'];
    var widgetId = req.params['widgetId'];
    // var widget = widgets.find(function (widget) {
    //     return widgetId === widget._id
    // })
    // if (widget !== null) {
    //     var index = widgets.indexOf(widget)
    //     widgets.splice(index, 1)
    //     res.sendStatus(200);
    //     return
    // }
    // res.sendStatus(404)
    widgetModel
        .deleteWidget(pageId, widgetId)
        .then(function(status) {
            res.send(status);
        },
            function(err) {
            console.log(err);
            })
}




