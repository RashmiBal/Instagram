const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Quick Test
router.get('/test', (req, res) => res.json({msg: 'Follow api works'}));

// @route POST api/follow/:id
// @desc Follow another user given the id
// @access Private
router.post(
    '/:id',
    passport.authenticate('jwt',{session: false}),
    (req, res) => { 
        Profile.findOne({user: req.user.id})
        .then(
            p1 => {
            Profile.findOne({user: req.params.id})
            .then(
                p2 => {
                var b1 = p1.following.filter(following => following.user.toString() === req.params.id).length > 0;
                var b2 = p2.follower.filter(follower => follower.user.toString() === req.user.id).length > 0;
                if (b1 && b2)
                {
                    return res.status(400).json({alreadyfollows: 'Already follows'});
                }

                p1.following.unshift({user: req.params.id, username: p2.username});
                p1.save();

                p2.follower.unshift({user: req.user.id, username: p1.username});
                p2.save().then(p2 => res.json(p2));
            });
         }); 
    }
);


// @route GET api/follow/followers/:id
// @desc Get count of followers of user id
// @access Public
router.get('/followers/:id', (req, res)=>{
    Profile.findOne({user: req.params.id})
    .then(
        p => {
        var c1 = p.follower.length;
        res.json({followercount: c1})
    });
});

// @route GET api/follow/following/:id
// @desc Get count of users following a given user id
// @access Public
router.get('/following/:id', (req, res)=>{
    Profile.findOne({user: req.params.id})
    .then(
        p => {
        var c1 = p.following.length;
        res.json({followingcount: c1})
    });
});

// @route POST api/follow/unfollow/:id
// @desc unfollow user given id
// @access Private
router.post(
    '/unfollow/:id',
    passport.authenticate('jwt',{session: false}),
    (req,res) => {
        Profile.findOne({user: req.user.id})
        .then(
            p1 => {
             Profile.findOne({user: req.params.id})
            .then(p2 => {
                if(p2.follower.filter(follower => follower.user.toString() === req.user.id).length === 0){
                    return res.status(400).json({notfollowing: 'You are not following this user'});
                }

                const removeFollowingIndex = p1.following
                .map(item => item.user.toString())
                .indexOf(req.params.id);

                p1.following.splice(removeFollowingIndex, 1);
              
                p1.save();

                const removeFollowerIndex = p2.follower
                .map(item => item.user.toString())
                .indexOf(req.user.id);

                p2.follower.splice(removeFollowerIndex, 1);

                p2.save().then(p2 => res.json(p2));
            });
        });
    }
);

module.exports = router;