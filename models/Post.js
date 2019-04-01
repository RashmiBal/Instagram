const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    media: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true // this can be false
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        post: {
          type: Schema.Types.ObjectId,
          ref: 'post'
        }
      }
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        post: {
          type: Schema.Types.ObjectId,
          ref: 'post'
        },
        text: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  });
  
module.exports = Post = mongoose.model('post', PostSchema);