const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('./../../config/passport')(passport); 

// Get all references:
// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');
// Post Validation
const validatePostInput = require('../../validation/post');

// Quick Test
router.get('/test', (req, res) => res.json({msg: 'Posts api works'}));

// APIS:
// @route GET api/posts
// @desc Get posts
// @access Public
router.get('/', (req,res) => {
    Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound: 'No posts found'}))
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get('/:id', (req, res)=>{
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'No Post found with this ID'})); // Next: pass id in the error string 
});

// @route POST api/posts
// @desc Create a post
// @access Private
router.post('/', 
passport.authenticate('jwt', {session: false}),
(req, res) => {
    const { errors, isValid} = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        media: req.body.media,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    
    newPost.save().then(post => res.json(post));
});

// @route DELETE api/posts/:id
// @desc Delete 1 post
// @access Private
router.delete('/:id', 
passport.authenticate('jwt', {session:false}),
(req, res) => {
    // Profile.findOne()
    // .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            if (post.user.toString() !== req.user.id) {
                // this user does not have permission to delete the post
                return res.status(401).json({notauthorized: 'Not authorized to delete'});
            } 
            else {
                post.remove()
                .then(() => res.json({success: true}));
            }
        });
    //     .catch(err => {res.status(404).json({postnotfound: 'No Post found to delete'})});
    // })
    //.catch(err => {res.status(404).json({postnotfound: 'No profile found to delete post'})});
});

module.exports = router;