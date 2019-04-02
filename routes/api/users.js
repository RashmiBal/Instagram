const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const validateRegisterInput = require('./../../validation/register');
const validateLoginInput = require('./../../validation/login');

router.get('/test', (req, res) => res.json({msg: 'Users api works'}));

// Load user model
const User = require('../../models/User');

// @route POST api/users/register
// #desc Register user
// @access public
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    // Check validation
    if (!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
    .then(user => {
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
            // return res.status(400).json({email: 'Email already exists'})
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            }); // if url is present it gives u the image otherwise a dummy image
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar // avatar: avatar <- u dont have to give this, JS has syntax benefit if names on LHS & RHS are the same 
            });

            bcrypt.genSalt(10, (err, salt) => {
                if(err){
                    errors.password = 'Failed Encrypting';
                    return res.status(400).json(errors);
                    //return res.status(400).json({password:'Failed Encrypting'});
                }
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err){
                        errors.password = 'Failed Hashing';
                        return res.status(400).json(errors);
                        // return res.status(400).json({password:'Failed Hashing'});
                    }
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user)) // if success then status is 200 u do not need to set 
                    .catch(err => console.log(err));
                })
            })

        }
    })
    .catch(err => console.log(err));
});

// @route POST api/users/login
// #desc Register user
// @access public
router.post('/login', (req,res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    // Check validation
    if (!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    //equivalent to User.findOne({email : email})
    User.findOne({email})
    .then(user => {
        if(!user){
            return res.status(400).json({email: 'User not found'});
        }
        //Check password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
                // return res.json({msg: 'success'}); OLD
                // User matched
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                };

                // Sign token // token to be put in browsers cache ideally but today we are not going to do that
                jwt.sign(payload, 
                    keys.secretOrKey,
                    {expiresIn: 3600},
                    (err, token) => {
                        return res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                    );
            }
            else {
            return releaseEvents.status(400).json({password: 'Password incorrect'});
            }
        }); //can skip catch at times
        
    })
    .catch(err => console.log(err));
})

// @route POST api/users/current
// #desc Returns current user information
// @access private
router.get(
    '/current',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        // res.json({msg: 'Success'});
        res.json({
            msg: 'Success',
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
}
);

module.exports = router;