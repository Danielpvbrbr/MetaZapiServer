const express = require('express');
const router = express.Router();
const auth = require('./Auth');
const sendMsg = require('./SendMsg');
const logout = require('./Logout');
const signIn = require('./SignIn');
const cors = require("cors");


router.use(cors());
router.use('/auth', auth); 
router.use('/signIn', signIn);
router.use('/logout', logout);
router.use('/send-message', sendMsg);


module.exports = router;