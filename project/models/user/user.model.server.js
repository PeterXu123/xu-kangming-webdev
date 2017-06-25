  var mongoose = require('mongoose');

    var userSchema = require('./user.schema.server');
    // mongoose.createConnection('mongodb://127.0.0.1:27017/webdev_summer1_2017');
    var userModel = mongoose.model('ProjectUserModel', userSchema);
    var bcrypt = require('bcrypt-nodejs');

    userModel.createUser = createUser;
    userModel.findUserById = findUserById;
    userModel.findAllUsers = findAllUsers;
    userModel.findUserByUsername = findUserByUsername;
    userModel.findUserByCredentials = findUserByCredentials;
    userModel.findUserByFacebookId = findUserByFacebookId;
    userModel.updateUser = updateUser;
    userModel.deleteUser = deleteUser;
    userModel.addWebsite = addWebsite;
    userModel.deleteWebsite = deleteWebsite;

    userModel.addFollowing = addFollowing;
    userModel.addFollower = addFollower;
    userModel.cancelFollowing = cancelFollowing;
    userModel.cancelFollower = cancelFollower;
    userModel.findUserByGoogleId = findUserByGoogleId;
    userModel.addLike = addLike;
    module.exports = userModel;

    function addLike(userId, imdbId, movieName) {
        return userModel
            .findOneAndUpdate({
                    _id: userId
                },
                {$push: {like: {imdbId: imdbId, movieName: movieName}}},
                {safe: true, upsert: true},
                function(err) {
                    if(err) {
                        console.log(err);
                    }
                    else {

                    }
                });



    }

    function cancelFollowing(userId, followingId, followingname) {
        return userModel.findOneAndUpdate({_id: userId},
            {$pull: {followings: {username: followingname, _id: followingId}}},
            {safe: true, upsert: true},
        function(err) {
            if(err) {
                console.log(err);
            }
            else {

            }
        })
    }
  function cancelFollower(userId, followerId, followername) {
      return userModel.findOneAndUpdate({_id: userId},
          {$pull: {followers: {username: followername, _id: followerId}}},
          {safe: true, upsert: true},
          function(err) {
              if(err) {
                  console.log(err);
              }
              else {

              }
          })
  }


    function addFollower(userId, followerId, username) {
        var searchId = new mongoose.mongo.ObjectId(followerId);
        return userModel
            .findOneAndUpdate({
                _id: searchId
            },
                {$push: {followers: {username: username, _id: userId}}},
                {safe: true, upsert: true},
            function(err) {
            if(err) {
                console.log(err);
            }
            else {

            }
            });


    }

    function addFollowing(userId, followingId, username) {
        var newFollowingId = new mongoose.mongo.ObjectId(followingId);
        console.log(newFollowingId)
        return userModel
            .findOneAndUpdate({
                    _id: userId},
                {$push: {followings: {username: username, _id: newFollowingId}}},
                {safe: true, upsert: true},
            function(err, doc) {
            if(err) {
                console.log(err);
            }
            else {

            }
                }
                );



    }

    function findUserByFacebookId(facebookId) {
        return userModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return userModel.findOne({'google.id': googleId});
    }

    function createUser(user) {
        if (user.roles) {
            user.roles = user.roles.split(',');

        }
        else {
            user.roles = ['USER'];
        }

        return userModel.create(user);
    }

    function findUserById(userId) {
        return userModel.findById(userId);
    }

    function findAllUsers() {
        return userModel.find();
    }

    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user === null) {
                    return null
                } else {
                    if (bcrypt.compareSync(password, user.password)) {
                        return user
                    } else {
                        return null
                    }
                }
            })
    }

    function updateUser(userId, newUser) {
        delete newUser.username;
        delete newUser.password;
        if (typeof newUser.roles == 'string') {
            newUser.roles = newUser.roles.split(',');
        }
        return userModel.update({_id: userId}, {$set: newUser});
    }

    function deleteUser(userId) {
        console.log(userId);
        return userModel.remove({_id: userId});
    }

    function addWebsite(userId, websiteId) {
        return userModel
            .findById(userId)
            .then(function (user) {
                user.websites.push(websiteId);
                return user.save();
                return user.save();
            })
    }

    function deleteWebsite(userId, websiteId) {


        return userModel
            .findById(userId)
            .then(function (user) {

                var index = user.websites.indexOf(websiteId);
                user.websites.splice(index, 1);
                return user.save();
            });
    }


