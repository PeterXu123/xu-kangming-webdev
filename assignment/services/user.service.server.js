/**
 * Created by xukan on 5/30/2017.
 */
var app = require('../../express');
var bcrypt = require("bcrypt-nodejs");
var userModel = require('../models/user/user.model.server');
var passport      = require('passport');

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


// var facebookConfig = {
//
//     clientID     : "382045658859401",
//     clientSecret : "68342bb2ad24d90000f84baa33b00d5e",
//     callbackURL  :  "/auth/facebook/callback",
//     profileFields: ['email', 'id', 'name', 'displayName']
// };

var facebookConfig = {

    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['email', 'id', 'name', 'displayName']
};

var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));



app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', isAdmin,  deleteUser);

app.get('/api/user', isAdmin, findAllUsers);
app.post('/api/user', isAdmin,  createUser);
app.post('/api/login',  passport.authenticate('local'), login);
app.get('/api/checkLoggedIn', checkLoggedIn);
app.get('/api/checkAdmin', checkAdmin);

app.post('/api/logout', logout);
app.post('/api/register', register);
app.post('/api/unregister', unregister);

app.get('/auth/facebook', passport.authenticate('facebook',
    { scope :  'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
    }));

function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    }
    else {
        res.sendStatus(401);
    }
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}
function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}
function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);

    userModel.createUser(user)
        .then(function (user) {
            req.login(user, function(status) {
                res.json(user);
            });




        }, function(err) {

            res.send(err);
        })

}

function unregister(req, res) {


    userModel.deleteUser(req.user._id)
        .then(function (user) {
            req.logout() ;
                res.sendStatus(200);





        }, function(err) {

            res.send(err);
        })

}
function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}


function checkLoggedIn(req, res) {
    if(req.isAuthenticated())
    {
        res.json(req.user);
    }
    else {
        res.send('0');
    }

}
function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1)
    {
        res.json(req.user);
    }
    else {
        res.send('0');
    }

}


function login(req, res) {
    var user = req.user;





    res.json(user);
}





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
            console.log(users);
                res.send(users);
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
    user.password = bcrypt.hashSync(user.password);

    userModel.createUser(user)
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
function facebookStrategy(token, refreshToken, profile, done) {
    console.log(userModel);
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {

                        var name = profile.displayName.split(" ");

                    var newFacebookUser = {
                        username:  profile.displayName,
                        password:  "123456",
                        firstName: name[0],
                        lastName:  name[1],
                        email:     profile.email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    newFacebookUser.password = bcrypt.hashSync(newFacebookUser.password);
                   return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
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