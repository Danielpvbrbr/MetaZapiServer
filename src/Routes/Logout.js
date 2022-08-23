const express = require('express');
const router = express.Router();


router.post('/', function (req, res) {
    res.json({ auth: false, token: null });
});



module.exports = router;