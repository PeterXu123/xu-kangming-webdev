/**
 * Created by xukan on 5/30/2017.
 */
var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];



app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

app.get('/api/user', findAllUsers);
app.post('/api/user', createUser);


function deleteUser(req, res) {
    var userId = req.params['userId'];

    userModel
        .deleteUser(userId)
        .then(function (status) {
            console.log("what the fuck");
            res.send(status);
        },
        function(err) {
            console.log(err)

        })

    // for (var u in users) {
    //     if (users[u]._id = req.params.userId) {
    //
    //
    //         users.splice(u, 1);
    //         //
    //         res.sendStatus(200);
    //         return;
    //
    //     }
    //
    // }
    // res.sendStatus(404);
}
function updateUser(req, res) {
    var user = req.body;
    userModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.send(status);
        })
    // for (var u in users) {
    //     if (users[u]._id = req.params.userId) {
    //
    //
    //             users[u] = user;
    //             //
    //             res.sendStatus(200);
    //             return;
    //
    //         }
    //
    //
    //     }
    //     res.sendStatus(404);



}
function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function(user) {
            res.json(user);

        })


//         var user = users.find(function (user) {
//             return user._id === userId;
//         });
//
// res.send(user);


}
function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                }
                else {
                    res.sendStatus(404)
                }
            });
        // for(var u in users) {
        //     var user = users[u];
        //
        //     if( user.username === username &&
        //         user.password === password) {
        //
        //         res.json(user);
        //         return;
        //     }
        // }
        // console.log("fdfd");
        // res.sendStatus(404);
        // return;
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user) {
                    res.json(user);
                }
                else {
                    res.sendStatus(404);
                }
            })
        // for(var u in users) {
        //     var user = users[u];
        //     if( user.username === username) {
        //         res.json(user);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
        // return;
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            })
    }
}
// function findUserByUsername(req, res) {
//     var username = req.params['username'];
//     var user = users.find(function(user) {
//         return user.username === username
//     });
//     if (typeof user ==='undefined') {
//         res.send(null);
//     }
//     else {
//         res.send(user);
//     }
//
// }

function createUser(req, res) {
    var user = req.body;

    userModel.creatUser(user)
    .then(function (user) {

        console.log(user);

        res.json((user));
    }, function(err) {
        console.log("fdfd");
        console.log(err);
        res.send(err);
    })


    // user._id = (new Date()).getTime() + "";
    // users.push(user);
    // res.send(user);

}

// function findUserByCredentials(req, res) {
//     var username = req.query['username'];
//     var password = req.query['password'];
//     for(var u in users) {
//         var user = users[u];
//
//         if (user.username === username &&
//             user.password === password) {
//             res.json(user);
//             return;
//
//         }
//
//
//     }
//     res.sendStatus(404);
// }