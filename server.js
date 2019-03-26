const express = require('express');
const mongoose = require('mongoose');
const app = express();

const db = require('./config/keys').mongoURI;

// apis
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');

// connect to db
mongoose.connect(db).then(()=> console.log('mongo db connected'))
.catch((err) => console.log(err));

// first route
app.get('/', (req, res) => {res.send('Hello!')});

app.use('/api/users', users);
app.use('/api/posts', posts);

const port = process.env.PORT || 5300;

app.listen(port, () => console.log(`Server running on ${port}`));