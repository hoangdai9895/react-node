const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/users');
const profile = require('./routes/profile');
const posts = require('./routes/posts');

const app = express();

// body parder moddleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// db config
const db = require('./config/key').mongoUrl;

// connect to mongoDB
mongoose
    .connect(db)
    .then(() => console.log('mongoDb connected'))
    .catch(err => console.log(err))

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// app.get('/', (req, res) => res.send('Hello'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));