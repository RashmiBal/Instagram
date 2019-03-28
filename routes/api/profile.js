const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({msg: 'Profile api works'}));

// Load user model
const Profile = require('../../models/Profile');

// @route POST api/users/register
// @desc Register user
// @access public


module.exports = router;