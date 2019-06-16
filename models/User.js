
//Модели проекта 
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Создание схемы данных
const UserSchema = mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    
},
{ collection : 'users' });



// Create collection and add schema
const User = mongoose.model('User', UserSchema);

//Потом вызывать эту Модель
module.exports = User;






// var User = module.exports = mongoose.model('User', UserSchema);

// module.exports.getUserById = function(id, callback){
// 	User.findById(id, callback);
// }

// module.exports.getUserByUsername = function(username, callback){
// 	var query = {username: username};
// 	User.findOne(query, callback);
// }

// module.exports.comparePassword = function(candidatePassword, hash, callback){
// 	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
//     	callback(null, isMatch);
// 	});
// }

// module.exports.createUser = function(newUser, callback){
// 	bcrypt.genSalt(10, function(err, salt) {
//     	bcrypt.hash(newUser.password, salt, function(err, hash) {
//    			newUser.password = hash;
//    			newUser.save(callback);
//     	});
// 	});
// }


module.exports = User;