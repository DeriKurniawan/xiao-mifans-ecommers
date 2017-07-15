const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true },
    password: { type:String, required: true },
    username: { type: String, uniqe: true},
    email: { type: String, unique: true, match: [/\w+@\w{2,7}\.\w{2,5}(\.\w{2,5})?/, `Format email invalid`] },
    address: { type: String, required: true },
    nationality: { type: String, required: true },
    zipcode: { type: String, required: true },
    role: { type: String, required: true },
    pict: { type: String, required: true },
    gender: { type: String, required: true }
}, { timestamps: true });

var User = mongoose.model('User', UserSchema);

module.exports = User;