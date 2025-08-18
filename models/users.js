const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//create esquema
const userSchema = mongoose.Schema({
	user: { type: String, unique: true },
	email: { type: String, unique: true },
	password: String,
});

//método estático
userSchema.statics.hashPassword = function (password) {
	return bcrypt.hash(password, 7);
};

//método de instancia
userSchema.methods.comparePassword = function (password) {
	return bcrypt.compare(password, this.password);
};

//Create model
const User = mongoose.model('user', userSchema);

//export model
module.exports = User;
