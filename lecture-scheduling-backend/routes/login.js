const express = require('express');
const {loginUser} = require('../controllers/userController.js');

const router = express.Router();

router.post('/', loginUser);

module.exports = router;
