const express = require('express');
const {instructorUser} = require('../controllers/instructorController.js');

const router = express.Router();

router.get('/:username', instructorUser);

module.exports = router;