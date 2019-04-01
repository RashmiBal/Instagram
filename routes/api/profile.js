const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

router.get('/test', (req, res) => res.json({msg: 'Profile api works'}));


// Load Profile Model
const Profile = require('../../models/Profile');

// Load User 
const User = require('../../models/User');

// Load Validation
const validateProfileInput = require('../../validation/profile');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id})
      .populate('user', ['name', 'avatar']), ('profile', 'handle')  //checking if its right
      .then(profile => {
        if (!profile){
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar']), ('profile', 'handle')  //checking if its right
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};
  
    Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar']) ('profile', 'handle') //checking if its right
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
  
        res.json(profile);
      })
      .catch(err =>
        res.status(404).json({ profile: 'There is no profile for this user' })
      );
  });

  // @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateProfileInput(req.body);
      // Check Validation
      if (!isValid) {
      // Return any errors with 400 status
        return res.status(400).json(errors);
      }
      
      // Get fields
      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.title) profileFields.title = req.body.title;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.bio) profileFields.bio = req.body.bio;
      if (req.body.post) profileFields.post = req.body.post;
      if (req.body.follower) profileFields.follower = req.body.follower;
      if (req.body.following) profileFields.following = req.body.following;

      Profile.findOne({ user: req.user.id })
      .then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle })
        .then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }
         // Save Profile
         new Profile(profileFields)
         .save()
         .then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      });
    }
  );



















module.exports = router;