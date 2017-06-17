var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);
var bcrypt = require('bcrypt-nodejs')

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
module.exports = userModel;

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id' : facebookId});
}

function createUser(user) {
   if(user.roles) {
       user.roles = user.roles.split(',');

   }
   else {
       user.roles =['USER'];
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
    return userModel.update({_id : userId}, {$set: newUser});
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

