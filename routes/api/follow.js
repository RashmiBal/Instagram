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

                p1.following.unshift({user: req.params.id});
                p1.save();

                p2.follower.unshift({user: req.user.id});
                p2.save().then(p2 => res.json(p2));
            });
         }); 
    }
);


module.exports = router;