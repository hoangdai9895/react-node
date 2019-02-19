const express = require('express');
const router = express.Router();

// @route get api/posts/test
// @desc test post route
// @access Public
router.get('/test', (req, res) => {
    res.json({ msg: 'post world' })
});

module.exports = router;