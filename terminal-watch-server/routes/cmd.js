var express = require('express');
var router = express.Router();
var store = require('../store');

router.post('/delete_device', function (req, res, next) {
    console.log('POST delete_device');
    console.log(req.body);
    if (req.body[0].Info.Id.charAt(0) === 'M'){
        store.tmpATM = req.body;
    }
    if (req.body[0].Info.Id.charAt(0) === 'S'){
        store.tmpKIOSK = req.body;
    }
});

module.exports = router;
