const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require("passport");

// post model
const Post = require('../models/Post');

// progile laod
const Profile = require('../models/Profile');

// validation
const validatePostInput = require('../validation/post');

// @route get api/posts/test
// @desc test post route
// @access Public
router.get('/test', (req, res) => {
    res.json({ msg: 'post world' })
});

// @route POST api/posts
// @desc Create post
// @access Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body, req.user)
    const { errors, isValid } = validatePostInput(req.body);

    // check validation
    if (!isValid) {
        // if any errors, send 400 withd errors object
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avtar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post))
})

// @route GET api/posts
// @desc GET post
// @access Public
router.get('/', (req, res) => {

    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404))
})

// @route GET api/posts/:id
// @desc GET post by id
// @access Public
router.get('/:id', (req, res) => {

    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: "no post found with that ID" }))
})

// @route DELETE api/posts/:id
// @desc DELETE post by id
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.params.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: "user not authorized" })
                    }

                    // delete
                    post.remove().then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json({ postnotfoudn: "No post found" }))
        })
})


// @route POST api/posts/like/:id
// @desc Like post
// @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(req.user.id)
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadylike: " User already like this post" })
                    }
                    //  add user id likes array
                    post.likes.unshift({ user: req.user.id });
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ nopostfound: "no post found to like" }))
        })
})



// @route POST api/posts/like/:id
// @desc unLike post
// @access Private
router.post('/unliked/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(req.user.id)
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notlike: "you have not yet liked  this post" })
                    }
                    // get remove index
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id)

                    //  splice out of array
                    post.likes.splice(removeIndex, 1);
                    post.save().then(post => res.json(post))

                })
                .catch(err => res.status(404).json({ postnotfoudn: "No post found to like" }))
        })
})

// @route POST api/posts/comment/:id
// @desc add comment to post
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // check validation
    if (!isValid) {
        // if any errors, send 400 withd errors object
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };
            // add to comment array
            post.comments.unshift(newComment);
            post.save().then(post => res.json(post))
        })
        // .catch(err => res.status(404).json(console.log(err)));
        .catch(err => res.status(404).json({ nopostfund: "no post found to comment" }))
})


// @route POST api/posts/comment/:id/:comment_id
// @desc remove  comment to post
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // check validation
    if (!isValid) {
        // if any errors, send 400 withd errors object
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
        .then(post => {
            //    check to see if the comment exsist
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({ commentnotexsist: "Comment doesnot exsist" })
            }
            // get removeindex
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);
            // splice comment out of array
            post.comments.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json(console.log(err)));
})


module.exports = router;