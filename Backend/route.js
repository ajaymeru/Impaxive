const express = require('express');
const router = express.Router();
const { getresponse } = require('./controller');

router.post('/getresponse', getresponse);

module.exports = router; 
