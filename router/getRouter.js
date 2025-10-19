const express = require('express');
const router = express.Router();
const getController = require('../controller/getController');

router.route('/').get(getController);

module.exports = router;