const express = require('express');
const router = express.Router();


// @route get api/profile/test
// @desc test post route
// @access Public
router.get('/test', (req, res) => {
    res.json({ msg: 'profile world' })
});

module.exports = router;