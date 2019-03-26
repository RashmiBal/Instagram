const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({msg: 'Users api works'}));

// Load user model
const User = require('../../models/User');

// @route POST api/users/register
// @desc Register user
//@ @access public


module.exports = router;