const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();

const db = require('./config/keys').mongoURI;

// apis
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const follow = require('./routes/api/follow');

// body parser middleware
app.use(bodyparser.urlencoded({ extended: false})); // do default url encoding, no custom url encoding
app.use(bodyparser.json());

// connect to db
mongoose.connect(db).then(()=> console.log('mongo db connected'))
.catch((err) => console.log(err));

// first route
app.get('/', (req, res) => {res.send('Hello!')});

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/follow', follow);

const port = process.env.PORT || 5300;

app.listen(port, () => console.log(`Server running on ${port}`));