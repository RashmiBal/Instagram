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
// Comment Validation
const validateCommentInput = require('../../validation/comment');

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

// @route GET api/posts/likes/:id
// @desc Get count of likes for a post id
// @access Public
router.get('/likes/:id', (req, res)=>{
    Post.findById(req.params.id)
    .then(
        post => {
        var c1 = post.likes.length;
        res.json({likescount: c1});
    });
});

// @route GET api/posts/comments/:id
// @desc Get count of comments for a post id
// @access Public
router.get('/comments/:id', (req, res)=>{
    Post.findById(req.params.id)
    .then(
        post => {
        var c1 = post.comments.length;
        res.json({commentscount: c1});
    });
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
    if(newPost!=undefined && newPost!=null)
    {
    newPost.save().then(post => res.json(post));
    }
});

// @route DELETE api/posts/:id
// @desc Delete 1 post
// @access Private
router.delete('/:id', 
passport.authenticate('jwt', {session:false}),
(req, res) => {
    Profile.findOne({user: req.user.id})
    .then(
        profile => {
        Post.findById(req.params.id)
        .then(post => {
            if (post.user.toString() !== req.user.id) {
                // this user does not have permission to delete the post
                return res.status(401).json({notauthorized: 'Not authorized to delete'});
            } 
            else {
                post.remove()
                .then(
                    () => 
                    {res.json({success: true});}
                    )
            }
        })
      .catch(
          err => {res.status(404).json({postnotfound: 'No Post found to delete'})});
     });
});

// @route POST api/posts/like/:id
// @desc Like a post
// @access Private
router.post(
    '/like/:id',
    passport.authenticate('jwt',{session: false}),
    (req, res) => { 
        Profile.findOne({user: req.user.id})
        .then(
            profile => {
            Post.findById(req.params.id)
            .then(post => {
                if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                    return res.status(400).json({alreadyliked: 'User already liked post'});
                }

                post.likes.unshift({user: req.user.id});
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({postnotfound: 'No posts found'}));
         }); 
    }
);

// @route POST api/posts/unlike/:id
// @desc Unlike a post
// @access Private
router.post(
    '/unlike/:id',
    passport.authenticate('jwt',{session: false}),
    (req,res) => {
        Profile.findOne({user: req.user.id})
        .then(
            profile => {
            Post.findById(req.params.id)
            .then(post => {
                if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                    return res.status(400).json({notliked: 'You have not liked the post'});
                }

                const removeIndex = post.likes
                .map(item => item.user.toString())
                .indexOf(req.user.id);

                post.likes.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(400).json({postnotfound: 'Post not found'}));
        });
    }
);

// @route POST api/posts/comment/:id
// @desc Add comment to post
// @access Private
router.post(
    '/comment/:id',
    passport.authenticate('jwt',{session: false}),
    (req, res) => {
        const {errors, isValid} = validateCommentInput(req.body);

        // Check Validation
        if (!isValid)
        {
            return res.status(400).json(errors);
        }

        Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name, // should this be req.user.name,
                avatar: req.body.avatar, // should this be req.user.avatar,
                user: req.user.id
            };

            post.comments.unshift(newComment);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({postnotfound: 'Post not found'}));
    }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Remove comment from post
// @access Private
router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', {session : false }),
    (req, res) => {
        Post.findById(req.params.id)
        .then(post => {
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0)
            {
                return res
                .status(404)
                .json({commentDoesNotExist: 'Comment does not exists'});
            }

            const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);

            post.comments.splice(removeIndex, 1);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({postDoesNotExist: 'Post does not exists'}));
    }
);


module.exports = router;