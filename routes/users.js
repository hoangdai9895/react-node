const express = require('express');
const router = express.Router();


// @route get api/user/test
// @desc test post route
// @access Public
router.get('/test', (req, res) => {
    res.json({ msg: 'Users world' })
});

module.exports = router;