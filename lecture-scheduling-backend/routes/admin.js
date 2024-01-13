const express = require('express');
const {adminUser, addLecture} = require('../controllers/adminController.js');
const checkConflict = require('../middlewares/checkConflict.js');

const router = express.Router();

router.get('/', adminUser);
router.post('/addLecture', checkConflict ,addLecture)

module.exports = router;
