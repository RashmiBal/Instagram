const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    email: {
        type: String,
        unique: 'Email already exists',
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'password is required'
    },
    avatar: {
        type: String,
        required: false
      },
    date: {
        type: Date,
        default: Date.now
    },
    photo: {
        data: Buffer,
        contentType: String,
        path: String
    },
    following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

module.exports = User = mongoose.model('users', UserSchema);