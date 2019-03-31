const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// some comment **************************updated$$$$$$$$$$$$$$$$$
const FollowSchema = new Schema({
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

module.exports = Follow = mongoose.model('follow', FollowSchema);