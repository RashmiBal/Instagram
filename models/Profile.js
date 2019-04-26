const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  username: {
    type: String
  },
  title: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  post: {
    type: Number
  },
follower: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    username:{
      type: String
    }
 } ]
,
following: [{
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  username:{
    type: String
  }
}],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
