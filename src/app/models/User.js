const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    phoneNumber: { type: String, required: false, default: '' },
    facebookUrl: { type: String, required: false, default: '#' },
    instagramUrl: { type: String, required: false, default: '#' },
    tiktokUrl: { type: String, required: false, default: '#' },
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;
