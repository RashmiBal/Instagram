const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    followeruser: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    followinguser: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      date: {
        type: Date,
        default: Date.now
      },
});