const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const keys = require('../config/key');
const passport = require('passport');
// load input validation
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

// bcrypt pass
const bcrypt = require('bcryptjs');

// get avatar via email
const gravatar = require('gravatar');

// load user model
const User = require('../models/User')

// @route get api/user/test
// @desc test post route
// @access Public
router.get('/test', (req, res) => {
    res.json({ msg: 'Users world' })
});

// @route POST api/user/register
// @desc register user
// @access Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // check validation
    // console.log('aaaaa')
    console.log(req.body)
        // console.log('aaaaa')
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email already exists'
                return res.status(400).json(errors)
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // size
                    r: 'pg', // rating
                    d: 'mm' // default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})


// @route post api/user/login
// @desc login user / returning JWT Token
// @access Public

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    // check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User email not found'
                return res.status(404).json(errors)
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // res.json({ msg: "Success" });
                        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // crate jwt payload
                        jwt.sign(payload,
                            keys.secretOrKey, { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            });
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors)
                    }
                })
        })

})

// @route get api/user/current
// @desc return current user
// @access Private
router.get('/current',
    passport.authenticate('jwt', { session: false }), (req, res) => {
        // res.json({ msg: 'Success !!' })
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        })
    })
module.exports = router;