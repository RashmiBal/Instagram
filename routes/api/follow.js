const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Quick Test
router.get('/test', (req, res) => res.json({msg: 'Follow api works'}));

module.exports = router;